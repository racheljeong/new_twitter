import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { SWRConfig } from 'swr';

export default function App({ Component, pageProps }: AppProps) {
  return (
    //max-w-xl 
  <SWRConfig value={{fetcher : (url : string) => fetch(url).then((response) => response.json())}}>
    <div className='w-full h-full min-h-screen max-w-3xl m-auto bg-slate-50'>
      <Component {...pageProps}/>
    </div>
  </SWRConfig>
  )
}
