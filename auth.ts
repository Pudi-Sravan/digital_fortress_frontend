import NextAuth from "next-auth"
import authConfig from "./auth.config"

export const { handlers, auth, signIn, signOut } = NextAuth({
    session: { strategy: "jwt" },
    ...authConfig,
        
    debug: process.env.NODE_ENV === 'development',
    callbacks: {
        async jwt({ token, trigger, session, account }) {
            if (account?.provider === "google") {
                return { ...token, accessToken: account.access_token , idToken: account.id_token }
            }
            return token;
        },
        async session({ session, token}) {
            session.accessToken = token.idToken as string ;
            // session.idToken = token.idToken as string ;
            // session.user = token.user as any ;
            return session
        }
    },
    secret: process.env.AUTH_SECRET,
    pages:{
        signIn: '/',
    },
})
