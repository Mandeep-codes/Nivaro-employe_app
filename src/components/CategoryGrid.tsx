import React from 'react';
import { categories } from '../data/mockData';

interface CategoryGridProps {
  onCategorySelect: (categoryId: string) => void;
}

const CategoryGrid: React.FC<CategoryGridProps> = ({ onCategorySelect }) => {
  return (
    <div className="mb-6">
      <h2 className="text-lg font-bold text-gray-900 mb-4">Select a category to report</h2>
      
      <div className="grid grid-cols-3 gap-4">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => onCategorySelect(category.id)}
            className="bg-white p-4 rounded-xl shadow-md flex flex-col items-center space-y-3 transition-all hover:scale-105 hover:shadow-lg active:scale-95"
          >
            <div 
              className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl"
              style={{ backgroundColor: `${category.color}20` }}
            >
              {category.icon}
            </div>
            <span className="text-sm font-medium text-gray-700 text-center leading-tight">
              {category.name}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default CategoryGrid;