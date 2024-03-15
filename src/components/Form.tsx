'use client';
import { Input } from '@/components/ui/input';
import {
	Envelope,
	Money,
	User,
} from '@phosphor-icons/react/dist/ssr';
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { TextoHeader } from './TextoHeader';
import { FormEvent, useEffect, useState } from 'react';
import { useFormStatus } from 'react-dom';
import { redirect, useRouter } from 'next/navigation';

interface produtoInterface {
	id: number;
	title: string;
	descricao?: string;
	foto?: string;
}
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
export function Form() {
	const status = useFormStatus();
	const { push } = useRouter();
	const [produtos, setProdutos] = useState(
		Array<produtoInterface>
	);
	const [loading, setLoading] = useState(false);
	const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/produto`;
	useEffect(() => {
		fetch(url)
			.then((res) => res.json())
			.then((produtos: any) => {
				setProdutos(produtos);
			});
	}, []);
	async function formHandler(
		event: FormEvent<HTMLFormElement>
	) {
		event.preventDefault();
		setLoading(true);

		const formData = new FormData(event.currentTarget);

		const value: formValue = {
			nome: formData.get('nome'),
			sobrenome: formData.get('sobrenome'),
			email: formData.get('email'),
			produto: {
				id: formData.get('produto'),
			},
			valor: formData.get('valor'),
		};
		

		  await fetch(
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
		 ).then((res) => res.json())
		 	.then((repo: any) => {
		 		const sendrepo: responseJson = repo;
		 		push(`/payment/${sendrepo.codigo}`);
		 	});
			 //setLoading(false);
	}

	return (
		<div className="flex flex-col w-3/5 mx-auto	">
			<TextoHeader />

			<div className=" flex flex-col w-full bg-zinc-700 m-2	">
				<form
					className="flex flex-col p-8 space-y-5"
					onSubmit={formHandler}
				>
					<div className="flex flex-col">
						<label htmlFor="nome">Nome</label>
						<div>
							<User
								size={32}
								className="absolute py-1 m-1"
							/>
							<Input
								type="text"
								id="nome"
								name="nome"
								required
								className=" 
								bg-zinc-800 
								border-0 
								outline-none 
								border-hidden	
								px-10"
							/>
						</div>
					</div>
					<div className="flex flex-col">
						<label htmlFor="sobrenome">Sobrenome</label>
						<div>
							<User
								size={32}
								className="absolute py-1 m-1"
							/>
							<Input
								type="text"
								id="sobrenome"
								name="sobrenome"
								required
								className=" 
								bg-zinc-800 
								border-0 
								outline-none 
								border-hidden	
								px-10"
							/>
						</div>
					</div>

					<div className="flex flex-col">
						<label htmlFor="foto">E-mail</label>
						<div>
							<Envelope
								size={32}
								className="absolute py-1 m-1"
							/>
							<Input
								type="email"
								id="email"
								name="email"
								required
								className=" 
								bg-zinc-800 
								border-0 
								outline-none 
								border-hidden 
								px-10"
							/>
						</div>
					</div>
					<div className="flex flex-col">
						<label htmlFor="produto">
							Escolha a campanha
						</label>

						<Select name="produto">
							<SelectTrigger className="w-[180px]  bg-zinc-800">
								<SelectValue placeholder="Campanha" />
							</SelectTrigger>
							<SelectContent>
								<SelectGroup>
									{produtos.map((prod) => {
										return (
											<SelectItem
												value={JSON.stringify(prod.id)}
												key={prod.id}
											>
												{prod.title}
											</SelectItem>
										);
									})}
								</SelectGroup>
							</SelectContent>
						</Select>
					</div>
					<div className="flex flex-col">
						<label htmlFor="contribuicao">
							Valor da contribuição
						</label>
						<div className="max-w-44">
							<Money
								size={32}
								className="absolute py-1 m-1 "
							/>
							<Input
								id="valor"
								type="number"
								name="valor"
								min={5}
								required
								className="[-moz-appearance:_textfield] [&::-webkit-inner-spin-button]:m-0 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:m-0 [&::-webkit-outer-spin-button]:appearance-none bg-zinc-800 border-0 outline-none border-hidden	pl-10 "
							/>
						</div>
					</div>
					<Button type="submit" className="bg-cyan-500">
						{loading ? 'carregando...' : 'Contribuir'}
					</Button>
				</form>
			</div>
		</div>
	);
}
