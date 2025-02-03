"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useSupabase } from "context/SupabaseContext";

export default function TradingCards() {
  const SUPABASE_URL = "https://lqgkaiftunbbvlkylfga.supabase.co";
  const supabase = useSupabase();
  const [products, setProducts] = useState([]);
  const [sort, setSort] = useState("bundle_size");

  useEffect(() => {
    const fetchTrading = async () => {
      let query = supabase
        .from("products")
        .select("*")
        .eq("category", "trading")
        .eq("is_stocked", true);

      if (sort === "bundle_size") {
        query = query.order("bundle_size", { ascending: true });
      } else if (sort === "price") {
        query = query.order("price", { ascending: true });
      }
      const { data, error } = await query;

      if (error) {
        console.error("Error fetching trading card products:", error);
      } else {
        setProducts(data);
      }
    };
    fetchTrading();
  }, [supabase, sort]);

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900">
          Explore Trading Card Accessories
        </h2>
        <div className="flex justify-end mb-4">
          <label
            htmlFor="sort"
            className="mt-2 mr-2 text-sm font-medium text-gray-700"
          >
            Sort By:
          </label>
          <select
            id="sort"
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="text-sm text-gray-900 rounded-md"
          >
            <option value="price">Price ($ - $$$)</option>
            <option value="bundle_size">Bundle Size</option>
          </select>
        </div>
        {products.length === 0 ? (
          <p className="mt-3">Loading products...</p>
        ) : (
          <div className="mt-6 grid grid-cols-2 gap-x-4 gap-y-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
            {products.map((product) => (
              <Link key={product.id} href={`/trading/${product.id}`}>
                <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
                  <img
                    alt={product.image_alt || "Product Image Unavailable"}
                    src={
                      product.image_src && product.image_src.startsWith("http")
                        ? product.image_src
                        : `${SUPABASE_URL}/storage/v1/object/public/product-pix/${product.id}.png`
                    }
                    className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                  />
                </div>
                <div className="flex justify-between">
                  <h3 className="mt-3 justify-start text-sm text-gray-700">
                    {product.name}
                  </h3>
                  <p className="mt-3 px-4 text-sm font-medium text-gray-900">
                    ${product.price}
                  </p>
                </div>
                <button
                  className="mt-2 px-3 py-2 text-white bg-gray-800 hover:bg-emerald-500 rounded-md"
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
