import { Radio, RadioGroup } from "@headlessui/react";
import { StarIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import { useSupabase } from "context/SupabaseContext";
import { CartContext } from "context/CartContext";
import Link from "next/link";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}
export default function ProductPreview() {
  const router = useRouter();
  const { id } = router.query;
  const supabase = useSupabase();
  const SUPABASE_URL = "https://lqgkaiftunbbvlkylfga.supabase.co";

  const [product, setProduct] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (!id) return;

    const fetchProduct = async () => {
      try {
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
        }
      } catch (err) {
        console.log("Unexpected error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
    // console.log(product.image_src);
  }, [id, supabase]);

  if (loading) {
    return <div>Loading product details...</div>;
  }
  if (!product) {
    return <div>Product not found.</div>;
  }

  const { addItemToCart } = useContext(CartContext);

  const addToCartHandler = () => {
    try {
      addItemToCart({
        product: product.id,
        name: product.name,
        price: product.price,
        bundle_size: product.bundle_size,
        image: product.image_src,
        color: product.colorItem,
      });
      setMessage("Item added to cart! 🎉");
    } catch (error) {
      console.error("Error adding item to cart:", error);
      setMessage("Failed to add item to cart. Please try again.");
    }
    setTimeout(() => setMessage(""), 3000);
  };
  return (
    <div className="bg-white py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          {/* Images */}
          <div className="w-full max-w-lg mx-auto lg:max-w-none lg:mx-0">
            <img
              alt={product.image_alt || "Product Image"}
              src={
                product.image_src && product.image_src.startsWith("http")
                  ? product.image_src
                  : `${SUPABASE_URL}/storage/v1/object/public/product-pix/${id}.png`
              }
              className="w-full h-auto rounded-lg shadow-lg"
            />
          </div>
          <div>
            <Link href="/trading">
              <label className="mb-2 text-base font-semibold text-emerald-800 hover:text-emerald-600">
                ← Back to Trading Cards
              </label>
            </Link>
            <h1 className="mt-4 text-4xl font-bold text-gray-900">
              {product.name}
            </h1>
            <p className="mt-4 text-2xl text-gray-500">${product.price}</p>
            <p className="mt-4 text-md text-gray-700">
              {product.internal_size}
            </p>
            {/* Color Options */}
            <div className="mt-6">
              <h3 className="text-sm mb-4 font-medium text-gray-700">Color</h3>
              <RadioGroup
                value={selectedColor}
                onChange={setSelectedColor}
                className="mt-2 flex space-x-4"
              >
                {Array.isArray(product.color) ? (
                  product.color.map((colorItem, index) => (
                    <Radio
                      key={index}
                      value={colorItem}
                      className={classNames(
                        colorItem.selectedClass,
                        "cursor-pointer rounded-full p-0.5"
                      )}
                    >
                      <div className="flex flex-col items-center">
                        <span
                          aria-hidden="true"
                          className={classNames(
                            colorItem.class,
                            "h-8 w-8 rounded-full border border-emerald-600",
                            selectedColor === colorItem &&
                              "border-2 bg-gray-300"
                          )}
                        />
                      </div>
                      <h3 className="mt-1 text-xs text-gray-700">
                        {colorItem}
                      </h3>
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
                  <div
                    key={index}
                    className="mx-auto mb-2 flex items-start space-x-2"
                  >
                    <StarIcon
                      className="h-5 w-5 text-emerald-800 flex-shrink-0"
                      aria-hidden="true"
                    />
                    <p className="text-base mb-2 text-gray-700">
                      {descriptionItem}
                    </p>
                  </div>
                ))
              ) : (
                <p className="text-gray-400">No description available.</p>
              )}
            </div>
            {/* Add to Cart */}
            <button
              onClick={addToCartHandler}
              className="mt-10 flex w-auto items-center justify-center rounded-md bg-emerald-600 px-8 py-3 text-base font-medium text-white hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
            >
              Add to Cart
            </button>
            {message && (
              <p className="mt-4 text-sm font-medium text-gray-700">
                {message}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
