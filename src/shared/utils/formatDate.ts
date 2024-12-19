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