import { Form } from '../components/Form';
import { ImageComponent } from '../components/ImageComponent';
import { redirect } from 'next/navigation';
interface formValue {
	nome: FormDataEntryValue | null;
	sobrenome: FormDataEntryValue | null;
	email: FormDataEntryValue | null;
	produto: {
		id: FormDataEntryValue | null;
	};
	valor: FormDataEntryValue | null;
}
interface responseJson {
	codigo: string;
	nome: string;
	sobrenome: string;
	email: string;
	valor: number;
	produto: {
		id: string;
		title: string;
		descricao: string;
		foto: string;
		valor: number;
	};
}
export default async function Home() {
	async function onSubmit(event: FormData) {
		'use server';
		const value: formValue = {
			nome: event.get('nome'),
			sobrenome: event.get('sobrenome'),
			email: event.get('email'),
			produto: {
				id: event.get('produto'),
			},
			valor: event.get('valor'),
		};

		const res = await fetch(
			`${process.env.NEXT_PUBLIC_API_BASE_URL}/cliente`,
			{
				method: 'POST',
				headers: {
					'Access-Control-Allow-Methods':
						'GET,OPTIONS,PATCH,DELETE,POST,PUT',
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(value),
			}
		);
		if (res.status == 201) {
			const repo = await res.json();
			const sendrepo: responseJson = repo;
			redirect(`/payment/${sendrepo.codigo}`);
		}
	}
	return (
		<main className="flex flex-row gap-5 justify-between">
			<Form action={onSubmit} />
			<ImageComponent />
		</main>
	);
}
