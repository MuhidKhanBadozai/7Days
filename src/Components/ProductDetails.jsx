import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const API_BASE = "https://putratraders.com/api";

const buildFullImageUrl = (img) => {
  if (!img) return "/placeholder.png";
  return img.startsWith("http") ? img : `${API_BASE.replace("/api", "")}/${img}`;
};

const ProductDetails = () => {
  const { sku } = useParams(); // SKU from URL
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [mainImage, setMainImage] = useState("");
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);

  // Fetch product details by SKU
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const res = await fetch(`${API_BASE}/fetch_product_by_sku.php?sku=${sku}`);
        const data = await res.json();

        if (data && data.sku) {
          setProduct(data);
          setMainImage(buildFullImageUrl(data.image_main || data.image_url));
        } else {
          console.error("Product not found:", data);
          setProduct(null);
        }
      } catch (err) {
        console.error("Error fetching product:", err);
      } finally {
        setLoading(false);
      }
    };

    if (sku) fetchProduct();
  }, [sku]);

  if (loading) {
    return (
      <div className="text-center py-20 text-gray-600 text-lg">Loading product...</div>
    );
  }

  if (!product) {
    return (
      <div className="text-center py-20 text-gray-600 text-lg">
        Product not found.
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto my-16 bg-white shadow-md rounded-lg p-10">
      {/* Breadcrumb */}
      <div className="text-sm text-gray-500 mb-4">
        <button onClick={() => navigate(-1)} className="hover:underline">
          Home
        </button>{" "}
        / {product.name}
      </div>

      {/* Product Section */}
      <div className="flex flex-col md:flex-row gap-10">
        {/* Left: Images */}
        <div className="flex-1">
          <img
            src={mainImage}
            alt={product.name}
            className="w-full max-h-[400px] object-contain border rounded-lg"
          />

          <div className="flex gap-3 mt-4 justify-center flex-wrap">
            {[product.image_1, product.image_2, product.image_3, product.image_4]
              .filter(Boolean)
              .map((img, idx) => (
                <img
                  key={idx}
                  src={buildFullImageUrl(img)}
                  alt={`Thumbnail ${idx}`}
                  onClick={() => setMainImage(buildFullImageUrl(img))}
                  className={`w-20 h-20 object-contain border rounded-md cursor-pointer hover:ring-2 hover:ring-[#0B2347] transition ${
                    mainImage === buildFullImageUrl(img) ? "ring-2 ring-[#0B2347]" : ""
                  }`}
                />
              ))}
          </div>
        </div>

        {/* Right: Details */}
        <div className="flex-1 space-y-4">
          <h1 className="text-2xl font-semibold text-gray-900">{product.name}</h1>
          <p className="text-gray-700 text-sm">SKU: {product.sku}</p>

          <div className="flex items-center gap-2">
            <p className="text-3xl font-bold text-[#0B2347]">${product.price_200_500}</p>
            <span className="text-gray-500 text-sm">(200–500 units)</span>
          </div>

          <div className="border rounded-md p-3 mt-3">
            <p className="text-gray-700 text-sm">Discount tiers:</p>
            <div className="flex flex-col gap-1 mt-2 text-gray-800">
              <span>200–500: ${product.price_200_500} (5% off)</span>
              <span>501+: ${product.price_500plus} (10% off)</span>
            </div>
          </div>

          <div className="mt-5 flex items-center gap-3">
            <label className="text-gray-700 font-medium">Quantity:</label>
            <input
              type="number"
              min="1"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              className="border rounded-md w-20 text-center p-1 focus:ring-1 focus:ring-[#0B2347]"
            />
          </div>

          <button className="bg-orange-500 text-white px-6 py-3 mt-6 rounded-md hover:bg-orange-600 transition">
            Add to Cart
          </button>
        </div>
      </div>

      {/* Tabs Section */}
      <div className="mt-10 border-t pt-6">
        <h2 className="text-lg font-semibold mb-3">Additional Information</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 text-gray-700 text-sm">
          <div><strong>Brand:</strong> {product.brand || "N/A"}</div>
          <div><strong>Item Weight:</strong> {product.item_weight || "N/A"}</div>
          <div><strong>Dimensions:</strong> {product.dimensions || "N/A"}</div>
          <div><strong>Manufacturer Part #:</strong> {product.manufacturer_part || "N/A"}</div>
          <div><strong>OEM Part #:</strong> {product.oem_part || "N/A"}</div>
          <div><strong>Date Available:</strong> {product.date_available || "N/A"}</div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
