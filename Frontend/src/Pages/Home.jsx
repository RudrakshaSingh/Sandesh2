import React from 'react';
import { ChevronRight, PenTool, Video, Mail, Globe, ArrowRight } from 'lucide-react';
import Layout from '../Components/Layout/Layout';

const Home = () => {
  const features = [
    {
      icon: <PenTool className="w-8 h-8 text-amber-600" />,
      title: "Customizable Templates",
      description: "Premium templates tailored for Indian celebrations, fully customizable to your event's needs."
    },
    {
      icon: <Mail className="w-8 h-8 text-amber-600" />,
      title: "Eco-Friendly Digital Delivery",
      description: "Go green while keeping it classy — send elegant digital invitations effortlessly."
    },
    {
      icon: <Video className="w-8 h-8 text-amber-600" />,
      title: "Rich Media Integration",
      description: "Embed videos, photos, and regional typography for immersive invites."
    },
    {
      icon: <Globe className="w-8 h-8 text-amber-600" />,
      title: "Multilingual Support",
      description: "Craft invitations in your guests' native languages with ease."
    },
    {
      icon: <ChevronRight className="w-8 h-8 text-amber-600" />,
      title: "Real-Time RSVP Tracking",
      description: "Monitor responses instantly and manage your guest list effortlessly."
    },
    {
      icon: <ArrowRight className="w-8 h-8 text-amber-600" />,
      title: "Seamless Sharing Options",
      description: "Distribute via WhatsApp, email, or generate quick share links."
    }
  ];

  const steps = [
    {
      number: "01",
      title: "Select Your Template",
      description: "Browse our vibrant and culturally rich designs for any Indian celebration."
    },
    {
      number: "02",
      title: "Personalize Your Details",
      description: "Add your event details, media, and choose from regional fonts and languages."
    },
    {
      number: "03",
      title: "Send & Track",
      description: "Distribute your invites and track RSVPs in real-time with built-in analytics."
    }
  ];

  const testimonials = [
    {
      name: "Priya Sharma",
      role: "Wedding Planner, Delhi",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&auto=format&fit=crop",
      quote: "Sandesh has transformed how we coordinate wedding invitations for our clients. The professional templates and ease of customization are unmatched."
    },
    {
      name: "Rajesh Patel",
      role: "Corporate Events Manager",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop",
      quote: "We rely on Sandesh for all our corporate Diwali and cultural event invitations. The analytics and RSVP tracking have streamlined our planning process."
    },
    {
      name: "Ananya Desai",
      role: "Cultural Program Director",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=200&auto=format&fit=crop",
      quote: "The multilingual support and traditional design elements in Sandesh perfectly capture the essence of our classical dance performances and cultural events."
    }
  ];

  return (
    <Layout>
      <section className="relative bg-gradient-to-r from-gray-50 to-amber-50 py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
                Celebrate With <span className="text-amber-600">Elegance & Ease</span>
              </h1>
              <p className="mt-6 text-lg text-gray-700 max-w-xl">
                Sandesh brings modern tech and cultural grace together to help you send stunning digital invites across India.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row gap-4">
                <button className="bg-amber-600 hover:bg-amber-700 text-white px-6 py-3 rounded text-base font-medium flex items-center">
                  Create Your Invitation
                  <ChevronRight className="ml-2 h-4 w-4" />
                </button>
                <button className="border border-gray-300 bg-white hover:bg-gray-100 text-gray-800 px-6 py-3 rounded text-base font-medium">
                  View Templates
                </button>
              </div>
            </div>
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1622556498246-755f44ca76f3?q=80&w=800&auto=format&fit=crop"
                alt="Digital invitation example"
                className="w-full rounded-xl shadow-lg"
              />
              <div className="absolute -bottom-6 -left-6 bg-white rounded-xl shadow p-4 hidden md:block">
                <p className="text-sm text-gray-700">
                  <span className="font-semibold text-green-600">3,500+</span> events celebrated
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-10 border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            ["10,000+", "Invitations Sent"],
            ["12", "Indian Languages"],
            ["98%", "Client Satisfaction"],
            ["150+", "Template Designs"]
          ].map(([stat, label], i) => (
            <div key={i} className="text-center">
              <p className="text-3xl font-bold text-amber-600">{stat}</p>
              <p className="text-sm text-gray-600 mt-1">{label}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">
              Features Tailored for <span className="text-amber-600">Your Moments</span>
            </h2>
            <p className="mt-4 text-gray-600 max-w-xl mx-auto">
              Everything you need to craft the perfect digital invite.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-gray-50 rounded-lg hover:shadow-md p-6 border border-gray-100">
                <div className="bg-amber-50 w-14 h-14 rounded-lg flex items-center justify-center mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600 text-sm">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            How <span className="text-amber-600">It Works</span>
          </h2>
          <p className="text-gray-600 max-w-xl mx-auto mb-12">
            A seamless experience from creation to distribution.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {steps.map((step, index) => (
              <div key={index} className="bg-white rounded-lg shadow p-6 text-center">
                <div className="w-12 h-12 rounded-full bg-amber-100 text-amber-600 font-bold flex items-center justify-center mb-4">
                  {step.number}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{step.title}</h3>
                <p className="text-gray-600 text-sm">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">
              Words From <span className="text-amber-600">Our Clients</span>
            </h2>
            <p className="mt-4 text-gray-600 max-w-xl mx-auto">
              Hear how Sandesh helped create unforgettable moments.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-gray-50 rounded-lg p-6 border border-gray-100">
                <div className="flex items-center mb-4">
                  <img src={testimonial.image} alt={testimonial.name} className="w-12 h-12 rounded-full mr-4 border-2 border-amber-100 object-cover" />
                  <div>
                    <h4 className="text-base font-semibold text-gray-900">{testimonial.name}</h4>
                    <p className="text-sm text-amber-600">{testimonial.role}</p>
                  </div>
                </div>
                <div className="mb-3">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="text-amber-400 text-sm">★</span>
                  ))}
                </div>
                <p className="text-gray-600 text-sm">{testimonial.quote}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-gradient-to-r from-amber-600 to-amber-700 text-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Your Perfect Invitation Starts Here</h2>
          <p className="text-lg opacity-90 mb-8">Join 10,000+ hosts who chose Sandesh for their big day.</p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button className="bg-white text-amber-600 hover:bg-gray-100 px-6 py-3 rounded text-base font-medium flex items-center justify-center">
              Start Creating
              <ArrowRight className="ml-2 h-4 w-4" />
            </button>
            <button className="border border-white hover:bg-white/10 px-6 py-3 rounded text-base font-medium">
              Schedule a Demo
            </button>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Home;
