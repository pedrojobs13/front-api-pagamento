import { HandHeart } from '@phosphor-icons/react/dist/ssr';

export function TextoHeader() {
	return (
		<div className="text-center p-10">
			<div className="flex flex-row gap-2  justify-center	">
				<h3>Faça sua doação</h3>
				<HandHeart size={24} />
			</div>
			<p>
				Coloque seus dados abaixo que criaremos um código
				Pix para o pagamento
			</p>
		</div>
	);
}
