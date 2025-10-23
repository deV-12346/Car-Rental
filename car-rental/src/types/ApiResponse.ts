export interface ApiResponse<T> {
      success:boolean;
      message?:string
      data?:T
}

export interface UsersResponse {
  users: []
  admins: []
}
export interface DashboardStats {
  totalusers: number
  totalcars: number
  totalBooking: number
  totalRevenue: number
}