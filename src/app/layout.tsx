import './globals.css';
import { JetBrains_Mono } from 'next/font/google';
export const metadata = {
	title: 'Donate App',
	description: 'Donate Now',
};
const jetBrains = JetBrains_Mono({
	weight: ['400', '500', '700'],
	subsets: ['latin'],
});

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="pt-br">
			<body
				className={`bg-zinc-800 text-zinc-50 ${jetBrains.className} 
				subpixel-antialiased`}
			>
				{children}
				<h6 className="mb-0  left-0 bottom-0 m-auto p-2 ">
					@powered by pedro
				</h6>
			</body>
		</html>
	);
}
