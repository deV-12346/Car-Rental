import "next-auth"
import { DefaultSession } from "next-auth";
declare module "next-auth"{
      export interface User {
            _id?:string;
            username?:string;
            email?:string;
            isVerified?:boolean;
            coverImage?:string
      }
      interface Session {
            user:{
            _id?:string;
            username?:string;
            email?:string;
            isVerified?:boolean;
            coverImage?:string
            }& DefaultSession["user"]
      }
}
declare module "next-auth/jwt"{
      interface JWT{
      _id?:string;
      username?:string;
      email?:string;
      isVerified?:boolean;
      coverImage?:string   
      }
}