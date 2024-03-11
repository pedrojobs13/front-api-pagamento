import { NextResponse } from 'next/server';
export const dynamic = 'force-dynamic';
let datasucess = 'pending';

export async function POST(request: Request) {
	try {
		const res = await request.json();
		datasucess = res;
		return NextResponse.json({
			status: 200,
			message: datasucess,
		});
	} catch (error: any) {
		return new Response(`Webhook error: ${error.message}`, {
			status: 400,
		});
	}
}
const cors = require('cors');
const corsOptions = {
	origin: 'http://127.0.0.1:3000',
	methods: ['GET', 'POST'],
	allowedHeaders: ['Content-Type'],
	optionsSuccessStatus: 200,
  };
 

export async function GET() {
	cors(corsOptions)
	return NextResponse.json({
		status: 200,
		message: datasucess,
	});
}
