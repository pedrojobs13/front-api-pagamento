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
import { useEffect, useState } from 'react';

interface produtoInterface {
	id: number;
	title: string;
	descricao?: string;
	foto?: string;
}
export function Form({ action }: { action: any }) {
	const [produtos, setProdutos] = useState(
		Array<produtoInterface>
	);

	useEffect(() => {
		fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/produto`)
			.then((res) => res.json())
			.then((produtos: any) => {
				setProdutos(produtos);
			});
	}, []);
	console.log(produtos);
	return (
		<div className="flex flex-col w-3/5 mx-auto	">
			<TextoHeader />
			<div className=" flex flex-col w-full bg-zinc-700 m-2	">
				<form
					className="flex flex-col p-8 space-y-5"
					action={action}
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
						Contribuir
					</Button>
				</form>
			</div>
		</div>
	);
}
