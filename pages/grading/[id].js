import { StarIcon } from "@heroicons/react/20/solid";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useSupabase } from "context/SupabaseContext";
import addToCart from "utils/addToCart";
import Link from "next/link";

export default function ProductPreview() {
  const router = useRouter();
  const { id } = router.query;
  const supabase = useSupabase();

  const [product, setProduct] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    if (!id) return;

    const fetchProduct = async () => {
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .eq("id", id)
        .single();

      if (error) {
        console.error(`Error fetching product ${id}:`, error);
      } else {
        setProduct(data);
        setLoading(false);
      }
      fetchProduct();
    };
  }, [id, supabase]);

  if (loading) {
    return <div>Loading product details...</div>;
  }
  if (!product) {
    return <div>Product not found.</div>;
  }

  return (
    <div className="overflow-hidden bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2">
          <div className="lg:pr-8 lg:pt-4">
            <div className="lg:max-w-lg">
              <Link href="/grading">
                <label className="text-base font-semibold leading-7 text-emerald-800 hover:text-emerald-600">
                  ← Back to Grading Cards
                </label>
              </Link>
              <p className="mt-2 text-pretty text-4xl font-semibold tracking-tight text-gray-900 sm:text-5xl">
                {product.name}
              </p>
              {/* COLOR OPTIONS */}
            </div>
            <dl className="mt-10 max-w-xl space-y-8 text-base leading-7 text-gray-600 lg:max-w-none">
              {Array.isArray(product.description) ? (
                product.description.map((descriptionItem, index) => (
                  <div key={product.description} className="relative pl-9">
                    <dt className="inline font-semibold text-gray-900">
                      <StarIcon
                        aria-hidden="true"
                        className="absolute left-1 top-1 h-5 w-5 text-emerald-800"
                      />
                      {descriptionItem}
                    </dt>
                  </div>
                ))
              ) : (
                <p className="text-gray-400">No description available.</p>
              )}
            </dl>
          </div>
        </div>
        <img
          alt={image_alt}
          src={image_src}
          width={2432}
          height={1442}
          className="w-[48rem] max-w-none rounded-xl shadow-xl ring-1 ring-gray-400/10 sm:w-[57rem] md:-ml-4 lg:-ml-0"
        />
      </div>
      <button
        onClick={() => addToCart(product.id)}
        className="mt-10 flex w-full items-center justify-center rounded-md border border-transparent bg-emerald-600 px-8 py-3 text-base font-medium text-white hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
      >
        Add to Cart
      </button>
    </div>
  );
}
