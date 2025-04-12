// src/components/WeddingCardGallery.js
import React, { useState } from 'react';

const WeddingCardGallery = () => {
  // Array of wedding card image URLs (sourced from public images)
  const weddingCards = [
    {
      id: 1,
      src: 'https://img.freepik.com/free-psd/wedding-invitation-card-template_1390-148.jpg',
      alt: 'Elegant Floral Wedding Card',
    },
    {
      id: 2,
      src: 'https://img.freepik.com/free-psd/wedding-invitation-card-template_1390-147.jpg',
      alt: 'Classic White Wedding Invite',
    },
    {
      id: 3,
      src: 'https://www.brides.com/thmb/6K0v-6sBzvzXv3bQbXqYhZ3l9kI=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/wedding-invitation-etiquette-lead-6d3b2b2b2b2b4b4b8b8b8b8b8b8b8b8b.jpg',
      alt: 'Romantic Pink Wedding Card',
    },
    {
      id: 4,
      src: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c',
      alt: 'Vintage Wedding Invitation',
    },
    {
      id: 5,
      src: 'https://img.freepik.com/free-psd/wedding-invitation-card-template_1390-146.jpg',
      alt: 'Gold Foil Wedding Card',
    },
    {
      id: 6,
      src: 'https://www.shutterfly.com/ideas/wp-content/uploads/2021/09/wedding-invitation-ideas-1.jpg',
      alt: 'Modern Minimalist Wedding Card',
    },
    {
      id: 7,
      src: 'https://cdn0.weddingwire.com/img_g/editorial-images/2018/non-trad-wedding-invitations.jpg',
      alt: 'Bohemian Wedding Invite',
    },
    {
      id: 8,
      src: 'https://images.pexels.com/photos/1234567/pexels-photo-1234567.jpeg',
      alt: 'Rustic Kraft Wedding Card',
    },
    {
      id: 9,
      src: 'https://img.freepik.com/free-psd/wedding-invitation-card-template_1390-145.jpg',
      alt: 'Luxury Black Wedding Card',
    },
    {
      id: 10,
      src: 'https://www.minted.com/wedding-ideas/wp-content/uploads/2020/01/wedding-invitation-trends-2020.jpg',
      alt: 'Watercolor Wedding Invite',
    },
  ];

  // State for modal
  const [selectedImage, setSelectedImage] = useState(null);

  // Open modal
  const openModal = (card) => {
    setSelectedImage(card);
  };

  // Close modal
  const closeModal = () => {
    setSelectedImage(null);
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-4xl font-bold text-center text-gray-800 mb-10">
        Wedding Card Gallery
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {weddingCards.map((card) => (
          <div
            key={card.id}
            className="relative overflow-hidden rounded-lg shadow-lg hover:scale-105 transition-transform duration-300"
          >
            <img
              src={card.src}
              alt={card.alt}
              className="w-full h-80 object-cover cursor-pointer"
              onClick={() => openModal(card)}
              onError={(e) => {
                e.target.src = 'https://via.placeholder.com/300x400?text=Image+Not+Found'; // Fallback image
              }}
            />
          </div>
        ))}
      </div>

      {/* Modal for enlarged image */}
      {selectedImage && (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50">
          <div className="relative max-w-4xl w-full">
            <span
              className="absolute top-[-2rem] right-[-2rem] text-4xl text-white cursor-pointer hover:text-gray-300"
              onClick={closeModal}
            >
              ×
            </span>
            <img
              src={selectedImage.src}
              alt={selectedImage.alt}
              className="w-full h-auto rounded-lg"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default WeddingCardGallery;