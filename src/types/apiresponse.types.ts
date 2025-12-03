export interface IApiResponse<T> {
  statusCode: number
  success: boolean
  message: string
  meta?: Meta
  data: T[]
}

export interface Meta {
  page: number
  limit: number
  total: number
  totalPages: number
}