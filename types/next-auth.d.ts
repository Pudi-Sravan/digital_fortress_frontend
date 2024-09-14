import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    accessToken?: string; // Add accessToken to the session
  }

  interface JWT {
    accessToken?: string; // Add accessToken to the JWT
  }
}