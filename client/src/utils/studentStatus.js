export const formatStatusLabel = (status = '') => {
  const normalized = String(status || '').toLowerCase().trim();

  switch (normalized) {
    case 'accepted':
      return 'Accepted';
    case 'approved':
      return 'Approved';
    case 'rejected':
      return 'Rejected';
    case 'enrolled':
      return 'Enrolled';
    case 'pending':
      return 'Pending';
    default:
      return normalized
        .split(/[-_\s]+/)
        .filter(Boolean)
        .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
        .join(' ') || 'Unknown Status';
  }
};

export const getStatusStyles = (status = '') => {
  const normalized = String(status || '').toLowerCase().trim();

  if (normalized === 'approved' || normalized === 'accepted') {
    return {
      badge: 'bg-green-100 text-green-800',
      dot: 'bg-green-500',
    };
  }

  if (normalized === 'enrolled') {
    return {
      badge: 'bg-blue-100 text-blue-800',
      dot: 'bg-blue-500',
    };
  }

  if (normalized === 'rejected') {
    return {
      badge: 'bg-red-100 text-red-800',
      dot: 'bg-red-500',
    };
  }

  return {
    badge: 'bg-yellow-100 text-yellow-800',
    dot: 'bg-yellow-500',
  };
};
