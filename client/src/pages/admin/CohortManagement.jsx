import React, { useState, useEffect } from 'react';
import { PlusCircle, Calendar, Edit2, Trash2, ToggleLeft, ToggleRight, PauseCircle, PlayCircle } from 'lucide-react';
import { toast } from 'react-toastify';
import { useCohort } from '../../hooks/useCohort';

const CohortManagement = () => {
    const [showModal, setShowModal] = useState(false);
    const [formData, setFormData] = useState({
        title: '',
        startDate: '',
        endDate: '',
        enrollmentDeadline: '',
        courses: [],
        maxStudents: '',
        isWaitlistEnabled: false,
        description: ''
    });
    const [editMode, setEditMode] = useState(false);    const { 
        cohorts,
        isLoading,
        error,
        successMessage,
        submitCohort,
        getCohorts,
        updateCohortData,
        deleteCohort,
        clearCohortMessages,
        toggleCohortActivation
    } = useCohort();useEffect(() => {
        getCohorts();
    }, [getCohorts]);

    useEffect(() => {
        if (successMessage) {
            toast.success(successMessage);
            clearCohortMessages();
            setShowModal(false);
            resetForm();
        }
        if (error) {
            toast.error(error);
            clearCohortMessages();
        }
    }, [successMessage, error, clearCohortMessages]);

    const resetForm = () => {
        setFormData({
            title: '',
            startDate: '',
            endDate: '',
            enrollmentDeadline: '',
            courses: [],
            maxStudents: '',
            isWaitlistEnabled: false,
            description: ''
        });
        setEditMode(false);
    };    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editMode) {
                await updateCohortData(formData._id, formData);
            } else {
                await submitCohort(formData);
            }
        } catch (error) {
            toast.error(error.message);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this cohort?')) {
            try {
                await deleteCohort(id);
                toast.success('Cohort deleted successfully');
            } catch (error) {
                toast.error(error.message);
            }
        }
    };

    const handleEdit = (cohort) => {
        setFormData(cohort);
        setEditMode(true);
        setShowModal(true);
    };    const toggleWaitlist = async (cohort) => {
        try {
            const response = await updateCohortData(cohort._id, {
                isWaitlistEnabled: !cohort.isWaitlistEnabled
            });
            if (response) {
                toast.success(`Waitlist ${!cohort.isWaitlistEnabled ? 'enabled' : 'disabled'} successfully`);
                getCohorts(); // Refresh the cohort list
            }
        } catch (error) {
            toast.error('Failed to update waitlist status');
            console.error('Error updating waitlist status:', error);
        }
    };

    const handleActivationToggle = async (cohort) => {
        try {
            await toggleCohortActivation(cohort._id, !cohort.isActive);
            toast.success(`Cohort ${cohort.isActive ? 'deactivated' : 'activated'} successfully`);        } catch (err) {
            toast.error('Failed to update cohort activation status: ' + err.message);
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-2xl font-bold">Cohort Management</h2>
                    <p className="text-gray-600">Manage upcoming cohorts and waitlist settings</p>
                </div>
                <button
                    onClick={() => {
                        resetForm();
                        setShowModal(true);
                    }}
                    className="flex items-center px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700"
                >
                    <PlusCircle className="w-5 h-5 mr-2" />
                    Add New Cohort
                </button>
            </div>

            {isLoading ? (
                <div className="flex justify-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-teal-600" />
                </div>
            ) : (
                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white shadow-md rounded">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Enrollment</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Waitlist</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {cohorts?.map((cohort) => (
                                <tr key={cohort._id}>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm font-medium text-gray-900">{cohort.title}</div>
                                        <div className="text-sm text-gray-500">
                                            {new Date(cohort.startDate).toLocaleDateString()} - {new Date(cohort.endDate).toLocaleDateString()}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                                            ${cohort.isActive ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                                            {cohort.isActive ? 'Active' : 'Inactive'}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {cohort.currentEnrollment} / {cohort.maxStudents}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <button
                                            onClick={() => toggleWaitlist(cohort)}
                                            className={`inline-flex items-center gap-1 px-2 py-1 rounded ${
                                                cohort.isWaitlistEnabled
                                                    ? 'bg-yellow-100 text-yellow-800'
                                                    : 'bg-gray-100 text-gray-800'
                                            }`}
                                        >
                                            {cohort.isWaitlistEnabled ? <ToggleRight size={16} /> : <ToggleLeft size={16} />}
                                            {cohort.isWaitlistEnabled ? 'Enabled' : 'Disabled'}
                                        </button>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium flex gap-2">
                                        <button
                                            onClick={() => handleActivationToggle(cohort)}
                                            className={`inline-flex items-center gap-1 px-2 py-1 rounded ${
                                                cohort.isActive
                                                    ? 'bg-red-100 text-red-800 hover:bg-red-200'
                                                    : 'bg-green-100 text-green-800 hover:bg-green-200'
                                            }`}
                                        >
                                            {cohort.isActive ? <PauseCircle size={16} /> : <PlayCircle size={16} />}
                                            {cohort.isActive ? 'Deactivate' : 'Activate'}
                                        </button>
                                        <button
                                            onClick={() => handleEdit(cohort)}
                                            className="text-blue-600 hover:text-blue-900"
                                        >
                                            <Edit2 size={16} />
                                        </button>
                                        <button
                                            onClick={() => handleDelete(cohort._id)}
                                            className="text-red-600 hover:text-red-900"
                                        >
                                            <Trash2 size={16} />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {/* Cohort Form Modal */}
            {showModal && (
                <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
                    <div className="relative top-20 mx-auto p-5 border w-full max-w-2xl shadow-lg rounded-lg bg-white">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-xl font-bold">
                                {editMode ? 'Edit Cohort' : 'Create New Cohort'}
                            </h3>
                            <button
                                onClick={() => {
                                    setShowModal(false);
                                    resetForm();
                                }}
                                className="text-gray-400 hover:text-gray-600"
                            >
                                &times;
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Title</label>
                                <input
                                    type="text"
                                    value={formData.title}
                                    onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500"
                                    required
                                />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Start Date</label>
                                    <input
                                        type="date"
                                        value={formData.startDate.split('T')[0]}
                                        onChange={(e) => setFormData(prev => ({ ...prev, startDate: e.target.value }))}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">End Date</label>
                                    <input
                                        type="date"
                                        value={formData.endDate.split('T')[0]}
                                        onChange={(e) => setFormData(prev => ({ ...prev, endDate: e.target.value }))}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Enrollment Deadline</label>
                                    <input
                                        type="date"
                                        value={formData.enrollmentDeadline.split('T')[0]}
                                        onChange={(e) => setFormData(prev => ({ ...prev, enrollmentDeadline: e.target.value }))}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500"
                                        required
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700">Courses</label>
                                <div className="mt-2 space-y-2">
                                    {['product-management', 'product-design', 'development', 'job-readiness'].map(course => (
                                        <label key={course} className="inline-flex items-center mr-4">
                                            <input
                                                type="checkbox"
                                                value={course}
                                                checked={formData.courses.includes(course)}
                                                onChange={(e) => {
                                                    const courses = e.target.checked
                                                        ? [...formData.courses, course]
                                                        : formData.courses.filter(c => c !== course);
                                                    setFormData(prev => ({ ...prev, courses }));
                                                }}
                                                className="rounded border-gray-300 text-teal-600 shadow-sm focus:border-teal-500 focus:ring-teal-500"
                                            />
                                            <span className="ml-2 text-gray-700 capitalize">
                                                {course.replace('-', ' ')}
                                            </span>
                                        </label>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700">Maximum Students</label>
                                <input
                                    type="number"
                                    value={formData.maxStudents}
                                    onChange={(e) => setFormData(prev => ({ ...prev, maxStudents: e.target.value }))}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700">Description</label>
                                <textarea
                                    value={formData.description}
                                    onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                                    rows={4}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500"
                                    required
                                />
                            </div>

                            <div className="flex items-center">
                                <input
                                    type="checkbox"
                                    checked={formData.isWaitlistEnabled}
                                    onChange={(e) => setFormData(prev => ({ ...prev, isWaitlistEnabled: e.target.checked }))}
                                    className="rounded border-gray-300 text-teal-600 shadow-sm focus:border-teal-500 focus:ring-teal-500"
                                />
                                <span className="ml-2 text-gray-700">Enable waitlist for this cohort</span>
                            </div>

                            <div className="flex justify-end space-x-3 pt-4 border-t">
                                <button
                                    type="button"
                                    onClick={() => {
                                        setShowModal(false);
                                        resetForm();
                                    }}
                                    className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-4 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700"
                                >
                                    {editMode ? 'Update Cohort' : 'Create Cohort'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CohortManagement;
