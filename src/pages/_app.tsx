import '../../styles/globals.css';
import { AppProps } from 'next/app';
import { Header } from '../components/header';

import { SessionProvider } from "next-auth/react"

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <SessionProvider session={pageProps.session}>
        <Header/>
        <Component {...pageProps} />
      </SessionProvider>

    </>
);
}
