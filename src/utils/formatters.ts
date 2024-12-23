// Format amount to 2 decimal places
export const formatAmount = (amount: number | undefined): string => {
  if (typeof amount !== 'number') return '0.00';
  return amount.toFixed(2);
};

// Format date to ISO string
export const formatDate = (date: Date | string): string => {
  if (typeof date === 'string') {
    // If it's already an ISO string, return it
    if (date.includes('T')) return date;
    // Otherwise, create a new Date and convert to ISO
    return new Date(date).toISOString();
  }
  return date.toISOString();
};

// Format date for display
export const formatDisplayDate = (date: string): string => {
  return new Date(date).toLocaleString();
};