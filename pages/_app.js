import { useState } from 'react';
import { ThirdwebProvider, useAddress } from "@thirdweb-dev/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Navbar from '../components/Navbar';
import { ThemeProvider } from '../components/ThemeProvider';
import '../styles/globals.css';
import { ApolloClient, InMemoryCache,ApolloProvider } from '@apollo/client';

const apolloClient = new ApolloClient({
  uri: 'https://api.studio.thegraph.com/query/90400/food/version/latest',
  cache: new InMemoryCache(),
});

function MyApp({ Component, pageProps }) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <ThirdwebProvider
        clientId={process.env.NEXT_PUBLIC_THIRDWEB_CLIENT_ID}
        queryClient={queryClient}
      >
        <ThemeProvider>
          <ApolloProvider client={apolloClient}>
            <WalletWrapper Component={Component} pageProps={pageProps} />
          </ApolloProvider>
        </ThemeProvider>
      </ThirdwebProvider>
    </QueryClientProvider>
  );
}

function WalletWrapper({ Component, pageProps }) {
  const address = useAddress();

  return (
    <>
      <Navbar isWalletConnected={!!address} />
      <Component {...pageProps} isWalletConnected={!!address} />
    </>
  );
}

export default MyApp;
