import { useState, useEffect } from "react";

const ProductPreviewModal = ({ productId, onClose }) => {
    const [productSelected, setProductSelected] = useState(null);
    
    // fetch product details by id
    useEffect(() => {
        async function fetchProductDetails() {
            try {
                const res = await fetch(`/trading/${productId}`);
                const data = await res.json();
                // sanity check
                console.log(data);
                setProductSelected(data);
            } catch (error) {
                console.error('Error fetching product:', error);
            }
        }
        if (productId) {
            fetchProductDetails();
        }
    }, [productId]);

    if (!productSelected) {
        return (
            <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex justify-center items-center">
        <div className="bg-white rounded-lg p-6 w-96">
          <p>No product found.</p>
        </div>
      </div>
        );
    }

    return (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex justify-center items-center">
        <div className="bg-white rounded-lg p-6 w-96">
          <h3 className="text-lg font-bold">{productSelected.name}</h3>
          <p className="mt-2 text-sm">{productSelected.description}</p>
          <p className="mt-4 text-lg font-medium text-gray-900">
            {productSelected.price}
          </p>
          <button
            className="mt-4 px-4 py-2 text-white bg-blue-600 hover:bg-blue-700 rounded-md"
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </div> 
    );
};

export default ProductPreviewModal;