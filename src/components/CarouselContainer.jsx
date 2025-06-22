import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

function CarouselContainer({ children, index, visibleCount, total, onPrev, onNext }) {
  return (
    <div className="relative">
      <div 
        className="flex space-x-6 transition-transform duration-500 ease-in-out"
        style={{ transform: `translateX(-${index * 340}px)` }}
      >
        {children}
      </div>

      <button
        onClick={onPrev}
        disabled={index === 0}
        className="absolute top-1/2 left-[-30px] transform -translate-y-1/2 bg-white dark:bg-gray-800 shadow p-2 rounded-full disabled:opacity-30"
      >
        <ChevronLeft />
      </button>

      <button
        onClick={onNext}
        disabled={index >= total - visibleCount}
        className="absolute top-1/2 right-[-30px] transform -translate-y-1/2 bg-white dark:bg-gray-800 shadow p-2 rounded-full disabled:opacity-30"
      >
        <ChevronRight />
      </button>
    </div>
  );
}

export default CarouselContainer;