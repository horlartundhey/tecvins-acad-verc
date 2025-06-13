import React, { useEffect, useState } from 'react';
import { useWaitlist } from '../hooks/useWaitlist';
import { useCohort } from '../hooks/useCohort';
import { toast } from 'react-toastify';

const WaitlistManager = ({ cohortId }) => {
    const { entries, isLoading: isWaitlistLoading, error: waitlistError, loadWaitlistEntries, updateWaitlistEntry } = useWaitlist();
    const { updateEnrollmentCount, error: cohortError, isLoading: isCohortLoading } = useCohort();
    const [selectedEntry, setSelectedEntry] = useState(null);
    const [sendNotification, setSendNotification] = useState(true);
    const [isProcessing, setIsProcessing] = useState(false);

    useEffect(() => {
        loadWaitlistEntries();
    }, [loadWaitlistEntries]);

    const handleStatusChange = async (entry, newStatus) => {
        if (entry.status === newStatus || isProcessing) return;

        // Confirm status change if it's a significant change
        if (newStatus === 'accepted' || newStatus === 'rejected' || newStatus === 'enrolled') {
            if (!window.confirm(`Are you sure you want to mark this entry as ${newStatus}? ${sendNotification ? 'A notification email will be sent.' : ''}`)) {
                return;
            }
        }
        
        setIsProcessing(true);
        try {
            if (newStatus === 'enrolled') {
                // First try to update the enrollment count
                const enrollmentResult = await updateEnrollmentCount(entry.preferredCohort, 1);
                if (!enrollmentResult.success) {
                    toast.error(enrollmentResult.message || 'Failed to update enrollment count. The cohort might be at capacity.', {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true
                    });
                    return;
                }
            }

            const result = await updateWaitlistEntry(entry._id, newStatus, sendNotification);
            if (result.success) {
                if (newStatus === 'enrolled') {
                    toast.success('Student successfully enrolled', {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true
                    });
                } else {
                    toast.success(`Status updated to ${newStatus}`, {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true
                    });
                }
                // Refresh the list
                loadWaitlistEntries();
            } else {
                toast.error(result.message || 'Failed to update status', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true
                });
                // If enrollment failed, revert the enrollment count
                if (newStatus === 'enrolled') {
                    await updateEnrollmentCount(entry.preferredCohort, -1);
                }
            }
        } catch (error) {
            toast.error('An unexpected error occurred', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true
            });
            console.error('Error updating waitlist entry:', error);
        } finally {
            setIsProcessing(false);
        }
    };

    if (isWaitlistLoading || isCohortLoading) {
        return (
            <div className="p-4 flex items-center justify-center">
                <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-teal-600"></div>
                <span className="ml-2">Loading waitlist...</span>
            </div>
        );
    }

    if (waitlistError || cohortError) {
        return (
            <div className="p-4 text-red-500 bg-red-50 border border-red-200 rounded">
                Error: {waitlistError || cohortError}
            </div>
        );
    }    // Filter entries for current cohort if cohortId is provided
    const filteredEntries = Array.isArray(entries) 
        ? (cohortId 
            ? entries.filter(entry => entry.preferredCohort === cohortId)
            : entries)
        : [];

    return (
        <div className="p-4">
            <h2 className="text-xl font-semibold mb-4">Waitlist Management</h2>
            
            {/* Settings */}
            <div className="mb-4 flex items-center">
                <label className="flex items-center">
                    <input
                        type="checkbox"
                        checked={sendNotification}
                        onChange={(e) => setSendNotification(e.target.checked)}
                        className="form-checkbox h-4 w-4 text-teal-600"
                    />
                    <span className="ml-2 text-sm text-gray-700">
                        Send email notifications on status changes
                    </span>
                </label>
            </div>            {filteredEntries.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                    No waitlist entries found{cohortId ? ' for this cohort' : ''}
                </div>
            ) : (
                <div className="overflow-x-auto">
                    <table className="min-w-full table-auto">
                        <thead>
                            <tr className="bg-gray-100">
                                <th className="px-4 py-2">Name</th>
                                <th className="px-4 py-2">Email</th>
                                <th className="px-4 py-2">Course</th>
                                <th className="px-4 py-2">Submitted</th>
                                <th className="px-4 py-2">Notifications</th>
                                <th className="px-4 py-2">Status</th>
                                <th className="px-4 py-2">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredEntries.map((entry) => (
                                <tr key={entry._id} className={`border-b hover:bg-gray-50 ${isProcessing && selectedEntry === entry._id ? 'opacity-50' : ''}`}>
                                    <td className="px-4 py-2">{entry.firstName} {entry.lastName}</td>
                                    <td className="px-4 py-2">
                                        <a href={`mailto:${entry.email}`} className="text-teal-600 hover:text-teal-800">
                                            {entry.email}
                                        </a>
                                    </td>
                                    <td className="px-4 py-2">{entry.course}</td>
                                    <td className="px-4 py-2">
                                        {new Date(entry.submittedAt).toLocaleDateString()}
                                    </td>
                                    <td className="px-4 py-2">
                                        {entry.notificationsSent?.length ? (
                                            <div className="text-sm text-gray-500">
                                                Last sent: {new Date(entry.notificationsSent[entry.notificationsSent.length - 1].sentAt).toLocaleDateString()}
                                                <br />
                                                Total: {entry.notificationsSent.length}
                                            </div>
                                        ) : (
                                            <span className="text-sm text-gray-400">No notifications</span>
                                        )}
                                    </td>
                                    <td className="px-4 py-2">
                                        <span className={`px-2 py-1 rounded ${
                                            entry.status === 'accepted' ? 'bg-green-100 text-green-800' :
                                            entry.status === 'rejected' ? 'bg-red-100 text-red-800' :
                                            entry.status === 'enrolled' ? 'bg-blue-100 text-blue-800' :
                                            'bg-yellow-100 text-yellow-800'
                                        }`}>
                                            {entry.status}
                                        </span>
                                    </td>
                                    <td className="px-4 py-2">
                                        <div className="flex items-center gap-2">
                                            <select
                                                value={entry.status}
                                                onChange={(e) => {
                                                    setSelectedEntry(entry._id);
                                                    handleStatusChange(entry, e.target.value);
                                                }}
                                                disabled={isProcessing && selectedEntry === entry._id}
                                                className="border rounded px-2 py-1 text-sm disabled:opacity-50"
                                            >
                                                <option value="pending">Pending</option>
                                                <option value="accepted">Accept</option>
                                                <option value="rejected">Reject</option>
                                                <option value="enrolled">Enroll</option>
                                            </select>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default WaitlistManager;
