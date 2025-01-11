'use client'; // Use this if you're working with Next.js 13 app directory

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { useState } from 'react';

const ReactQueryProvider = ({ children }: {
    children: React.ReactNode;
}) => {
    const [queryClient] = useState(() => new QueryClient());

    return (
        <QueryClientProvider client={queryClient}>
            {children}

        </QueryClientProvider>
    );
};

export default ReactQueryProvider;
