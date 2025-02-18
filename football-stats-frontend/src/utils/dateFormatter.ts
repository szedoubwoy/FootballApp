export const formatDate = (dateString: string): string => {
  const [year, month, day] = dateString.split('-');
  return `${day}-${month}-${year}`;
};

export const formatDateTime = (date: string, time: string): string => {
  const formattedDate = formatDate(date);
  return `${formattedDate} ${time}`;
};