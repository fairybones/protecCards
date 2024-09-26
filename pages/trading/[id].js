import { useRouter } from "next/router";
// import product data

const products = [
    {
      id: "1",
      name: "Product 1",
      imageSrc: "https://placehold.co/400",
      imageAlt: "slabs for protecting trading cards",
      description: "Product Description",
      sizes: "1",
      price: "$",
      href: "/trading/1",
    },
];

export default function ProductPreview() {
    const router = useRouter();
    const { id } = router.query;

    // find the product based on the ID from URL
    const product = products.find((p) => p.id === id);

    if (!product) {
        return <div>Redirect to error page</div>
    }

    return (
        <div></div>
    )
}