export interface User {
   first_name: string
   last_name: string
   email: string
   password: string
   auth_id: string
   user_role: UserRole
}

export enum UserRole {
   Admin = 'admin',
   Customer = 'customer',
   Employee = 'employee',
}
