import React from 'react';

const ContactUs = () => {
  return (
    <div className="bg-pink-50 min-h-screen text-gray-800 font-sans">
      {/* Navbar */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-pink-600">Sandesh</h1>
          <nav className="space-x-4">
            <a href="/" className="text-gray-600 hover:text-pink-600">Home</a>
            <a href="/about-us" className="text-gray-600 hover:text-pink-600">About</a>
            <a href="/contact-us" className="text-pink-600 font-semibold">Contact</a>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section className="bg-white py-20">
        <div className="max-w-4xl mx-auto text-center px-6">
          <h2 className="text-4xl font-bold text-pink-700 mb-4">Let’s Talk</h2>
          <p className="text-gray-700">
            Whether you have a question, need support, or want a custom card idea — we're always here to help.
          </p>
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-16">
        <div className="max-w-5xl mx-auto px-6 grid md:grid-cols-2 gap-10">
          {/* Form */}
          <form className="bg-white shadow-md rounded-lg p-8 space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">Full Name</label>
              <input
                type="text"
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-pink-500 focus:border-pink-500"
                placeholder="Your Name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-pink-500 focus:border-pink-500"
                placeholder="you@example.com"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Message</label>
              <textarea
                rows="4"
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-pink-500 focus:border-pink-500"
                placeholder="How can we help you?"
              ></textarea>
            </div>
            <button
              type="submit"
              className="bg-pink-600 hover:bg-pink-700 text-white font-semibold px-6 py-2 rounded-md transition"
            >
              Send Message
            </button>
          </form>

          {/* Contact Info */}
          <div className="flex flex-col justify-center">
            <h3 className="text-2xl font-semibold text-pink-800 mb-4">Contact Info</h3>
            <p className="text-gray-700 mb-4">
              💌 Email: <span className="font-medium">support@Sandesh.in</span>
            </p>
            <p className="text-gray-700 mb-4">
              📞 Phone: <span className="font-medium">+91 98765 43210</span>
            </p>
            <p className="text-gray-700 mb-4">
              📍 Office: 202, Wedding Towers, Andheri East, Mumbai, India
            </p>
            <p className="text-gray-700 italic">
              Our team responds within 24 hours. Your joy is our priority!
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t mt-20">
        <div className="max-w-6xl mx-auto px-6 py-8 flex flex-col md:flex-row justify-between items-center text-center md:text-left">
          <p className="text-gray-500 text-sm mb-2 md:mb-0">&copy; 2025 Sandesh. Crafted with ❤️ for Indian weddings.</p>
          <div className="space-x-4">
            <a href="#" className="text-gray-400 hover:text-gray-600">Privacy</a>
            <a href="#" className="text-gray-400 hover:text-gray-600">Terms</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ContactUs;
