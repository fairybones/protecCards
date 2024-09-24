import Head from "next/head";
import Header from "@components/Header";
import HomePage from "@components/HomePage";
import Footer from "@components/Footer";

export default function Home() {
  return (
    <div>
      <Head>
        <title>Protec Accessories</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />
      <main>
        <HomePage />
      </main>

      <Footer />
    </div>
  );
}
