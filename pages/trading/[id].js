import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useSupabase } from "context/SupabaseContext";
import Link from "next/link";

export default function ProductPreview() {
  const router = useRouter();
  const { id } = router.query;
  const supabase = useSupabase();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    const fetchProduct = async () => {
      const { data, error } = await supabase.from("products").select("*").eq("id", id).single();

      if (error) {
        console.error(`Error fetching product ${id}:`, error);
      } else {
        setProduct(data);
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id, supabase]);

  if (loading) {
    return <div>Loading product details...</div>;
  }
  if (!product) {
    return <div>Product not found.</div>;
  }

  return (
    <div className="bg-white">
    <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
      <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
        <div className="col-span-2">
          <img
            src={product.image_src}
            alt={product.image_alt}
            className="w-full h-full object-cover rounded-md"
          />
        </div>

        <div className="col-span-2">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">
            {product.name}
          </h1>
          <p className="mt-2 text-lg font-medium text-gray-700">
            ${product.price}
          </p>
          <p className="mt-4 text-sm text-gray-500">{product.description}</p>

          <div className="mt-6">
            <button
              className="px-4 py-2 text-white bg-emerald-400 hover:bg-emerald-500 rounded-md"
              onClick={() => addToCart(product.id)}
            >
              Add to Bag
            </button>
          </div>

          <div className="mt-6">
            <Link href="/trading">
              <label className="text-sm text-emerald-600 hover:text-emerald-800">
                ← Back to Trading Cards
              </label>
            </Link>
          </div>
        </div>
      </div>
    </div>
  </div>
  );
}
