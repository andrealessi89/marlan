'use client'

/**
 * v0 by Vercel.
 * @see https://v0.dev/t/L0RZR94hXPq
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { SyntheticEvent, useState } from "react";

export default function Component() {
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const router = useRouter()

    async function handleSubmit(event: SyntheticEvent) {
        event.preventDefault()
    
        const result = await signIn('credentials', {
          email,
          password,
          redirect: false
        })
    
        if (result?.error) {
          console.log(result)
          return
        }
    
        router.replace('/dashboard')
      }



    return (
        <main className="flex items-center justify-center h-screen bg-gray-100 dark:bg-gray-900">
            <div className="w-full max-w-md px-8 py-6 bg-white rounded-lg shadow-md dark:bg-gray-800">
                <div className="flex items-center justify-center">
                    <MountainIcon className="h-12 w-12 text-gray-600 dark:text-gray-200" />
                </div>
                <h2 className="mt-6 text-center text-3xl font-bold text-gray-700 dark:text-white">Catálogo Marlan</h2>
                <p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">Por favor entre com email e senha</p>
                <form className="mt-8" onSubmit={handleSubmit}>
                    <div className="grid gap-6">
                        <Label className="sr-only" htmlFor="email">
                            Email
                        </Label>
                        <Input
                            className="px-3 py-2 w-full text-gray-700 bg-gray-200 rounded-md focus:bg-white dark:bg-gray-700 dark:text-gray-300 dark:focus:bg-gray-600"
                            id="email"
                            placeholder="Email"
                            required
                            type="email"
                            onChange={(event) => setEmail(event.target.value)}
                        />
                        <Label className="sr-only" htmlFor="password">
                            Password
                        </Label>
                        <Input
                            className="px-3 py-2 w-full text-gray-700 bg-gray-200 rounded-md focus:bg-white dark:bg-gray-700 dark:text-gray-300 dark:focus:bg-gray-600"
                            id="password"
                            placeholder="Senha"
                            required
                            type="password"
                            onChange={(event) => setPassword(event.target.value)}
                        />
                        <Button
                            className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600"
                            type="submit"
                        >
                            Login
                        </Button>
                    </div>
                </form>
            </div>
        </main>
    )
}

function MountainIcon(props: any) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="m8 3 4 8 5-5 5 15H2L8 3z" />
        </svg>
    )
}
