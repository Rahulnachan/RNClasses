export const formatPrice = (price) => {
  if (price === "Free" || price === 0) return "Free";
  if (typeof price === 'number') {
    return `₹${price.toLocaleString('en-IN')}`;
  }
  return price;
};

export const convertToRupees = (usdPrice) => {
  if (!usdPrice) return 0;
  return Math.round(usdPrice * 83);
};

export const formatDate = (date) => {
  return new Date(date).toLocaleDateString('en-IN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

export const truncateText = (text, length = 100) => {
  if (!text) return '';
  if (text.length <= length) return text;
  return text.substring(0, length) + '...';
};

export const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

export const validateEmail = (email) => {
  return /\S+@\S+\.\S+/.test(email);
};

export const validatePhone = (phone) => {
  return /^[6-9]\d{9}$/.test(phone);
};

export const calculateProgress = (completed, total) => {
  if (total === 0) return 0;
  return Math.round((completed / total) * 100);
};

export const getInitials = (name) => {
  if (!name) return 'U';
  return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
};