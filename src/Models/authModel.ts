export interface User
{
   Id:string;
   Email:string;
   Name:string;
   Password:string;
   isDeleted:number
   isEmailSent:boolean

}
export interface Payload
{
   Sub:string;
   Name:string;
}
