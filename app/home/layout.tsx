"use client"

import { Inter } from 'next/font/google'
import { useGlobalContext } from '../context/store'
import { useLayoutEffect } from 'react'
import { useRouter } from 'next/navigation'

const inter = Inter({ subsets: ['latin'] })

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { username, isLogin } = useGlobalContext()
  const router = useRouter()

  useLayoutEffect(() => {
    if (!isLogin) {
      router.replace('/')
    }
  }, [isLogin, router])

  return (
    <div>
      Home Layout
      <h1>Username:{username}</h1>
      {children}
    </div>
  )
}
