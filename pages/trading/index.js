// https://tailwindui.com/components/ecommerce/components/product-lists
import Link from "next/link";
import { useEffect, useState } from "react";
import { useSupabase } from "context/SupabaseContext"; 

export default function TradingCards() {
  const supabase = useSupabase();
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);

  console.log(supabase);

  useEffect(() => {
    const fetchTrading = async () => {
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .eq("category", "trading");

      if (error) {
        console.error("Error fetching trading card products:", error);
      } else {
        setProducts(data);
      }
    };
    fetchTrading();
  }, [supabase]);

  const addToCart = (id) => {
    const productToAdd = products.find((product) => product.id === id);
    setCart([...cart, productToAdd]);
    console.log(`Added product ${id} to cart`);
  };
  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900">
          Explore Trading Card Accessories
        </h2>
        {products.length === 0 ? (
          <p className="mt-3">Loading products...</p>
        ) : (
          <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
            {products.map((product) => (
              <Link key={product.id} href={`/trading/${product.id}`}>
                <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
                  <img
                    alt={product.image_alt}
                    src={product.image_src}
                    className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                  />
                </div>
                <div className="flex justify-between">
                  <h3 className="mt-4 justify-start text-sm text-gray-700">
                    {product.name}
                  </h3>
                  <p className="mt-1 text-sm font-medium text-gray-900">
                    ${product.price}
                  </p>
                </div>
                <button
                  className="mt-2 px-4 py-2 text-white bg-emerald-400 hover:bg-emerald-500 rounded-md"
                  onClick={() => addToCart(product.id)}
                >
                  Add to Bag
                </button>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
