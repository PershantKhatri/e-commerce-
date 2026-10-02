/**
 * Format a number into USD currency string (e.g., $1,234.56)
 * @param {number} amount 
 * @returns {string}
 */
export const formatCurrency = (amount) => {
  if (typeof amount !== 'number') return '$0.00';
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount);
};

/**
 * Format an ISO date string into a clean readable date (e.g., Oct 2, 2026)
 * @param {string | Date} dateString 
 * @returns {string}
 */
export const formatDate = (dateString) => {
  if (!dateString) return '';
  const options = { year: 'numeric', month: 'short', day: 'numeric' };
  return new Date(dateString).toLocaleDateString('en-US', options);
};