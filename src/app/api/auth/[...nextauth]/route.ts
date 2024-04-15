import NextAuth, { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"

const nextAuthOptions: NextAuthOptions = {
	providers: [
		CredentialsProvider({
			name: 'credentials',
			credentials: {
				email: { label: 'email', type: 'email' },
				password: { label: 'password', type: 'password' }
			},

			async authorize(credentials) {
				const res = await fetch("http://localhost:3000/api/usuarios/login", {
					method: 'POST',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify({
						email: credentials?.email,
						password: credentials?.password,
					}),
				});
		
				const user = await res.json();
		
				if (res.ok && user) {
					return user;
				}
		
				// Return null if user data could not be retrieved
				return null;
			},
		})
	],
	pages: {
		signIn: '/login'
	},
	callbacks: {
		async jwt({ token, user }) {
			user && (token.user = user)
			return token
		},
		async session({ session, token }){
			session = token.user as any
			return session
		}
	}
}

const handler = NextAuth(nextAuthOptions)

export { handler as GET, handler as POST, nextAuthOptions }