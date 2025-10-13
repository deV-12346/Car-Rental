import { NextAuthOptions } from "next-auth"
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { connectDb } from "@/libs/connectDb";
import { UserModel } from "@/model/user.model";
import bcrypt from "bcryptjs";
export const authOptions:NextAuthOptions = {
      providers: [
      GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code"
        }
      }
      }),
      CredentialsProvider({
                  id: "credentials",
                  name: "Credentials",
                  credentials: {
                        email: {type: "text",placeholder:"Email"},
                        password: { type: "password",placeholder:"Password"}
                  },
                  async authorize(credentials):Promise<any> {
                        await connectDb()
                        try {
                              if(!credentials || !credentials.email || !credentials.password){
                                    throw new Error("Please enter email or password")
                              }
                              const user = await UserModel.findOne({
                                    $and : [
                                          {email:credentials.email},
                                          {provider:"Custom"}
                                    ]
                              })
                              if (!user) {
                                    throw new Error("User not found")
                              }
                              if(!user.password){
                                    throw new Error("Please try with google")
                              }
                              if (!user.isVerified) {
                                    throw new Error("Please verify your account before login")
                              }
                              const isPassswordCorrect = await bcrypt.compare(credentials.password,user.password)
                              if (isPassswordCorrect) {
                                    return user
                              } else {
                                    throw new Error("Invalid Pasword")
                              }
                        }
                        catch (error) {
                              console.log(error)
                              throw new Error("Something went wrong")
                        }
                  }
            })
      ],
      callbacks:{
            async signIn({user,account}){
                  if(account?.provider === "Google"){
                       await connectDb()
                       const existingUser = await UserModel.findOne({email:user.email})
                       if(!existingUser){
                           const newUser = new UserModel({
                              username:user.username,
                              email:user.email,
                              isVerified:user.isVerified,
                              coverImage : user.coverImage,
                              provider:"Google"
                           })
                           await newUser.save()
                           console.log(newUser)
                       }
                  }
                  return true;
            },
            async jwt({token,user}){
                  if(user){
                        token._id = user?.id.toString()
                        token.username = user.username
                        token.email = user.email
                        token.isVerified = user.isVerified
                        token.coverImage = user.coverImage
                  }
                  console.log(token)
                  return token
            },
            async session({session,token}){
                  if(session){
                  session.user._id = token._id
                  session.user.username = token.username
                  session.user.email = token.email
                  session.user.isVerified = token.isVerified
                  session.user.coverImage = token.coverImage
                  }
                  return session
            },
      },
      pages: {
            signIn: "/sign-in"
      },
      session: {
            strategy: "jwt"
      },
      secret: process.env.SECRET_KEY
}