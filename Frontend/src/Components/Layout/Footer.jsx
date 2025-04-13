import React from 'react';
import { Mail, Phone, MapPin, Instagram, Facebook, Twitter, Linkedin } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white pt-12 pb-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand Column */}
          <div className="col-span-1">
            <h3 className="text-xl font-bold text-amber-500 mb-4">Sandesh</h3>
            <p className="text-gray-400 text-sm mb-4">
              Premium digital invitations with authentic Indian cultural elements for all your special occasions.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-amber-500 transition-colors">
                <Facebook size={18} />
              </a>
              <a href="#" className="text-gray-400 hover:text-amber-500 transition-colors">
                <Instagram size={18} />
              </a>
              <a href="#" className="text-gray-400 hover:text-amber-500 transition-colors">
                <Twitter size={18} />
              </a>
              <a href="#" className="text-gray-400 hover:text-amber-500 transition-colors">
                <Linkedin size={18} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="col-span-1">
            <h3 className="text-base font-semibold text-white mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="/" className="text-gray-400 hover:text-amber-500 text-sm transition-colors">Home</a></li>
              <li><a href="/about" className="text-gray-400 hover:text-amber-500 text-sm transition-colors">About Us</a></li>
              <li><a href="/templates" className="text-gray-400 hover:text-amber-500 text-sm transition-colors">Templates</a></li>
              <li><a href="/pricing" className="text-gray-400 hover:text-amber-500 text-sm transition-colors">Pricing</a></li>
              <li><a href="/contact-us" className="text-gray-400 hover:text-amber-500 text-sm transition-colors">Contact</a></li>
            </ul>
          </div>

          {/* Templates */}
          <div className="col-span-1">
            <h3 className="text-base font-semibold text-white mb-4">Templates</h3>
            <ul className="space-y-2">
              <li><a href="/templates/wedding" className="text-gray-400 hover:text-amber-500 text-sm transition-colors">Wedding</a></li>
              <li><a href="/templates/festivals" className="text-gray-400 hover:text-amber-500 text-sm transition-colors">Festivals</a></li>
              <li><a href="/templates/corporate" className="text-gray-400 hover:text-amber-500 text-sm transition-colors">Corporate</a></li>
              <li><a href="/templates/birthdays" className="text-gray-400 hover:text-amber-500 text-sm transition-colors">Birthdays</a></li>
              <li><a href="/templates/religious" className="text-gray-400 hover:text-amber-500 text-sm transition-colors">Religious Events</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div className="col-span-1">
            <h3 className="text-base font-semibold text-white mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <MapPin className="text-amber-500 mr-2 h-5 w-5 mt-0.5 flex-shrink-0" />
                <span className="text-gray-400 text-sm">1234 Digital Avenue, Bangalore, Karnataka, India 560001</span>
              </li>
              <li className="flex items-center">
                <Phone className="text-amber-500 mr-2 h-5 w-5 flex-shrink-0" />
                <span className="text-gray-400 text-sm">+91 98765 43210</span>
              </li>
              <li className="flex items-center">
                <Mail className="text-amber-500 mr-2 h-5 w-5 flex-shrink-0" />
                <span className="text-gray-400 text-sm">support@sandesh.com</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar with Copyright */}
        <div className="pt-6 border-t border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-500 text-sm">
              &copy; {new Date().getFullYear()} Sandesh. All rights reserved.
            </p>
            <div className="mt-4 md:mt-0">
              <ul className="flex space-x-6">
                <li><Link to="privacy-policy" className="text-gray-500 hover:text-amber-500 text-xs transition-colors">Privacy Policy</Link></li>
                <li><a href="/terms-and-conditions" className="text-gray-500 hover:text-amber-500 text-xs transition-colors">Terms of Service</a></li>
                <li><Link to="/cookies" className="text-gray-500 hover:text-amber-500 text-xs transition-colors">Cookie Policy</Link></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;