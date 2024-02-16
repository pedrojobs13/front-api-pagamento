'use client';
import { Button } from '@/components/ui/button';
import { useState } from 'react';

export function ButtonCopy({ ticket }: { ticket: string }) {
	const [copyIsOk, setCopyIsOk] = useState(false);
	async function copytoClipboard(ticket: string) {
		try {
			await navigator.clipboard.writeText(ticket);
			setCopyIsOk(!copyIsOk);
		} catch (error) {
			console.log(error);
		}
	}
	return (
		<Button onClick={() => copytoClipboard(ticket)}>
			Copiar código de pagamento
		</Button>
	);
}
