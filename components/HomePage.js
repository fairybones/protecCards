"use client"
import Link from "next/link";
// HOME / SHOP BY CATEGORY
const categories = [
  {
    name: "Trading Cards",
    description: "Pokemon, Magic, Sports, & More!",
    imageSrc:
      "https://lqgkaiftunbbvlkylfga.supabase.co/storage/v1/object/public/product-photos/34.png",
    imageAlt: "slabs and sleeves for protecting trading cards",
    href: "/trading",
  },
  {
    name: "Grading",
    description: "Professional supplies for grading cards.",
    imageSrc:
      "https://lqgkaiftunbbvlkylfga.supabase.co/storage/v1/object/public/product-photos/34.png",
    imageAlt: "professional labels and slabs for graded cards",
    href: "/grading",
  },
  {
    name: "Display Cards",
    description: "Card stands and holders for displaying any trading card.",
    imageSrc:
      "https://lqgkaiftunbbvlkylfga.supabase.co/storage/v1/object/public/product-photos/32.png",
    imageAlt: "display trading cards",
    href: "/display",
  },
  {
    name: "Bestsellers",
    description: "Our bestselling products on Amazon & Ebay, now here!",
    imageSrc:
      "https://lqgkaiftunbbvlkylfga.supabase.co/storage/v1/object/public/product-photos/35.png",
    imageAlt: "display collectibles",
    href: "/bestsellers",
  },
];

export default function Home() {
  return (
    <div className="bg-white">
      <div className="flex justify-center">
        <Link key={categories} href={"https://protecaccessories.com/"}>
        <img
          alt={"ProTec Logo"}
          src={
            "https://lqgkaiftunbbvlkylfga.supabase.co/storage/v1/object/public/product-photos/hero.png"
          }
          className="w-full max-w-xs sm:max-w-md md:max-w-lg lg:max-w-screen-lg"
        />
        </Link>
      </div>
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900">
          Shop By Category
        </h2>
        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {categories.map((category) => (
            <div key={category.name} className="group relative">
              <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
                <img
                  alt={category.imageAlt}
                  src={category.imageSrc}
                  className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                />
              </div>
              <div className="mt-4 flex justify-between">
                <div>
                  <h3 className="text-sm text-gray-700">
                    <a href={category.href}>
                      <span aria-hidden="true" className="absolute inset-0" />
                      {category.name}
                    </a>
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">
                    {category.description}
                  </p>
                </div>
                <p className="text-sm font-medium text-gray-900">→</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
