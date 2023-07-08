import NavBar from '@/components/Navbar'
import Dashboard from '@/components/home/Dashboard'
import useUser from '@/lib/hooks/useUser'
import { redirect } from 'next/navigation'

export default async function Home() {
	const user = useUser()

	if (!user) redirect('/sign-in')

	if (!user.hasProfile) redirect('/sign-up/profile')

	if (!user.hasAddress) redirect('/sign-up/address')

	return (
		<main className="flex min-h-screen flex-col justify-between bg-main">
			<NavBar />
			<div className="flex w-full flex-1 items-center justify-center px-20 lg:px-0">
				<Dashboard />
			</div>
		</main>
	)
}
