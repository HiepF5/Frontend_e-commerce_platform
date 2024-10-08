export interface IBaseResponse<T> {
  code: number
  message: string | null
  data: T
  status: boolean
}
