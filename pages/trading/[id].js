import ProductPreviewModal from "@components/ProductPreviewModal";

// Import the product data

export default function ProductPreview({ product }) {
    

  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <h1 className="text-3xl font-bold">{product.name}</h1>
        <img src={product.imageSrc} alt={product.imageAlt} className="mt-4" />
        <p className="mt-2 text-lg">{product.description}</p>
        <p className="mt-4 text-xl font-semibold">{product.price}</p>
        <button className="mt-4 px-4 py-2 text-white bg-blue-600 hover:bg-blue-700 rounded-md">
        Add to Cart
      </button>
      </div>
    </div>
  );
}
