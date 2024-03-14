'use client';
import { Button } from '@/components/ui/button';
import { Check } from '@phosphor-icons/react/dist/ssr';
import { useQuery } from '@tanstack/react-query';
import { ReactNode, useState } from 'react';

const getTodos = async (id: number) => {
	return await fetch(
		`${process.env.NEXT_PUBLIC_API_BASE_URL}/pagar/status/${id}`
	).then((res) => res.json());
};
interface Params {
	id: number;
	children: React.ReactNode;
}

export function VerifyPayment({ id, children }: Params) {
	const { isPending, error, data, isError } = useQuery({
		queryKey: ['update'],
		queryFn: () => getTodos(id),
		refetchInterval: 1000 * 20
	});
	if (isPending) {
		return <span>Loading...</span>;
	}
	if (isError) {
		return <span>Error: {error.message}</span>;
	}
	if (data.status == 'pending') {
		return <>{children}</>;
	} else if (data.status == 'approved') {
		return (
			<div className="flex flex-col items-center">
					<Check size={50} />
				pagamento aprovado
			</div>
		);
	} else {
		return (
			<div>há algum erro tente novamente mais tarde</div>
		);
	}
}
