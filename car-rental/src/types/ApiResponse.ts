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
export interface AdminBooking{
    _id:string
    startDate:Date;
    endDate:Date;
    totalPrice:number;
    status:string;
    username:string;
    email:string;
    carNumber:string;
    model:number;
    brand:string
}