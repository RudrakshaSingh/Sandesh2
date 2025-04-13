// src/components/WeddingCardGallery.js
import React, { useState } from 'react';
import { weddingCards } from './CardData';

const WeddingCardGallery = () => {

  const [selectedImage, setSelectedImage] = useState(null);


  const openModal = (card) => {
    setSelectedImage(card);
  };


  const closeModal = () => {
    setSelectedImage(null);
  };

  return (
    <div className="max-w-7xl mx-auto p-6 bg-gray-50">
      <h1 className="text-4xl font-bold text-center text-gray-800 mb-2">
        Wedding Card Pick Your Style
      </h1>
      <p className="text-center text-gray-600 mb-10">Elegant designs for your special day</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {weddingCards.map((card) => (
          <div
            key={card.id}
            className="group relative overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-all duration-300 bg-white"
          >
            <div className="aspect-w-3 aspect-h-4 overflow-hidden">
              <img
                src={card.src}
                alt={card.alt}
                className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-500 cursor-pointer"
                onClick={() => openModal(card)}
                onError={(e) => {
                  e.target.src = '/api/placeholder/300/400?text=Image+Not+Found';
                }}
              />
            </div>

            {/* Price tag */}
            <div className="absolute top-4 right-4 bg-white py-1 px-3 rounded-full shadow-md">
              <span className="font-bold text-emerald-600">{card.price}</span>
            </div>

            {/* Hidden overlay with title that appears on hover */}
            <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <h3 className="font-medium text-white text-lg">{card.title}</h3>
            </div>
          </div>
        ))}
      </div>

      {/* Modal for enlarged image */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 p-4"
          onClick={closeModal}
        >
          <div
            className="relative max-w-4xl w-full rounded-xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute top-4 right-4 bg-white rounded-full w-10 h-10 flex items-center justify-center text-2xl font-bold z-10 shadow-lg hover:bg-gray-100 transition-colors"
              onClick={closeModal}
            >
              ×
            </button>

            <div className="bg-white rounded-xl overflow-hidden">
              <div className="relative">
                <img
                  src={selectedImage.src}
                  alt={selectedImage.alt}
                  className="w-full h-auto"
                />
                <div className="absolute top-6 right-6 bg-white py-2 px-4 rounded-full shadow-lg">
                  <span className="font-bold text-lg text-emerald-600">{selectedImage.price}</span>
                </div>
              </div>

              <div className="p-6">
                <h2 className="text-2xl font-bold mb-2">{selectedImage.title}</h2>
                <p className="text-gray-700">{selectedImage.description}</p>

                <div className="mt-6 flex gap-4">
                  <button className="bg-emerald-600 text-white py-2 px-6 rounded-full hover:bg-emerald-700 transition-colors font-medium">
                    Add to Cart
                  </button>
                  <button className="border border-gray-300 py-2 px-6 rounded-full hover:bg-gray-50 transition-colors font-medium">
                    Save for Later
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default WeddingCardGallery;