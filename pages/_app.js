import supabase from "../utils/supabaseClient";
import { SupabaseProvider } from "context/SupabaseContext";
import { GlobalProvider } from "@components/GlobalProvider";
import Head from "next/head";
import Header from "@components/Header";
import Footer from "@components/Footer";
import { useEffect, useState } from "react";
import "@styles/globals.css";
// import { CartProvider } from "context/CartContext";
// import Cart from "@components/Cart";

export default function App({ Component, pageProps }) {
  // console.log(supabase);
  const [fetchError, setFetchError] = useState(null);
  const [products, setProducts] = useState(null);
  const [photos, setPhotos] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      // fetch products & product-photos
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

  useEffect(() => {
    const fetchPhotos = async () => {
      try {
        const { data, error } = await supabase.storage.from("product-photos").list("", { limit: 100 });

        if (error) {
          throw error;
        }
        // map files to public URLs
        const photoUrls = data.map((file) => supabase.storage.from("product-photos").getPublicUrl(file.name).data.publicUrl);

        setPhotos(photoUrls);
        setFetchError(null);
      } catch (error) {
        setFetchError("An error occurred fetching product photos from the database.");
        setPhotos([]);
        console.log(error);
      }
    };
    fetchPhotos();
  }, []);

  return (
    <div>
      <Head>
        <title>Protec Accessories</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <SupabaseProvider client={supabase}>
        <GlobalProvider>
        <Header />
        <main>
          <Component {...pageProps} products={products} photos={photos}/>
          {fetchError && <p>{fetchError}</p>}
        </main>
        </GlobalProvider>
      </SupabaseProvider>
      <Footer />
    </div>
  );
}
