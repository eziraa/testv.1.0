const getDateForInput = (date?: string) => {
  // Convert the date string to a Date object
  const dateObj = new Date(date || "");
  const year = dateObj.getFullYear();
  const month = String(dateObj.getMonth() + 1).padStart(2, "0");
  const day = String(dateObj.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

const formattedDate = (date?: string) => {
  // Convert the date string to a Date object
  const dateObj = new Date(date || "");

  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  return dateObj.toLocaleDateString(undefined, options);
};

// Date to calculate some seconds or minutes or day or months ago
const calculateAgo = (date?: string) => {
  const dateObj = new Date(date || "");
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - dateObj.getTime()) / 1000);

  if (diffInSeconds < 60) {
    return `${diffInSeconds} seconds ago`;
  } else if (diffInSeconds < 3600) {
    const minutes = Math.floor(diffInSeconds / 60);
    return `${minutes} minutes ago`;
  } else if (diffInSeconds < 86400) {
    const hours = Math.floor(diffInSeconds / 3600);
    return `${hours} hours ago`;
  } else {
    const days = Math.floor(diffInSeconds / 86400);
    return `${days} days ago`;
  }
};

export { getDateForInput, formattedDate, calculateAgo };
