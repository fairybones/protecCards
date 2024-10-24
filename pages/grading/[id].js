import { StarIcon } from "@heroicons/react/20/solid";
import { useEffect, useState, useContext } from "react";
import { useRouter } from "next/router";
import { useSupabase } from "context/SupabaseContext";
import { Radio, RadioGroup } from "@headlessui/react";
import { CartContext } from "context/CartContext";
import addToCart from "utils/addToCart";
import Link from "next/link";

// tailwind helper function
function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}
export default function ProductPreview() {
  const router = useRouter();
  const { id } = router.query;
  const supabase = useSupabase();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedColor, setSelectedColor] = useState(null);

  const { cartItems, dispatch } = useContext(CartContext);

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
        setSelectedColor(data.color[0]);
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
    <div className="bg-white py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          {/* Product Image on left */}
          <div className="w-full max-w-lg mx-auto lg:max-w-none lg:mx-0">
            <img
              alt={product.image_alt}
              src={product.image_src}
              className="w-full h-auto rounded-lg shadow-lg"
            />
          </div>

          <div>
            <Link href="/grading">
              <label className="mb-2 text-base font-semibold text-emerald-800 hover:text-emerald-600">
                ← Back to Grading Cards
              </label>
            </Link>
            {/* Product Details on right */}
            <h1 className="mt-4 text-4xl font-bold text-gray-900">
              {product.name}
            </h1>
            <p className="mt-4 text-xl text-gray-500">${product.price}</p>
            {/* Color Options */}
            <div className="mt-6">
              <h3 className="text-sm mb-2 font-medium text-gray-700">Color Options</h3>
              <RadioGroup
                value={selectedColor}
                onChange={setSelectedColor}
                className="mt-2 flex space-x-4"
              >
                {Array.isArray(product.color) ? (
                  product.color.map((colorItem, index) => (
                    <Radio
                      key={index}
                      className={classNames(
                        colorItem.selectedClass,
                        "cursor-pointer rounded-full p-0.5 focus:outline-red"
                      )}
                    >
                      <div className="flex flex-col items-center">
                        <span
                          aria-hidden="true"
                          className={classNames(
                            colorItem.class,
                            "h-8 w-8 rounded-full border border-gray-300"
                          )}
                        />
                        <span className="mt-1 text-xs text-gray-500">
                          {colorItem}
                        </span>
                      </div>
                    </Radio>
                  ))
                ) : (
                  <p className="text-gray-400">* 1 available option *</p>
                )}
              </RadioGroup>
            </div>
            {/* Product Description */}
            <div className="mt-6">
              {Array.isArray(product.description) ? (
                product.description.map((descriptionItem, index) => (
                  <div key={index} className="mx-auto mb-2 flex items-start space-x-2">
                    <StarIcon
                      className="h-5 w-5 text-emerald-800 flex-shrink-0"
                      aria-hidden="true"
                    />
                    <p className="text-base mb-2 text-gray-700">{descriptionItem}</p>
                  </div>
                ))
              ) : (
                <p className="text-gray-400">No description available.</p>
              )}
            </div>
            {/* Add to Cart */}
            <button
              onClick={() => addToCart(product, cartItems, dispatch)}
              className="mt-8 flex w-auto items-center justify-center rounded-md bg-emerald-600 px-6 py-2 text-sm font-medium text-white hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
