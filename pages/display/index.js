// https://tailwindui.com/components/ecommerce/components/product-lists
import Link from "next/link";
import { useEffect, useState } from "react";
import { useSupabase } from "context/SupabaseContext";
import addToCart from "utils/addToCart";

export default function GradingCards() {
  const supabase = useSupabase();
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [sort, setSort] = useState("bundle_size");

  useEffect(() => {
    const fetchDisplay = async () => {
      let query = supabase
        .from("products")
        .select("*")
        .eq("category", "display");

      if (sort === "bundle_size") {
        query = query.order("bundle_size", { ascending: true });
      } else if (sort === "price") {
        query = query.order("price", { ascending: true });
      }
      const { data, error } = await query;

      if (error) {
        console.error("Error fetching display card products:", error);
      } else {
        setProducts(data);
      }
    };
    fetchDisplay();
  }, [supabase, sort]);

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900">
          Display Accessories
        </h2>
        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {products.map((product) => (
            <Link key={product.id} href={`/display/${product.id}`}>
              <div className="group relative">
                <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
                  <img
                    alt={product.imageAlt}
                    src={product.imageSrc}
                    className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                  />
                </div>
                <div className="mt-4 flex justify-between">
                  <div>
                    <h3 className="text-sm text-gray-700">
                      <span aria-hidden="true" className="absolute inset-0" />
                      {product.name}
                    </h3>
                    <p className="mt-1 text-sm text-gray-500">
                      {product.price}
                    </p>
                  </div>
                  <button
                    className="mt-2 px-4 py-2 text-white bg-emerald-400  hover:bg-emerald-500 rounded-md"
                    onClick={() => addToCart(product.id)}
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
