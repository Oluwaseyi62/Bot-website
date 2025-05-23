import React, { useState, useEffect } from "react";
import Button from "../components/ui/Button";
import { Upload, Trash2, Loader } from "lucide-react";
import { AddProductFormData } from "../types";

const AdminProducts: React.FC = () => {
  const [showForm, setShowForm] = useState(false);
  const [products, setProducts] = useState<any[]>([]);
  const [filePreview, setFilePreview] = useState<string>("");
  const [imageUploading, setImageUploading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<
    Partial<Record<keyof AddProductFormData, string>>
  >({});
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    image: null,
    category: "",
  });

  const fetchProducts = async () => {
    try {
      const response = await fetch("https://bot-server-i8jn.onrender.com/fetch-products");
      const data = await response.json();
      setProducts(data.products);
    } catch (error) {
      console.error("Failed to fetch products:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleProductDelete = async (productId: string) => {
    try {
      const response = await fetch(
        `https://bot-server-i8jn.onrender.com/del-product/${productId}`,
        { method: "DELETE" }
      );
      const data = await response.json();
      if (response.ok) {
        alert("Product deleted successfully!");
        fetchProducts();
      } else {
        alert(`Error: ${data.message}`);
      }
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    if (file) {
      const validTypes = ["image/jpeg", "image/png", "image/gif"];
      if (!validTypes.includes(file.type)) {
        setErrors((prev) => ({
          ...prev,
          paymentProof: "Please upload an image (JPEG, PNG, GIF).",
        }));
        return;
      }
      const formDataUpload = new FormData();
      formDataUpload.append("file", file);
      formDataUpload.append("upload_preset", "bang-trend");

      try {
        setImageUploading(true);
        const response = await fetch(
          `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME}/upload`,
          {
            method: "POST",
            body: formDataUpload,
          }
        );
        if (!response.ok) throw new Error("Failed to upload file");
        const data = await response.json();
        setFilePreview(data.secure_url);
        setFormData((prev) => ({ ...prev, image: data.secure_url }));
      } catch (error) {
        console.error("Error uploading file:", error);
        setErrors((prev) => ({
          ...prev,
          paymentProof: "Failed to upload file. Please try again.",
        }));
      } finally {
        setImageUploading(false);
      }
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof AddProductFormData, string>> = {};
    if (!formData.name.trim()) newErrors.name = "Product name is required";
    if (!formData.description.trim()) newErrors.description = "Product description is required";
    if (!formData.category.trim()) newErrors.category = "Product Category is required";
    if (!formData.price) newErrors.price = "Product price is required";
    else if (isNaN(Number(formData.price))) newErrors.price = "Product price must be a number";
    if (!formData.image) newErrors.image = "Product Image is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    try {
      setIsSubmitting(true);
      const response = await fetch("https://bot-server-i8jn.onrender.com/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      alert("Product created successfully!");
      setProducts((prev) => [...prev, formData]);
      setFormData({ name: "", description: "", price: "", image: null, category: "" });
      setFilePreview("");
      setShowForm(false);
    } catch (error) {
      console.error("Submit error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="p-6">
      <Button
        variant="outline"
        onClick={() => setShowForm(!showForm)}
        className="flex items-center"
      >
        Add Product
      </Button>

      {showForm && (
        <form onSubmit={handleSubmit} className="mt-4 space-y-4">
          <div>
            <label className="block mb-1 text-sm font-medium">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded"
            />
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded"
            ></textarea>
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium">Price</label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded"
            />
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium">Category</label>
            <input
              type="text"
              name="category"
              value={formData.category}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded"
            />
          </div>

          <div className="mb-8">
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Upload Product Image*
            </label>
            <div className="flex flex-col items-center justify-center px-6 pt-5 pb-6 mt-1 border-2 border-gray-300 border-dashed rounded-md">
              {filePreview ? (
                <div className="w-full text-center">
                  <img src={filePreview} alt="Product Image" className="mx-auto mb-2 max-h-48" />
                  <p className="text-sm text-gray-600">{formData.image ? "Uploaded file" : ""}</p>
                  <button
                    type="button"
                    onClick={() => {
                      setFormData((prev) => ({ ...prev, paymentProof: null }));
                      setFilePreview("");
                    }}
                    className="mt-2 text-sm text-red-600 hover:text-red-800"
                  >
                    Remove
                  </button>
                </div>
              ) : imageUploading ? (
                <Loader className="w-6 h-6 mx-auto text-gray-500 animate-spin" />
              ) : (
                <div className="text-center">
                  <Upload className="w-12 h-12 mx-auto text-gray-400" />
                  <div className="flex mt-2 text-sm text-gray-600">
                    <label
                      htmlFor="file-upload"
                      className="relative font-medium text-black rounded-md cursor-pointer hover:text-gray-700"
                    >
                      <span>Upload a file</span>
                      <input
                        id="file-upload"
                        name="file-upload"
                        type="file"
                        accept="image/*"
                        className="sr-only"
                        onChange={handleFileChange}
                      />
                    </label>
                    <p className="pl-1">or drag and drop</p>
                  </div>
                  <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                </div>
              )}
            </div>
          </div>

          <Button type="submit" fullWidth disabled={!formData.image || isSubmitting}>
            {isSubmitting ? (
              <div className="flex items-center justify-center gap-2">
                <Loader className="w-4 h-4 animate-spin" /> Creating...
              </div>
            ) : (
              "Create Product"
            )}
          </Button>
        </form>
      )}

      <div className="mt-6">
        <h2 className="mb-4 text-xl font-bold">All Products</h2>
        <ul className="space-y-4">
          {products.map((product, index) => (
            <li
              key={index}
              className="p-4 transition-shadow duration-300 bg-white border rounded-lg shadow-md hover:shadow-lg"
            >
              <div className="flex items-center space-x-4">
                {product.image && (
                  <img
                    src={product.image}
                    alt={product.name}
                    className="object-cover w-16 h-16 rounded"
                  />
                )}
                <div>
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-gray-800">
                      {product.name}
                    </h3>
                  </div>
                  <p className="text-sm text-gray-600">{product.description}</p>
                  <p className="mt-2 text-sm font-medium text-gray-700">
                    Price: <span className="text-black">${product.price}</span>
                  </p>
                  <p className="text-sm text-gray-500">Category: {product.category}</p>
                  <button
                    onClick={() => handleProductDelete(product._id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AdminProducts;
