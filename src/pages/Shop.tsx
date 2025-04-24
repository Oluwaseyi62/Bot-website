import React, { useState } from 'react';
import ProductCard from '../components/ui/ProductCard';
import { products } from '../data/products';

type Category = 'all' | 'men' | 'women' | 'accessories';

const Shop: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<Category>('all');

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
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-center mb-8 pt-8">Shop Collection</h1>

        {/* Category Filter */}
        <div className="flex justify-center mb-12">
          <div className="inline-flex flex-wrap justify-center border-b border-gray-200 gap-2 md:gap-8">
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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
          {filteredProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
        
        {filteredProducts.length === 0 && (
          <div className="text-center py-12 text-gray-500">
            No products found in this category.
          </div>
        )}
      </div>
    </div>
  );
};

export default Shop;