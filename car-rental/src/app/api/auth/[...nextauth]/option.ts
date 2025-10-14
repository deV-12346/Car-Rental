import { NextAuthOptions } from "next-auth"
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { connectDb } from "@/libs/connectDb";
import { UserModel,User } from "@/model/user.model";
import bcrypt from "bcryptjs";

interface Crendetails  {
      identifier:string;
      password:string
}

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
      },
      httpOptions: {
        timeout: 10000, // increase timeout to prevent OAuthCallbackError
      },
      }),
      CredentialsProvider({
                  id: "credentials",
                  name: "Credentials",
                  credentials: {
                        identifier: {type: "text",placeholder:"Email"},
                        password: { type: "password",placeholder:"Password"}
                  },
                  async authorize(credentials:Crendetails):Promise<User | null> {
                        await connectDb()
                        try {
                              if(!credentials || !credentials?.identifier || !credentials?.password){
                                    throw new Error("Please enter email or password")
                              }
                              const user = await UserModel.findOne({
                                    $and : [
                                          {email:credentials?.identifier},
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
                              const isPassswordCorrect = await bcrypt.compare(credentials?.password,user.password)
                              if (isPassswordCorrect) {
                                    return user
                              } else {
                                    throw new Error("Invalid Pasword")
                              }
                        }
                        catch (error:unknown) {
                              if(error instanceof Error){
                                    throw new Error(error.message)
                              }else{
                                    throw new Error("Something went wrong")
                              }
                              
                        }
                  }
            }) 
      ],
      callbacks:{
            async signIn({user,account}){
                  if(account?.provider === "google"){
                  console.log("User comming from google",user)
                       await connectDb()
                       const existingUser = await UserModel.findOne({email:user.email})
                       if(!existingUser){
                           const newUser = new UserModel({
                              username:user.name,
                              email:user.email,
                              isVerified:true,
                              coverImage : user.image || "",
                              provider:"Google"
                           })
                           await newUser.save()
                           console.log("Google user :",newUser)                       }
                  }
                  return true
            },
            async jwt({token,user}){
                  if(user){
                        const dbUser = await UserModel.findOne({email: user?.email })
                        if (dbUser) {
                        token._id = dbUser.id.toString();
                        token.username = dbUser.username;
                        token.email = dbUser.email;
                        token.isVerified = dbUser.isVerified;
                        token.coverImage = dbUser.coverImage;
                       }
                  }
                  console.log(token)
                  return token
            },
            async session({session,token}){
                  if(session.user){
                  session.user = {
                  _id: token._id,
                  username: token.username,
                  email: token.email,
                  isVerified: token.isVerified,
                  coverImage: token.coverImage,
                  };
                  }
                  return session
            },
      },
      pages: {
            signIn: "/signin"
      },
      session: {
            strategy: "jwt"
      },
      secret: process.env.SECRET_KEY
}