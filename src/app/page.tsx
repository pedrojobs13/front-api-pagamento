import { Suspense } from 'react';
import { Form } from '../components/Form';
import { ImageComponent } from '../components/ImageComponent';
import { redirect } from 'next/navigation';
import { Spinner } from '@phosphor-icons/react/dist/ssr';

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
	
	return (
		<main className="flex flex-row gap-5 justify-between">
			<Form/>
			<ImageComponent />
		</main>
	);
}
