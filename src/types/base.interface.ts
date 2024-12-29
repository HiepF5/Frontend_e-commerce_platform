export interface IBaseResponse<T> {
  code: number
  message: string | null
  data: T
  status: boolean
}
export interface PaginationResponse<T> {
  data: T[]
  totalAmount: number
  totalPage: number
  pageNumber: number
  pageSize: number
} 