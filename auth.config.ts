import GoogleProvider from "next-auth/providers/google"
import type { NextAuthConfig } from "next-auth"
import myHttpAdapter from "./adapter"
 
export default { 
    providers: [GoogleProvider],
    // adapter: myHttpAdapter,
    
} satisfies NextAuthConfig