import Head from "next/head";
import Header from "@components/Header";
import Footer from "@components/Footer";
import '@styles/globals.css'

export default function App({ Component, pageProps }) {
  return (
    <div>
      <Head>
        <title>Protec Accessories</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />
      <main>
        <Component {...pageProps} />
      </main>

      <Footer />
    </div>
  );
}
