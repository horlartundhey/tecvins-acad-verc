import { useDispatch, useSelector } from 'react-redux';
import { submitWaitlist, getWaitlist, updateWaitlistStatus } from '../redux/slices/waitlistSlice';

// Map frontend course names to backend enum values
const mapCourseToBackend = (course) => {
    const courseMap = {
        'Product Management': 'product-management',
        'Product Design': 'product-design',
        'Product Development': 'development',
        'Frontend Development': 'development',
        'Backend Development': 'development',
        'Fullstack Development': 'development',
        'Job Readiness': 'job-readiness'
    };
    return courseMap[course] || course;
};

export const useWaitlist = () => {
    const dispatch = useDispatch();
    const { entries, isLoading, error, successMessage } = useSelector(
        (state) => state.waitlist
    );

    const loadWaitlistEntries = async () => {
        try {
            await dispatch(getWaitlist()).unwrap();
            return { success: true };
        } catch (error) {
            console.error('Failed to load waitlist entries:', error);
            return { 
                success: false, 
                error: error.message || 'Failed to load waitlist entries'
            };
        }
    };    const handleSubmitWaitlist = async (data) => {
        try {
            console.log('=== WAITLIST SUBMISSION DEBUG ===');
            console.log('Waitlist data received:', JSON.stringify(data, null, 2));

            // Map the course to backend format and ensure proper field names
            const mappedData = {
                ...data,
                course: mapCourseToBackend(data.course),
                // Ensure we're using preferredCohort for the backend
                preferredCohort: data.preferredCohort || data.cohortId,
            };
            
            // Remove cohortId if it exists to avoid confusion
            if (mappedData.cohortId) {
                delete mappedData.cohortId;
            }
            
            console.log('Mapped data:', JSON.stringify(mappedData, null, 2));
            
            // Validate required fields to match backend expectations
            const requiredFields = ['firstName', 'lastName', 'email', 'phoneNumber', 'course', 'country', 'timeZone', 'reason', 'preferredCohort'];
            const missingFields = requiredFields.filter(field => !mappedData[field]);
            
            if (missingFields.length > 0) {
                console.error('=== VALIDATION ERROR ===');
                console.error('Missing required fields:', missingFields);
                throw new Error(`Missing required fields: ${missingFields.join(', ')}`);
            }

            // Validate email format
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(mappedData.email)) {
                console.error('=== EMAIL VALIDATION ERROR ===');
                throw new Error('Invalid email format');
            }

            // Add timestamp and initial status
            const waitlistEntry = {
                ...mappedData,
                submittedAt: new Date().toISOString(),
                status: 'pending',
            };

            console.log('=== SENDING TO REDUX ===');
            console.log('Waitlist entry to be submitted:', JSON.stringify(waitlistEntry, null, 2));

            const result = await dispatch(submitWaitlist(waitlistEntry)).unwrap();
            
            console.log('=== SUBMISSION SUCCESS ===');
            console.log('Redux result:', JSON.stringify(result, null, 2));
            
            return { success: true, data: result };
        } catch (error) {
            console.error('=== WAITLIST SUBMISSION ERROR ===');
            console.error('Error object:', error);
            console.error('Error message:', error.message);
            console.error('Error response:', error.response?.data);
            return {
                success: false,
                error: error.message || 'Failed to submit to waitlist'
            };
        }
    };

    const updateWaitlistEntry = async (id, status, notifyStudent = true) => {
        try {
            const result = await dispatch(updateWaitlistStatus({ id, status, notifyStudent })).unwrap();
            return { success: true, data: result };
        } catch (error) {
            console.error('Failed to update waitlist entry:', error);
            return {
                success: false,
                error: error.message || 'Failed to update waitlist entry'
            };
        }
    };

    return {
        entries,
        isLoading,
        error,
        successMessage,
        submitWaitlist: handleSubmitWaitlist,
        loadWaitlistEntries,
        updateWaitlistEntry
    };
};
