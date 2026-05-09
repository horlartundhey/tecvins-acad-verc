import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSubscribers } from '../../redux/slices/newsletterSlice';

const NewsletterSubscribers = () => {
  const dispatch = useDispatch();
  const { subscribers, subscribersLoading, subscribersError } = useSelector((state) => state.newsletter);
  const hasInitialized = useRef(false);
  const [search, setSearch] = useState('');

  useEffect(() => {
    if (!hasInitialized.current) {
      hasInitialized.current = true;
      dispatch(fetchSubscribers());
    }
  }, [dispatch]);

  const filtered = subscribers.filter((s) =>
    s.email.toLowerCase().includes(search.toLowerCase())
  );

  const activeCount = subscribers.filter((s) => s.isSubscribed).length;
  const unsubscribedCount = subscribers.filter((s) => !s.isSubscribed).length;

  return (
    <div className="bg-white rounded-lg shadow-sm p-6 mt-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h2 className="text-xl font-semibold text-gray-900">Newsletter Subscribers</h2>
          <p className="text-sm text-gray-500 mt-1">
            {subscribers.length} total &nbsp;·&nbsp;
            <span className="text-green-600">{activeCount} active</span>
            &nbsp;·&nbsp;
            <span className="text-gray-400">{unsubscribedCount} unsubscribed</span>
          </p>
        </div>
        <input
          type="text"
          placeholder="Search by email..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#3B9790] w-full sm:w-64"
        />
      </div>

      {subscribersLoading && <p className="text-gray-500">Loading subscribers...</p>}
      {subscribersError && <p className="text-red-600">{subscribersError}</p>}

      {!subscribersLoading && !subscribersError && (
        <>
          {filtered.length === 0 ? (
            <p className="text-gray-500">
              {search ? 'No subscribers match your search.' : 'No subscribers yet.'}
            </p>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200 text-sm">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">#</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Subscribed At</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filtered.map((subscriber, index) => (
                    <tr key={subscriber._id} className="hover:bg-gray-50">
                      <td className="px-4 py-3 text-gray-500">{index + 1}</td>
                      <td className="px-4 py-3 font-medium text-gray-900">{subscriber.email}</td>
                      <td className="px-4 py-3">
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            subscriber.isSubscribed
                              ? 'bg-green-100 text-green-800'
                              : 'bg-gray-100 text-gray-600'
                          }`}
                        >
                          {subscriber.isSubscribed ? 'Active' : 'Unsubscribed'}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-gray-500">
                        {new Date(subscriber.subscribedAt).toLocaleDateString('en-GB', {
                          day: '2-digit',
                          month: 'short',
                          year: 'numeric',
                        })}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default NewsletterSubscribers;
