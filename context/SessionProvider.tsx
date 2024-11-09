"use client";

import { SessionProvider } from "next-auth/react"

interface AuthContextProps {
    session: any;
    children: React.ReactNode;
}

export default function AuthContext({children , session}: AuthContextProps ) {
    return <SessionProvider session={session}>{children}</SessionProvider>
}