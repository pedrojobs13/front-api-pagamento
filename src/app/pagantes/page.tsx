import { Input } from '@/components/ui/input';
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import { HandHeart } from '@phosphor-icons/react/dist/ssr';

export default function Pagantes() {
	return (
		<div className="flex flex-col m-auto max-w-xl gap-5 mt-20 mb-20">
			<p className="text-left text-2xl">
				Lista de Pagantes
			</p>
			<div className="flex flex-row gap-2 items-end	">
				<div className="w-full ">
					nome
					<Input className="bg-zinc-800 focus-visible:ring-0" />
				</div>

				<Select name="campanha">
					<SelectTrigger className="w-[180px] bg-zinc-800 focus-visible:ring-0 ">
						<SelectValue placeholder="Selecione" />
					</SelectTrigger>
					<SelectContent>
						<SelectGroup>
							<SelectItem value="camisa">Camisa</SelectItem>
						</SelectGroup>
					</SelectContent>
				</Select>
			</div>
			<div className="flex flex-col gap-3 ">
				<div
					className="
					bg-zinc-700/55 
					flex flex-row
					justify-between 
					p-4 
					border-solid
					border-2
					rounded-md 
					items-center
					border-slate-50/10"
				>
					<div>
						<p>Pedro</p>
						<p className="text-slate-50/55 text-sm">
							R$ 20
						</p>
					</div>
					<div className="flex flex-row gap-1 bg-sky-500/35 py-2 px-4 rounded-3xl items-center">
						<HandHeart size={18} />
						<span className="text-sm">camisa</span>
					</div>
				</div>
			</div>
		</div>
	);
}
