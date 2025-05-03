import React, { useState, useEffect } from 'react';
import ProductCard from '../components/ui/ProductCard';
import { products } from '../data/products';

type Category = 'all' | 'men' | 'women' | 'accessories';

const Shop: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<Category>('all');
    const [products, setProducts] = useState<any[]>([]);
  

   const fetchCategoryProducts = async () => {
      try {
        const response = await fetch("https://bot-server-i8jn.onrender.com/fetch-products");
        const data = await response.json();
        const featured = data.products.filter((product: any) => product.featured);
        console.log(featured)
        setProducts(featured);
      } catch (error) {
        console.error("Failed to fetch featured products:", error);
      }
    };
  
    useEffect(() => {
      fetchCategoryProducts();
    }, []);
  const filteredProducts = activeCategory === 'all' 
    ? products 
    : products.filter(product => product.category === activeCategory);

  const categories: { value: Category; label: string }[] = [
    { value: 'all', label: 'All' },
    { value: 'men', label: 'Men' },
    { value: 'women', label: 'Women' },
    { value: 'accessories', label: 'Accessories' }
  ];

  return (
    <div className="pt-20 pb-16">
      <div className="container px-4 mx-auto">
        <h1 className="pt-8 mb-8 text-3xl font-bold text-center">Shop Collection</h1>

        {/* Category Filter */}
        <div className="flex justify-center mb-12">
          <div className="inline-flex flex-wrap justify-center gap-2 border-b border-gray-200 md:gap-8">
            {categories.map(category => (
              <button
                key={category.value}
                className={`px-4 py-2 text-sm md:text-base font-medium transition-colors relative ${
                  activeCategory === category.value
                    ? 'text-black'
                    : 'text-gray-500 hover:text-black'
                }`}
                onClick={() => setActiveCategory(category.value)}
              >
                {category.label}
                {activeCategory === category.value && (
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-black"></span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 md:gap-8">
          {filteredProducts.map(product => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
        
        {filteredProducts.length === 0 && (
          <div className="py-12 text-center text-gray-500">
            No products found in this category.
          </div>
        )}
      </div>
    </div>
  );
};

export default Shop;