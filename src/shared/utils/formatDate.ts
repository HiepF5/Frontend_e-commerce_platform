 export const convertToDateInputFormat = (dateString: string) => {
    const [day, month, year] = dateString.split('/')
    return `${year}-${month}-${day}` // Chuyển thành yyyy-MM-dd
  }