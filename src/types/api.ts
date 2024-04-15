export enum APIPaths {
  RefreshToken = '/auth/refresh-token',
  Login = '/auth/login',
  FetchProducts = '/admin/products',
  BuyProducts = '/employee/products/buy',
  FetchEmployeeHistoryProducts = '/admin/products/history',
  AddProduct = '/admin/products/add',
  FetchUser = '/users/'
}

export interface IResponse<T extends object> {
  message: string;
  result: T
}