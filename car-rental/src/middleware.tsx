import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function middleware (request:NextRequest){
      const token = await getToken({req:request,secret:process.env.SECRET_KEY}) 
      const url = request.nextUrl
      console.log(token)
      if(token && token?.role === "User" &&
            (url.pathname.startsWith("/sign-in")||
            url.pathname.startsWith("/sign-up") ||
            url.pathname.startsWith("/verify-email") ||
            url.pathname.startsWith("/admin"))
      )
      {
            return NextResponse.redirect(new URL("/",request.url))
      }
      if(!token && 
            (url.pathname.startsWith("/my-profile")||
            url.pathname.startsWith("/admin"))
      ){
            return NextResponse.redirect(new URL("/sign-in",request.url))
      }
      if(token && token?.role === "Admin" && 
            (url.pathname.startsWith("/my-profile") ||
            url.pathname.startsWith("/sign-in") || 
            url.pathname.startsWith("/sign-up") || 
            url.pathname.startsWith("/verify") || 
            url.pathname.startsWith("/sign-in") ||
            url.pathname === "/" ||  
            url.pathname.startsWith("/contact-us") || 
            url.pathname.startsWith("/about-us") || 
            url.pathname.startsWith("/cars"))
      ){
            return NextResponse.redirect(new URL("/admin/dashboard",request.url))
      }
} 
export const config = {
      matcher:[
            "/sign-in",
            "/sign-up",
            "/verify-email/:path*",
            "/",
            "/cars",
            "/contact-us",
            "/about-us",
            "/my-profile",
            "/admin/:path*"
      ]
}