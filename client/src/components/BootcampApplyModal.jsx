import { useEffect } from 'react';
import { X, Mail } from 'lucide-react';

const TIMELINE = [
  { activity: 'Send the next-steps email', date: 'Tuesday, 21 July' },
  { activity: 'Send/open the screening test', date: 'Wednesday, 22 July at 18:00 WAT' },
  { activity: 'Screening test closes', date: 'Saturday, 25 July at 18:00 WAT' },
  { activity: 'Review and validate results', date: '26-27 July' },
  { activity: 'Communicate selection results', date: 'Tuesday, 28 July' },
  { activity: 'Orientation and Teams onboarding', date: 'Thursday, 30 July' },
  { activity: 'Training begins', date: 'Saturday, 1 August' },
];

const BootcampApplyModal = ({ isOpen, onClose }) => {
  // Close modal on escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') onClose();
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[70] p-4">
      <div className="bg-white rounded-lg w-full max-w-lg max-h-[90vh] flex flex-col overflow-hidden">
        {/* Header */}
        <div className="flex justify-between items-start p-6 border-b bg-white">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">
              Mobile App Development Bootcamp
            </h2>
            <p className="text-sm text-gray-500 mt-1">Screening test timeline</p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors flex-shrink-0 ml-4"
            aria-label="Close"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          <div className="border border-gray-200 rounded-md divide-y divide-gray-100">
            {TIMELINE.map((row) => (
              <div key={row.activity} className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 px-4 py-3">
                <p className="text-sm font-medium text-gray-900">{row.activity}</p>
                <p className="text-sm text-gray-500 sm:text-right">{row.date}</p>
              </div>
            ))}
          </div>

          <div className="bg-teal-50 border border-teal-200 rounded-md p-4 text-sm text-teal-900 flex items-start gap-2">
            <Mail className="w-4 h-4 mt-0.5 flex-shrink-0" />
            <p>
              Your screening test link was sent to the email you applied with. If you can't find it, check your
              spam folder or reach out to us.
            </p>
          </div>
        </div>

        {/* Actions */}
        <div className="p-6 pt-0">
          <button
            type="button"
            onClick={onClose}
            className="w-full bg-teal-600 hover:bg-teal-700 text-white font-semibold py-3 px-4 rounded-md transition-colors text-base"
          >
            Got it
          </button>
        </div>
      </div>
    </div>
  );
};

export default BootcampApplyModal;
