import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllContacts, deleteContact, updateContactStatus } from '../../redux/slices/contactSlice';

const statusOptions = ['pending', 'responded', 'closed'];

const ContactMessages = () => {
  const dispatch = useDispatch();
  const { contacts, isLoading, error } = useSelector((state) => state.contact);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    dispatch(fetchAllContacts());
  }, [dispatch]);

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this message?')) {
      dispatch(deleteContact(id));
    }
  };

  const handleStatusChange = (id, status) => {
    dispatch(updateContactStatus({ id, status }));
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6 mt-8">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">Contact Messages</h2>
      {isLoading && <p className="text-gray-500">Loading messages...</p>}
      {error && <p className="text-red-600">{error}</p>}
      {!isLoading && contacts && contacts.length === 0 && (
        <p className="text-gray-500">No contact messages found.</p>
      )}
      {!isLoading && contacts && contacts.length > 0 && (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Phone</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Message</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {contacts.map((contact) => (
                <tr key={contact._id}>
                  <td className="px-4 py-2 whitespace-nowrap">{contact.firstName} {contact.lastName}</td>
                  <td className="px-4 py-2 whitespace-nowrap">{contact.email}</td>
                  <td className="px-4 py-2 whitespace-nowrap">{contact.phoneNumber || '-'}</td>
                  <td className="px-4 py-2 whitespace-nowrap max-w-xs truncate" title={contact.message}>{contact.message}</td>
                  <td className="px-4 py-2 whitespace-nowrap">{new Date(contact.createdAt).toLocaleString()}</td>
                  <td className="px-4 py-2 whitespace-nowrap capitalize">
                    <select
                      value={contact.status}
                      onChange={e => handleStatusChange(contact._id, e.target.value)}
                      className="border rounded px-2 py-1 text-sm"
                    >
                      {statusOptions.map(opt => (
                        <option key={opt} value={opt}>{opt}</option>
                      ))}
                    </select>
                  </td>
                  <td className="px-4 py-2 whitespace-nowrap flex gap-2">
                    <button
                      onClick={() => setSelected(contact)}
                      className="text-blue-600 hover:underline text-sm"
                    >
                      View
                    </button>
                    <button
                      onClick={() => handleDelete(contact._id)}
                      className="text-red-600 hover:underline text-sm"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {/* Modal for viewing message details */}
      {selected && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
          <div className="bg-white rounded-lg shadow-lg max-w-lg w-full p-6 relative animate-fadeIn">
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-800 text-2xl font-bold"
              onClick={() => setSelected(null)}
              aria-label="Close"
            >
              &times;
            </button>
            <h3 className="text-xl font-bold mb-4">Contact Message Details</h3>
            <div className="space-y-2">
              <div><span className="font-semibold">Name:</span> {selected.firstName} {selected.lastName}</div>
              <div><span className="font-semibold">Email:</span> {selected.email}</div>
              <div><span className="font-semibold">Phone:</span> {selected.phoneNumber || '-'}</div>
              <div><span className="font-semibold">Status:</span> <span className="capitalize">{selected.status}</span></div>
              <div><span className="font-semibold">Date:</span> {new Date(selected.createdAt).toLocaleString()}</div>
              <div><span className="font-semibold">Message:</span>
                <div className="mt-1 p-2 bg-gray-100 rounded text-gray-800 whitespace-pre-line max-h-60 overflow-y-auto">{selected.message}</div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ContactMessages;
