import React from 'react';
import HeaderDrawer from '../Components/Layout/HeaderDrawer';
import Footer from '../Components/Layout/Footer';

const AboutUs = () => {
  return (
    <div className="bg-white text-gray-800 font-sans min-h-screen">
      {/* Navbar */}
      <HeaderDrawer />

      {/* Hero Section */}
      <section className="bg-white py-20">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-4 text-amber-700">A New Era of Wedding Invitations</h2>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto">
            Sandesh isn’t just a website — it’s a celebration of love, tradition, and the magic of Indian weddings. 
            We’re here to help families honor their roots while embracing the ease and elegance of digital technology.
          </p>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-16 bg-amber-50">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h3 className="text-2xl font-semibold mb-4 text-amber-800">Our Story</h3>
            <p className="text-gray-700 mb-4">
              It all started when one of our co-founders struggled to send out wedding cards to relatives across India — from Kashmir to Kanyakumari, and even abroad. 
              Printing, packaging, courier delays — it was chaos. That’s when the idea hit: 
              why not build a platform that lets you customize beautiful wedding invitations online and have them delivered *without the stress*?
            </p>
            <p className="text-gray-700">
              Today, Sandesh empowers families to design elegant, modern, or traditional cards, add personal messages, and even bundle gifts — all with a few clicks.
            </p>
          </div>
          <img
            src="https://bsmedia.business-standard.com/_media/bs/img/article/2024-10/25/full/1729876827-0294.jpg?im=FeatureCrop,size=(826,465)"
            alt="Our Journey"
            className="rounded-lg shadow-md"
          />
        </div>
      </section>

      {/* What We Do Section */}
      <section className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <h3 className="text-2xl font-semibold mb-6 text-amber-800">What We Do</h3>
          <div className="grid md:grid-cols-3 gap-8 text-left">
            <div>
              <h4 className="font-bold mb-2 text-amber-700">Custom Wedding Invitations</h4>
              <p className="text-gray-600">Choose from a wide range of designs — traditional, modern, minimalist, or royal. Add your personal touch with text, photos, and themes.</p>
            </div>
            <div>
              <h4 className="font-bold mb-2 text-amber-700">Doorstep Delivery</h4>
              <p className="text-gray-600">We print, pack, and deliver the invites to your guests anywhere in India or abroad. Sit back and track it all online.</p>
            </div>
            <div>
              <h4 className="font-bold mb-2 text-amber-700">Add-On Gifts</h4>
              <p className="text-gray-600">Want to send a box of sweets, or a personalized gift? We make that easy. Just add it to your order, and we’ll handle the rest.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Promise */}
      <section className="py-16 bg-amber-50">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h3 className="text-2xl font-semibold mb-4 text-amber-800">Our Promise</h3>
          <p className="text-gray-700">
            We believe every wedding deserves to be magical, personal, and stress-free. From grandparents in a village to cousins abroad — we’ll help your invitation reach hearts, not just inboxes.
          </p>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default AboutUs;