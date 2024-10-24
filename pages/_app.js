import supabase from "../utils/supabaseClient";
import { SupabaseProvider } from "context/SupabaseContext";
import Head from "next/head";
import Header from "@components/Header";
import Footer from "@components/Footer";
import { useEffect, useState } from "react";
import "@styles/globals.css";

export default function App({ Component, pageProps }) {
  console.log(supabase);
  const [fetchError, setFetchError] = useState(null);
  const [products, setProducts] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      const { data, error } = await supabase.from("products").select("*");

      if (error) {
        setFetchError("An error occurred fetching products from the database.");
        setProducts(null);
        console.log(error);
      }

      if (data) {
        setProducts(data);
        setFetchError(null);
      }
    };
    fetchProducts();
  }, []);

  return (
    <div>
      <Head>
        <title>Protec Accessories</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <SupabaseProvider client={supabase}>
        <Header />
        <main>
          <Component {...pageProps} />
          {fetchError && <p>{fetchError}</p>}
        </main>
      </SupabaseProvider>
      <Footer />
    </div>
  );
}
