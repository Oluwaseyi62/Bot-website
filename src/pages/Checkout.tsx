import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import Button from "../components/ui/Button";
import { CheckoutFormData, Order } from "../types";
import { Upload, Check } from "lucide-react";

const Checkout: React.FC = () => {
  const { items, totalAmount, delCart } = useCart();
  const navigate = useNavigate();
  const [errors, setErrors] = useState<
    Partial<Record<keyof CheckoutFormData, string>>
  >({});
  const [filePreview, setFilePreview] = useState<string>("");
  const [formData, setFormData] = useState<CheckoutFormData>({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    deliveryOption: "delivery",
    paymentProof: null,
    productId: "",
    orderId: `ORD-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`,
    sessionId:
      localStorage.getItem("sessionId") ||
      `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
  });

  if (items.length === 0) {
    navigate("/cart");
    return null;
  }

  const bankDetails = {
    bankName: "Fashion Bank",
    accountName: "BANG ON TREND LTD",
    accountNumber: "1234-5678-9012-3456",
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error when field is edited
    if (errors[name as keyof CheckoutFormData]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleDeliveryOptionChange = (option: "pickup" | "delivery") => {
    setFormData((prev) => ({ ...prev, deliveryOption: option }));
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;

    if (file) {
      // Validate file type
      const validTypes = [
        "image/jpeg",
        "image/png",
        "image/gif",
        "application/pdf",
      ];
      if (!validTypes.includes(file.type)) {
        setErrors((prev) => ({
          ...prev,
          paymentProof: "Please upload an image (JPEG, PNG, GIF) or PDF file.",
        }));
        return;
      }

      // Clear error
      setErrors((prev) => ({ ...prev, paymentProof: "" }));

      // Upload to Cloudinary
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "bang-trend"); // Replace with your Cloudinary upload preset

      try {
        const response = await fetch(
          `https://api.cloudinary.com/v1_1/${
            import.meta.env.VITE_CLOUDINARY_CLOUD_NAME
          }/upload`,
          {
            method: "POST",
            body: formData,
          }
        );

        if (!response.ok) {
          throw new Error("Failed to upload file");
        }

        const data = await response.json();
       

        // Set file preview for images
        if (file.type.startsWith("image/")) {
          setFilePreview(data.secure_url);
        } else {
          setFilePreview("");
        }

        setFormData((prev) => ({ ...prev, paymentProof: data.secure_url }));
      } catch (error) {
        console.error("Error uploading file:", error);
        setErrors((prev) => ({
          ...prev,
          paymentProof: "Failed to upload file. Please try again.",
        }));
      }
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof CheckoutFormData, string>> = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = "Full name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    }

    if (formData.deliveryOption === "delivery" && !formData.address?.trim()) {
      newErrors.address = "Address is required for delivery";
    }

    if (!formData.paymentProof) {
      newErrors.paymentProof = "Payment proof is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      const response = await fetch("https://bot-server-i8jn.onrender.com/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...formData, totalAmount }),
      });
     
      const data = await response.json();
      

      // Create order object
      const order: Order = {
        _id: formData.orderId!,
        fullName: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        address:
          formData.deliveryOption === "delivery" ? formData.address : undefined,
        deliveryOption: formData.deliveryOption,
        items: [...items],
        totalAmount,
        paymentProof: formData.paymentProof || "",
        orderDate: new Date().toISOString(),
        productId: formData.productId,
        sessionId: formData.sessionId,
        
      };
      delCart();

      // Save order to localStorage
      const existingOrders = JSON.parse(localStorage.getItem("orders") || "[]");
      localStorage.setItem(
        "orders",
        JSON.stringify([...existingOrders, order])
      );

      // Clear cart
      delCart();

      // Navigate to confirmation page
      navigate("/order-confirmation", { state: { order } });
    } catch (error) {
      console.error("Error submitting order:", error);
    }
  };

  console.log( import.meta.env.VITE_CLOUDINARY_CLOUD_NAME)
  return (
    <div className="pt-20 pb-16">
      <div className="container px-4 mx-auto">
        <h1 className="pt-8 mb-8 text-3xl font-bold">Checkout</h1>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* Checkout Form */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="p-6 bg-white rounded-lg">
              <h2 className="mb-6 text-xl font-bold">Customer Information</h2>

              <div className="mb-8 space-y-4">
                <div>
                  <label
                    htmlFor="fullName"
                    className="block mb-1 text-sm font-medium text-gray-700"
                  >
                    Full Name*
                  </label>
                  <input
                    type="text"
                    id="fullName"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    className={`w-full border ${
                      errors.fullName ? "border-red-500" : "border-gray-300"
                    } rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-black`}
                  />
                  {errors.fullName && (
                    <p className="mt-1 text-sm text-red-500">
                      {errors.fullName}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block mb-1 text-sm font-medium text-gray-700"
                  >
                    Email Address*
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className={`w-full border ${
                      errors.email ? "border-red-500" : "border-gray-300"
                    } rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-black`}
                  />
                  {errors.email && (
                    <p className="mt-1 text-sm text-red-500">{errors.email}</p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="phone"
                    className="block mb-1 text-sm font-medium text-gray-700"
                  >
                    Phone Number*
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className={`w-full border ${
                      errors.phone ? "border-red-500" : "border-gray-300"
                    } rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-black`}
                  />
                  {errors.phone && (
                    <p className="mt-1 text-sm text-red-500">{errors.phone}</p>
                  )}
                </div>
              </div>

              <h2 className="mb-6 text-xl font-bold">Delivery Options</h2>

              <div className="mb-8 space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="flex items-center h-5">
                    <input
                      id="delivery"
                      type="radio"
                      checked={formData.deliveryOption === "delivery"}
                      onChange={() => handleDeliveryOptionChange("delivery")}
                      className="w-4 h-4 text-black border-gray-300 focus:ring-0"
                    />
                  </div>
                  <div className="flex flex-col">
                    <label
                      htmlFor="delivery"
                      className="font-medium text-gray-900"
                    >
                      I want doorstep delivery
                    </label>
                    <p className="text-sm text-gray-500">
                      We'll deliver your order to your address
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="flex items-center h-5">
                    <input
                      id="pickup"
                      type="radio"
                      checked={formData.deliveryOption === "pickup"}
                      onChange={() => handleDeliveryOptionChange("pickup")}
                      className="w-4 h-4 text-black border-gray-300 focus:ring-0"
                    />
                  </div>
                  <div className="flex flex-col">
                    <label
                      htmlFor="pickup"
                      className="font-medium text-gray-900"
                    >
                      I will pick up my order
                    </label>
                    <p className="text-sm text-gray-500">
                      Pick up your order at our store location
                    </p>
                  </div>
                </div>

                {formData.deliveryOption === "delivery" && (
                  <div className="mt-4">
                    <label
                      htmlFor="address"
                      className="block mb-1 text-sm font-medium text-gray-700"
                    >
                      Delivery Address*
                    </label>
                    <textarea
                      id="address"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      rows={3}
                      className={`w-full border ${
                        errors.address ? "border-red-500" : "border-gray-300"
                      } rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-black`}
                    ></textarea>
                    {errors.address && (
                      <p className="mt-1 text-sm text-red-500">
                        {errors.address}
                      </p>
                    )}
                  </div>
                )}
              </div>

              <h2 className="mb-6 text-xl font-bold">Payment Information</h2>

              <div className="p-4 mb-6 rounded-md bg-gray-50">
                <h3 className="mb-2 font-semibold">Bank Transfer Details</h3>
                <p className="mb-1">
                  <span className="font-medium">Bank:</span>{" "}
                  {bankDetails.bankName}
                </p>
                <p className="mb-1">
                  <span className="font-medium">Account Name:</span>{" "}
                  {bankDetails.accountName}
                </p>
                <p>
                  <span className="font-medium">Account Number:</span>{" "}
                  {bankDetails.accountNumber}
                </p>
              </div>

              <div className="mb-8">
                <p className="mb-4 text-sm text-gray-700">
                  Please transfer the total amount to the bank account details
                  provided above. After making the payment, upload a screenshot
                  or PDF of your payment confirmation below.
                </p>

                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">
                    Upload Payment Proof*
                  </label>

                  <div className="flex flex-col items-center justify-center px-6 pt-5 pb-6 mt-1 border-2 border-gray-300 border-dashed rounded-md">
                    {filePreview ? (
                      <div className="w-full text-center">
                        <img
                          src={filePreview}
                          alt="Payment proof"
                          className="mx-auto mb-2 max-h-48"
                        />
                        <p className="text-sm text-gray-600">
                          {formData.paymentProof ? "Uploaded file" : ""}
                        </p>
                        <button
                          type="button"
                          onClick={() => {
                            setFormData((prev) => ({
                              ...prev,
                              paymentProof: null,
                            }));
                            setFilePreview("");
                          }}
                          className="mt-2 text-sm text-red-600 hover:text-red-800"
                        >
                          Remove
                        </button>
                      </div>
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
                              accept="image/*,application/pdf"
                              className="sr-only"
                              onChange={handleFileChange}
                            />
                          </label>
                          <p className="pl-1">or drag and drop</p>
                        </div>
                        <p className="text-xs text-gray-500">
                          PNG, JPG, GIF up to 10MB, or PDF
                        </p>
                      </div>
                    )}
                  </div>

                  {errors.paymentProof && (
                    <p className="mt-1 text-sm text-red-500">
                      {errors.paymentProof}
                    </p>
                  )}
                </div>
              </div>

              <Button type="submit" fullWidth disabled={!formData.paymentProof}>
                Submit Order
              </Button>
            </form>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="sticky p-6 rounded-lg bg-gray-50 top-24">
              <h2 className="mb-4 text-xl font-bold">Order Summary</h2>

              <div className="mb-6 space-y-4">
                {items.map((item) => (
                  <div key={item.productId._id} className="flex gap-4">
                    <img
                      src={item.productId.image}
                      alt={item.productId.name}
                      className="object-cover w-16 h-16 rounded"
                    />
                    <div>
                      <h3 className="font-medium">{item.productId.name}</h3>
                      <p className="text-sm text-gray-600">
                        Qty: {item.quantity}
                      </p>
                      <p className="text-gray-800">
                        ${(item.productId.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="pt-4 mb-6 border-t border-gray-200">
                <div className="flex justify-between mb-2">
                  <span className="text-gray-600">Subtotal</span>
                  <span>${totalAmount.toFixed(2)}</span>
                </div>
                <div className="flex justify-between mb-2">
                  <span className="text-gray-600">Shipping</span>
                  <span>
                    {formData.deliveryOption === "delivery" ? "$5.00" : "Free"}
                  </span>
                </div>
                <div className="flex justify-between pt-2 mt-2 text-lg font-semibold border-t border-gray-200">
                  <span>Total</span>
                  <span>
                    $
                    {formData.deliveryOption === "delivery"
                      ? (totalAmount + 5).toFixed(2)
                      : totalAmount.toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
