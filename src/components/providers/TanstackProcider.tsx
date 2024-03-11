'use client';

import {
	QueryClient,
	QueryClientProvider,
} from '@tanstack/react-query';
import { useState } from 'react';

export const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			
		}
	}
});