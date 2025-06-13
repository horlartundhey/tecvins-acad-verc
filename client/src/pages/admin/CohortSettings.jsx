import React, { useState, useEffect, useCallback } from 'react';
import { Save, AlertCircle, Pencil, Trash2, Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useCohort } from '../../hooks/useCohort';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CohortSettings = ({ id }) => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');
  const [showForm, setShowForm] = useState(!!id);
  const [cohorts, setCohorts] = useState([]);
  const { getCohorts, updateCohortData, submitCohort, removeCohort } = useCohort();
  
  // Initialize with all required fields
  const [cohort, setCohort] = useState({
    _id: '',
    title: '',
    startDate: '',
    endDate: '',
    enrollmentDeadline: '',
    courses: [],
    maxStudents: 30,
    isWaitlistEnabled: false,
    currentEnrollment: 0,
    status: 'upcoming',
    description: '',
    scheduleTime: "Saturdays and Sundays, 14:00 - 16:00 (CET)",
    deliveryMode: "Online (via Microsoft Teams)"
  });

  const courses = [
    { value: 'product-management', label: 'Product Management' },
    { value: 'product-design', label: 'Product Design' },
    { value: 'development', label: 'Development' },
    { value: 'job-readiness', label: 'Job Readiness' }
  ];

  // Load current cohort settings if editing
  useEffect(() => {
    const loadCohort = async () => {
      if (!id) return; // Skip if creating new cohort
      
      setIsLoading(true);
      setError(null);
      try {
        const cohorts = await getCohorts({ status: 'upcoming' });
        const cohortData = cohorts.find(c => c._id === id);
        
        if (cohortData) {
          const formattedDates = {
            startDate: formatDateForInput(cohortData.startDate),
            endDate: formatDateForInput(cohortData.endDate),
            enrollmentDeadline: formatDateForInput(cohortData.enrollmentDeadline)
          };
          setCohort({ ...cohortData, ...formattedDates });
        } else {
          setError('Cohort not found');
          toast.error('Cohort not found', { autoClose: 6000 });
        }
      } catch (err) {
        const message = err.response?.data?.message || 'Failed to load cohort settings';
        setError(message);
        toast.error(message, { autoClose: 6000 });
      } finally {
        setIsLoading(false);
      }
    };

    loadCohort();
  }, [id, getCohorts]);
  const loadCohorts = useCallback(async () => {
    try {
      const cohortsData = await getCohorts();
      setCohorts(cohortsData);
    } catch (error) {
      console.error('Failed to load cohorts:', error);
      toast.error('Failed to load cohorts');
    }
  }, [getCohorts]);

  useEffect(() => {
    loadCohorts();
  }, [loadCohorts]);

  const formatDateForInput = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return '';
    return date.toISOString().split('T')[0];
  };

  const validateForm = () => {
    const errors = [];
    const now = new Date();
    const startDate = new Date(cohort.startDate);
    const endDate = new Date(cohort.endDate);
    const enrollmentDeadline = new Date(cohort.enrollmentDeadline);

    if (startDate <= now) {
      errors.push("Start date must be in the future");
    }
    if (endDate <= startDate) {
      errors.push("End date must be after start date");
    }
    if (enrollmentDeadline >= startDate) {
      errors.push("Enrollment deadline must be before start date");
    }
    if (cohort.courses.length === 0) {
      errors.push("At least one course must be selected");
    }
    if (cohort.maxStudents < 1) {
      errors.push("Maximum students must be at least 1");
    }
    
    return errors;
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setCohort(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleCourseSelection = (e) => {
    const value = Array.from(e.target.selectedOptions, option => option.value);
    setCohort(prev => ({
      ...prev,
      courses: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    
    // Validate form
    const validationErrors = validateForm();
    if (validationErrors.length > 0) {
      setError(validationErrors.join(", "));
      toast.error(validationErrors.join(", "), { autoClose: 6000 });
      setIsLoading(false);
      return;
    }    // Format dates for API and remove _id for new cohorts
    const formattedCohort = {
      ...cohort,
      startDate: new Date(cohort.startDate).toISOString(),
      endDate: new Date(cohort.endDate).toISOString(),
      enrollmentDeadline: new Date(cohort.enrollmentDeadline).toISOString()
    };
    
    // Remove _id field when creating a new cohort
    if (!cohort._id) {
      delete formattedCohort._id;
    }

    try {
      let message;
      if (cohort._id) {
        // Update existing cohort
        await updateCohortData(cohort._id, formattedCohort);
        message = 'Cohort settings updated successfully';
      } else {
        // Create new cohort
        await submitCohort(formattedCohort);
        message = 'New cohort created successfully';
      }
        toast.success(message, { autoClose: 6000 });
      setSuccessMessage(message);
      loadCohorts();
      setShowForm(false);
    } catch (err) {
      const message = err.response?.data?.message || 'Failed to save settings';
      setError(message);
      toast.error(message, { autoClose: 6000 });
    } finally {
      setIsLoading(false);
    }
  };

  const handleEdit = (cohortData) => {
    const formattedDates = {
      startDate: formatDateForInput(cohortData.startDate),
      endDate: formatDateForInput(cohortData.endDate),
      enrollmentDeadline: formatDateForInput(cohortData.enrollmentDeadline)
    };
    setCohort({ ...cohortData, ...formattedDates });
    setShowForm(true);
  };

  const handleDelete = async (cohortId) => {
    if (window.confirm('Are you sure you want to delete this cohort?')) {
      try {
        await removeCohort(cohortId);
        toast.success('Cohort deleted successfully');
        loadCohorts();
      } catch (error) {
        console.error('Failed to delete cohort:', error);
        toast.error('Failed to delete cohort');
      }
    }
  };

  const handleCreateNew = () => {
    setCohort({
      _id: '',
      title: '',
      startDate: '',
      endDate: '',
      enrollmentDeadline: '',
      courses: [],
      maxStudents: 30,
      isWaitlistEnabled: false,
      currentEnrollment: 0,
      status: 'upcoming',
      description: '',
      scheduleTime: "Saturdays and Sundays, 14:00 - 16:00 (CET)",
      deliveryMode: "Online (via Microsoft Teams)"
    });
    setShowForm(true);
  };

  if (isLoading && !cohort.title) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-teal-600" />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Cohort Management</h1>
          <p className="text-gray-500 mt-1">Manage all cohorts and their settings</p>
        </div>
        <button
          onClick={handleCreateNew}
          className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-teal-600 border border-transparent rounded-md shadow-sm hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
        >
          <Plus className="w-4 h-4 mr-2" />
          Create New Cohort
        </button>
      </div>

      {/* Cohorts Table */}
      <div className="bg-white shadow-sm rounded-lg overflow-hidden mb-8">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Dates</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Enrollment</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {cohorts.map((cohort) => (
                <tr key={cohort._id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{cohort.title}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                      ${cohort.status === 'upcoming' ? 'bg-yellow-100 text-yellow-800' : 
                        cohort.status === 'ongoing' ? 'bg-green-100 text-green-800' : 
                        'bg-gray-100 text-gray-800'}`}>
                      {cohort.status.charAt(0).toUpperCase() + cohort.status.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {new Date(cohort.startDate).toLocaleDateString()} - {new Date(cohort.endDate).toLocaleDateString()}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {cohort.currentEnrollment}/{cohort.maxStudents}
                    {cohort.isWaitlistEnabled && (
                      <span className="ml-2 px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                        Waitlist
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button
                      onClick={() => handleEdit(cohort)}
                      className="text-teal-600 hover:text-teal-900 mr-4"
                    >
                      <Pencil className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(cohort._id)}
                      className="text-red-600 hover:text-red-900"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Form Section */}
      {showForm && (
        <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
          <div className="mb-8">
            <h2 className="text-xl font-bold text-gray-900">
              {cohort._id ? 'Edit Cohort Settings' : 'Create New Cohort'}
            </h2>
            <p className="text-gray-500 mt-1">
              {cohort._id ? 'Manage cohort details and enrollment settings' : 'Set up a new cohort'}
            </p>
          </div>

          {error && (
            <div className="mb-6 flex items-center bg-red-50 p-4 rounded-lg text-red-600">
              <AlertCircle className="h-5 w-5 mr-2" />
              <span>{error}</span>
            </div>
          )}

          {successMessage && (
            <div className="mb-6 bg-green-50 p-4 rounded-lg text-green-600">
              {successMessage}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Basic Details Section */}
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Basic Details</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Cohort Title
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={cohort.title}
                    onChange={handleInputChange}
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500 sm:text-sm"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Maximum Students
                  </label>
                  <input
                    type="number"
                    name="maxStudents"
                    value={cohort.maxStudents}
                    onChange={handleInputChange}
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500 sm:text-sm"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Start Date
                  </label>
                  <input
                    type="date"
                    name="startDate"
                    value={cohort.startDate?.split('T')[0] || ''}
                    onChange={handleInputChange}
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500 sm:text-sm"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    End Date
                  </label>
                  <input
                    type="date"
                    name="endDate"
                    value={cohort.endDate?.split('T')[0] || ''}
                    onChange={handleInputChange}
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500 sm:text-sm"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Course Selection */}
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Course Selection</h2>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Available Courses
                </label>
                <select
                  multiple
                  name="courses"
                  value={cohort.courses}
                  onChange={handleCourseSelection}
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500 sm:text-sm h-32"
                  required
                >
                  {courses.map(course => (
                    <option key={course.value} value={course.value}>
                      {course.label}
                    </option>
                  ))}
                </select>
                <p className="mt-1 text-sm text-gray-500">Hold Ctrl (Windows) or Command (Mac) to select multiple courses</p>
              </div>
            </div>

            {/* Enrollment Section */}
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Enrollment Settings</h2>
              
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <label className="text-sm font-medium text-gray-700">
                      Enable Waitlist
                    </label>
                    <p className="text-sm text-gray-500">
                      When enabled, new applications will be added to a waitlist
                    </p>
                  </div>
                  <div className="ml-4">
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        name="isWaitlistEnabled"
                        checked={cohort.isWaitlistEnabled}
                        onChange={handleInputChange}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-teal-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-teal-600"></div>
                    </label>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Current Enrollment
                    </label>
                    <input
                      type="number"
                      name="currentEnrollment"
                      value={cohort.currentEnrollment}
                      onChange={handleInputChange}
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500 sm:text-sm"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Enrollment Deadline
                    </label>
                    <input
                      type="date"
                      name="enrollmentDeadline"
                      value={cohort.enrollmentDeadline?.split('T')[0] || ''}
                      onChange={handleInputChange}
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500 sm:text-sm"
                      required
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Status
                    </label>
                    <select
                      name="status"
                      value={cohort.status}
                      onChange={handleInputChange}
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500 sm:text-sm"
                      required
                    >
                      <option value="upcoming">Upcoming</option>
                      <option value="ongoing">Ongoing</option>
                      <option value="completed">Completed</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

            {/* Schedule & Mode */}
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Schedule & Delivery</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Schedule Time
                  </label>
                  <input
                    type="text"
                    name="scheduleTime"
                    value={cohort.scheduleTime}
                    onChange={handleInputChange}
                    placeholder="e.g. Saturdays and Sundays, 14:00 - 16:00 (CET)"
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500 sm:text-sm"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Delivery Mode
                  </label>
                  <input
                    type="text"
                    name="deliveryMode"
                    value={cohort.deliveryMode}
                    onChange={handleInputChange}
                    placeholder="e.g. Online (via Microsoft Teams)"
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500 sm:text-sm"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Description</h2>
              <div>
                <textarea
                  name="description"
                  value={cohort.description}
                  onChange={handleInputChange}
                  rows={4}
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500 sm:text-sm"
                  required
                />
              </div>
            </div>

            {/* Form Actions */}
            <div className="flex justify-end space-x-4">
              <button
                type="button"
                onClick={() => navigate('/admin/dashboard')}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isLoading}
                className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-teal-600 border border-transparent rounded-md shadow-sm hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 disabled:opacity-50"
              >
                {isLoading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                    {cohort._id ? 'Saving...' : 'Creating...'}
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4 mr-2" />
                    {cohort._id ? 'Save Changes' : 'Create Cohort'}
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      )}

      <ToastContainer position="top-center" />
    </div>
  );
};

export default CohortSettings;