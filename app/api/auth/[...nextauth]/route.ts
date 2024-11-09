import { handlers } from "@/auth"
export const { GET, POST } = handlers

// "use server"
// import NextAuth, { getServerSession } from 'next-auth';
// import GoogleProvider from 'next-auth/providers/google';
// import { backendSignIn } from '@/components/GoogleSignIn/googleSignIn';
 
// Configuration options for authentication
// export const handler = NextAuth({
//   callbacks: {
//     async jwt({ token, account }) {
//       console.log(token)
//       // if (account) {
//       // token.accessToken = account.access_token as string;
//       console.log("Starting Backend SignIn")
//       await backendSignIn(token);
//       console.log("Ending Backend SignIn")
//       // token.refreshToken = account.refresh_token as string;
//       // }
//       return token;
//     },
//     async session({ session, token }) {
//       session.accessToken = token.accessToken as string;
//       return session;
//     },
//     async signIn({ account, profile }) {
//       console.log(account)
//       if (account?.provider === "google") {
        
//       }
//       return true // Do different verification for other providers that don't have `email_verified`
//     },
//   },

//   providers: [
//     GoogleProvider({
//       clientId: process.env.GOOGLE_CLIENT_ID!,
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
//       // allowDangerousEmailAccountLinking: true,
//       authorization: {
//         params: {
//             prompt: "consent",
//             access_type: "offline",
//             response_type: "code",
//         },
//     },
//     }),
//   ],
//   secret: process.env.NEXTAUTH_SECRET,
//   session: {
//     strategy: 'jwt',
//     maxAge: 30 * 24 * 60 * 60, // 30 days
//     updateAge: 24 * 60 * 60, // 24 hours
//   },
//   jwt: {
//     secret: process.env.NEXTAUTH_SECRET
//   }
// });

// export { handler as GET, handler as POST };
 
// Utility function to retrieve the server session with authentication options
// export const getServerAuthSession = () => getServerSession(handler);