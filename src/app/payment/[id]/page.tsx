import { ButtonCopy } from '@/components/Button_Copy';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
} from '@/components/ui/carousel';
import { parseISO, format } from 'date-fns';
import Qrcode from 'qrcode';
interface ResponseData {
	dataDeExpiracao: string;
	transactionAmount: number;
	pointOfInteraction: {
		transactionData: {
			qrCode: string;
			ticketUrl: string;
		};
	};
	payerPixDTO: {
		firstName: string;
		lastName: string;
	};
}

async function getPayment(
	id: string
): Promise<ResponseData> {
	const respose = await fetch(
		`${process.env.NEXT_PUBLIC_API_BASE_URL}/pagar/${id}`,
		{
			next: {
				revalidate: 60 * 60, // 1 hour
			},
		}
	);

	const payment = await respose.json();

	return payment;
}

export default async function PaymentCard({ params }: any) {
	const pagante = await getPayment(params.id);

	const src = await Qrcode.toDataURL(
		pagante.pointOfInteraction.transactionData.qrCode
	);
	return (
		<div className="flex flex-col m-auto max-w-xl gap-5 mt-20 ">
			<p className="text-center text-2xl">
				Ordem de pagamento
			</p>
			<div className="bg-zinc-100 text-zinc-800 flex flex-col rounded-t-lg text-lg ">
				<div className="flex flex-row justify-around items-center p-6 leading-tight">
					<div>
						<p className="text-center">Valor</p>
						<strong>
							{pagante.transactionAmount.toLocaleString(
								'pt-BR',
								{
									style: 'currency',
									currency: 'BRL',
								}
							)}
						</strong>
					</div>
					<div>
						<p className="text-center">Vencimento</p>
						<time dateTime={pagante.dataDeExpiracao}>
							{format(
								parseISO(pagante.dataDeExpiracao),
								"dd'/'MM'/'yyyy', às ' HH:mm'h'"
							)}
						</time>
					</div>
				</div>
				<hr className="bg-zinc-900 border-dashed border-1" />
				<div className="flex flex-row justify-around items-center p-4 relative">
					<span className="absolute -left-4 -top-3 bg-zinc-800 w-6 h-6 rounded-full" />
					<span className="absolute -left-4 -bottom-3 bg-zinc-800 w-6 h-6 rounded-full" />
					<div>
						<p className="text-center">Pagante</p>
						<strong>
							{pagante.payerPixDTO.firstName}{' '}
						</strong>
						<strong>{pagante.payerPixDTO.lastName}</strong>
					</div>
					<span className="absolute -right-4 -top-3 bg-zinc-800 w-6 h-6 rounded-full" />
					<span className="absolute -right-4 -bottom-3 bg-zinc-800 w-6 h-6 rounded-full" />
				</div>
				<hr className="bg-zinc-900 border-dashed border-1" />
				<div className="flex flex-row justify-around items-center p-6 ">
					<div className="flex flex-col justify-around items-center gap-5">
						<p>QrCode</p>

						<img className="w-56 h-56" src={src} />

						<ButtonCopy
							ticket={
								pagante.pointOfInteraction.transactionData
									.ticketUrl
							}
						/>
					</div>
				</div>
				<hr className="bg-zinc-900 border-dashed border-1" />
				<div className="flex flex-col p-4 gap-5 ">
					<p>Como pagar?</p>
					<Carousel className="w-10/12 m-auto text-base	">
						<CarouselContent>
							<CarouselItem className="text-balance text-center">
								<Badge className="bg-teal-200 text-zinc-950 w-7 h-7">
									1
								</Badge>
								<p>
									Entre no app ou site do seu banco e
									escolha a opção de pagamento via Pix.
								</p>
							</CarouselItem>
							<CarouselItem className="text-balance text-center">
								<Badge className="bg-teal-200 text-zinc-950 w-7 h-7">
									2
								</Badge>
								<p>
									Escaneie o código QR ou copie e cole o
									código de pagamento.
								</p>
							</CarouselItem>
							<CarouselItem className="text-balance text-center ">
								<Badge className="bg-teal-200 text-zinc-950 w-7 h-7">
									3
								</Badge>
								<p>
									Pronto! O pagamento será creditado na hora
									e você receberá um e-mail de confirmação.
								</p>
							</CarouselItem>
						</CarouselContent>
						<div className="xs:block hidden">
							<CarouselPrevious
								className="-left-7 text-zinc-100 bg-zinc-900
 						 hover:bg-zinc-700 hover:text-zinc-100"
							/>
							<CarouselNext
								className="-right-7 text-zinc-100 bg-zinc-900
 						 hover:bg-zinc-700 hover:text-zinc-100"
							/>
						</div>
					</Carousel>
				</div>
			</div>
		</div>
	);
}
