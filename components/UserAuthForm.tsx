'use client'

import { Button } from '@/components/ui/button'
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage
} from '@/components/ui/form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { useLayoutEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import * as z from 'zod'

import { useGlobalContext } from '@/app/context/store'
import { Input } from './ui/input'
import Icons from './Icons'
import { SIGNIN } from '@/app/constants'

const formSchema = z.object({
	username: z.string().trim().min(1, {
		message: 'Username must be at least 5 characters',
	}),
	password: z.string().trim().min(1, {
		message: 'Username must be at least 8 characters',
	}),
})

const UserAuthForm = () => {
	const [isLoading, setIsLoading] = useState(false)
	const { username, isLogin, setUsername, setIsLogin } = useGlobalContext()
	const router = useRouter()

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			username: '',
			password: '',
		},
	})
	function onSubmit(values: z.infer<typeof formSchema>) {
		setIsLoading(true)
		setTimeout(() => {
			setUsername(values.username)
			setIsLogin(true)
			router.push('/home')
		}, 1000)
	}

	useLayoutEffect(() => {
		if (isLogin) {
			router.push('/home')
		}
	}, [isLogin, router])



	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
				<FormField
					control={form.control}
					name='username'
					render={({ field }) => (
						<FormItem>
							<FormControl>
								<Input placeholder='Username' {...field} disabled={isLoading} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name='password'
					render={({ field }) => (
						<FormItem>
							<FormControl>
								<Input
									type='password'
									placeholder='Password'
									{...field}
									disabled={isLoading}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<Button className='w-full' type='submit' disabled={isLoading}>	
				{isLoading && (
					<Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
				)}
					{SIGNIN}
				</Button>
			</form>
		</Form>
	)
}

export default UserAuthForm
