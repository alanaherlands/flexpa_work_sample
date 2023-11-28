import '../styles/globals.css';
// import the AppProps type from Next.js
import type { AppProps } from 'next/app';

const App = ({ Component, pageProps }: AppProps) => {
  // render the current page component with its initial props
  return (
    <Component {...pageProps} />
  );
}

export default App;