import Sidebar from "@/components/dashboard/sidebar";
import Header from "@/components/dashboard/header";
import NextAuth from "next-auth";
import NextAuthSessionProvider from "@/providers/sessionProvider";
import { getServerSession } from "next-auth";
import { ReactNode } from "react";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";


interface PrivateLayoutProps {
	children: ReactNode
}

export default async function PrivateLayout({ children }: PrivateLayoutProps){
	const session = await getServerSession(authOptions)

	if (!session) {
		redirect('/login')
	}

	return (
  <NextAuthSessionProvider>
    <div className="grid min-h-screen w-full lg:grid-cols-[280px_1fr]">
      <Sidebar />
      <div className="flex flex-col">
        <Header />
        <main className="flex min-h-[calc(100vh_-_theme(spacing.16))] flex-1 flex-col gap-4 p-4 md:gap-8 md:p-10">
          {children}
        </main>
      </div>
    </div>
  </NextAuthSessionProvider>
  )
}


