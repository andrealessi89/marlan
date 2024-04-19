import { authOptions  } from "@/lib/auth";
import NextAuth, { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"



const handler = NextAuth(authOptions) as never;

export { handler as GET, handler as POST }