import { Radio, RadioGroup } from "@headlessui/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useSupabase } from "context/SupabaseContext";
import Link from "next/link";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

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
    };
    fetchProduct();
  }, [id, supabase]);

  if (loading) {
    return <div>Loading product details...</div>;
  }
  if (!product) {
    return <div>Product not found.</div>;
  }

  const addToCart = (id) => {
    const productToAdd = product.id === id;
    setCart([...cart, productToAdd]);
    console.log(`Added product ${id} to cart`);
  };

  return (
    <div className="bg-white">
      <div className="pt-6 mx-auto max-w-2xl flex space-x-2 px-4 sm:px-6 lg:max-w-7xl lg:px-8">
        <Link href="/trading">
          <label className="mr-2 text-sm flex items-center text-emerald-600 hover:text-emerald-800">
            ← Back to Trading Cards
          </label>
        </Link>
      </div>
      <div className="mx-auto mt-6 max-w-2xl sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:gap-x-8 lg:px-8">
        <div className="aspect-h-4 aspect-w-3 hidden overflow-hidden rounded-lg lg:block">
          <img
            alt={product.image_alt}
            src={product.image_src}
            className="h-full w-full object-cover object-center"
          />
        </div>
        {/* <div className="hidden lg:grid lg:grid-cols-1 lg:gap-y-8">
          <div className="aspect-h-2 aspect-w-3 overflow-hidden rounded-lg">
            <img
              alt={product.image_alt[1]}
              src={product.image_src[1]}
              className="h-full w-full object-cover object-center"
            />
          </div>
          <div className="aspect-h-2 aspect-w-3 overflow-hidden rounded-lg">
            <img
              alt={product.image_alt[2]}
              src={product.image_src[2]}
              className="h-full w-full object-cover object-center"
            />
          </div>
        </div>
        <div className="aspect-h-5 aspect-w-4 lg:aspect-h-4 lg:aspect-w-3 sm:overflow-hidden sm:rounded-lg">
          <img
            alt={product.image_alt[3]}
            src={product.image_src[3]}
            className="h-full w-full object-cover object-center"
          />
        </div> */}
      </div>
      {/* PRODUCT INFO */}
      <div className="mx-auto max-w-2xl px-4 pb-16 pt-10 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8 lg:px-8 lg:pb-24 lg:pt-16">
        <div className="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
          <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
            {product.name}
          </h1>
        </div>
        <div className="mt-4 lg:row-span-3 lg:mt-0">
          <p className="text-3xl tracking-tight text-gray-900">
            {product.price}
          </p>
        </div>
      </div>
      {/* OPTONS */}
      <form className="mt-10">
        <div>
          <h3 className="text-sm font-medium text-gray-900">Color/Style</h3>
          <fieldset aria-label="Choose a color" className="mt-4">
            <RadioGroup
              value={selectedColor}
              onChange={setSelectedColor}
              className="flex items-center space-x-3"
            >
              {product.color.map((color) => (
                <Radio
                  key={color.name}
                  value={color}
                  aria-label={color.name}
                  className={classNames(
                    color.selectedClass,
                    "relative -m-0.5 flex cursor-pointer items-center justify-center rounded-full p-0.5 focus:outline-none data-[checked]:ring-2 data-[focus]:data-[checked]:ring data-[focus]:data-[checked]:ring-offset-1"
                  )}
                >
                  <span
                    aria-hidden="true"
                    className={classNames(
                      color.class,
                      "h-8 w-8 rounded-full border border-black border-opacity-10"
                    )}
                  />
                </Radio>
              ))}
            </RadioGroup>
          </fieldset>
        </div>
        <div className="mt-10 flex items-center justify-between">
          <h3 className="text-sm font-medium text-gray-900">Size</h3>
        </div>
        {/* <Link key={product.id}> */}
          <button
            onClick={() => addToCart(product.id)}
            className="mt-10 flex w-full items-center justify-center rounded-md border border-transparent bg-emerald-600 px-8 py-3 text-base font-medium text-white hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
          >
            Add to Cart
          </button>
        {/* </Link> */}
      </form>
      <div className="py-10 lg:col-span-2 lg:col-start-1 lg:border-r lg:border-gray-200 lg:pb-16 lg:pr-8 lg:pt-6">
        <div className="mt-10">
          <h3 className="text-sm font-medium text-gray-900">Product Details</h3>
        </div>
        <ul role="list" className="list-disc space-y-2 pl-4 text-sm">
          {Array.isArray(product.description) ? (
            product.description.map((descriptionItem, index) => (
              <li key={description} className="text-gray-400">
                <span className="text-gray-600">{descriptionItem}</span>
              </li>
            ))
          ) : (
            <li className="text-gray-400">No description available.</li>
          )}
        </ul>
      </div>
    </div>
  );
}
