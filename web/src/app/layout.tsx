import './globals.css'
import { Nunito, Raleway } from 'next/font/google'
import { ServerThemeProvider } from '@wits/next-themes'
import Providers from '@/contexts/Providers'
import React from 'react'

const nunito = Nunito({
	subsets: ['latin'],
	weight: '700',
	variable: '--font-nunito',
})

const raleway = Raleway({
	subsets: ['latin'],
	weight: ['300', '400', '700'],
	variable: '--font-raleway',
})

export const metadata = {
	title: 'Salve! - Os imprevistos não serão mais uma dor de cabeça',
	description:
		'Quando imprevistos ocorrerem, tudo o que você precisa é de um Salve!',
}

export default function RootLayout({
	children,
}: {
	children: React.ReactNode,
}) {
	return (
		<ServerThemeProvider>
			<html lang="pt">
				<head>
					<link rel="icon" type="image/x-icon" href="/images/icon.svg" />
				</head>
				<body
					className={`${nunito.variable} ${raleway.variable} font-sans`}
					suppressHydrationWarning={true}
				>
					<Providers>{children}</Providers>
				</body>
			</html>
		</ServerThemeProvider>
	)
}
