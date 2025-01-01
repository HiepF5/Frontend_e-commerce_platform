 export const convertToDateInputFormat = (dateString: string) => {
    const [day, month, year] = dateString.split('/')
    return `${year}-${month}-${day}` // Chuyển thành yyyy-MM-dd
  }
export const formatDate = (dateString: string): string => {
  const date = new Date(dateString)
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }).format(date)
}
export const formatDateOrder = (dateString: string): string => {
  const [day, month, yearAndTime] = dateString.split('/');
  const [year, time] = yearAndTime.split(' ');
  const formattedDate = new Date(`${year}-${month}-${day}T${time}`);
  return formattedDate.toLocaleDateString('vi-VN'); // Hoặc thay đổi thành locale khác như 'en-US'
};
