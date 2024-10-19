// https://tailwindui.com/components/ecommerce/components/product-overviews
import { Radio, RadioGroup } from "@headlessui/react";
import { useState } from "react";
import { useSupabase } from "context/SupabaseContext";
import { useRouter } from "next/router";
import { notFound } from "next/navigation";
import Link from "next/link";

export async function getServerSideProps({ params }) {
  const supabase = useSupabase();
  const { id } = params;

  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    console.log(
      "An error occurred while trying to fetch product details",
      error
    );
    return { notFound: true };
  }
  return {
    props: {
      product: data,
    },
  };
}
function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function ProductPage({ product }) {
  const router = useRouter();
  const { id } = router.query;

  const [cart, setCart] = useState([]);
  const [selectedColor, setSelectedColor] = useState(product.color[0]);

  if (router.isFallback) {
    return <div>Loading product details...</div>;
  }

  return (
    <div className="bg-white">
      <div className="pt-6">
        <h1 className="text-sm">{product.name}</h1>
      </div>
      <div className="mx-auto mt-6 max-w-2xl sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:gap-x-8 lg:px-8">
        <Link key={product.category} href={"/trading"}>
          <h3>{product.category}</h3>
        </Link>
        <div className="aspect-h-4 aspect-w-3 hidden overflow-hidden rounded-lg lg:block">
          {product.map((product) => (
            <div className="lg:grid lg:grid-cols-1 lg:gap-y-8">
              <div className="aspect-h-2 aspect-w-3 overflow-hidden rounded-lg">
                <img
                  alt={product.image_alt}
                  src={product.image_src}
                  className="h-full w-full object-cover object-center"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="mx-auto max-w-2xl px-4 pb-16 pt-10 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8 lg:px-8 lg:pb-24 lg:pt-16">
        <div className="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
          <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
            {product.name}
          </h1>
        </div>
        <div className="mt-4 lg:row-span-3 lg:mt-0">
          <h2 className="sr-only">Product Details</h2>
          <p className="text-3xl tracking-tight text-gray-900">
            {product.price}
          </p>
        </div>
        <form className="mt-10">
          <div>
            <h3 className="text-sm font-medium text-gray-900">Color</h3>
            <fieldset aria-label="Choose a style" className="mt-4">
              <RadioGroup
                value={selectedColor}
                onChange={setSelectedColor}
                className="flex items-center space-x-3"
              >
                {product.colors.map((color) => (
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
        </form>
        <button
          className="mt-2 px-4 py-2 text-white bg-emerald-400 hover:bg-emerald-500 rounded-md"
          onClick={() => addToCart(product.id)}
        >
          Add to Cart
        </button>
        <div className="py-10 lg:col-span-2 lg:col-start-1 lg:border-r lg:border-gray-200 lg:pb-16 lg:pr-8 lg:pt-6">
          <div className="mt-10">
            <h3 className="text-sm font-medium text-gray-900">Highlights</h3>
            <div className="mt-4">
              <ul role="list" className="list-disc space-y-2 pl-4 text-sm">
                {product.description.map((description) => (
                  <li key={product.id} className="text-gray-400">
                    <span className="text-gray-600">{description}</span>
                  </li>
                ))}
              </ul>
            </div>
            <h3 className="text-sm font-medium text-gray-900">
              Product Details
            </h3>
            <div className="mt-4">
              <ul role="list" className="list-disc space-y-2 pl-4 text-sm">
                <li className="mt-2 text-sm text-gray-900">
                  <strong>Quantity: </strong>
                  {product.bundle_size}
                </li>
                <li className="mt-2 text-sm text-gray-900">
                  <strong>Internal Size: </strong>
                  {product.internal_size}
                </li>
                <li className="mt-2 text-sm text-gray-900">
                  <strong>In Stock: </strong>
                  {product.is_stocked}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
