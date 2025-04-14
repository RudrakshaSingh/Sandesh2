import React from 'react';
import { ChevronRight, PenTool, Video, Mail, Globe, ArrowRight, Calendar, Heart, Gift, Clock, Check } from 'lucide-react';
import Layout from '../Components/Layout/Layout';
import ChatBot from './ChatBot';

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

  const popularEventCategories = [
    {
      title: "Wedding",
      image: "https://images.unsplash.com/photo-1519741347686-c1e0aadf4611?q=80&w=1800&auto=format&fit=crop",
      description: "Elegant invitations for your special day with traditional motifs and modern design",
      count: "250+ Templates"
    },
    {
      title: "Diwali Celebration",
      image: "https://marketplace.canva.com/EAFxDku9Kxo/1/0/1600w/canva-purple-traditional-festive-happy-diwali-greeting-card-cey04IAVLI4.jpg",
      description: "Vibrant designs featuring diyas, rangoli patterns and festive elements",
      count: "120+ Templates"
    },
    {
      title: "Birthday Party",
      image: "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?q=80&w=1800&auto=format&fit=crop",
      description: "Fun and colorful designs for memorable birthday celebrations",
      count: "180+ Templates"
    },
    {
      title: "Corporate Events",
      image: "https://images.unsplash.com/photo-1511578314322-379afb476865?q=80&w=1800&auto=format&fit=crop",
      description: "Professional templates for conferences, product launches and team gatherings",
      count: "150+ Templates"
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
      image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?q=80&w=200&auto=format&fit=crop",
      quote: "Sandesh has transformed how we coordinate wedding invitations for our clients. The professional templates and ease of customization are unmatched."
    },
    {
      name: "Rajesh Patel",
      role: "Corporate Events Manager",
      image: "https://images.unsplash.com/photo-1566492031773-4f4e44671857?q=80&w=200&auto=format&fit=crop",
      quote: "We rely on Sandesh for all our corporate Diwali and cultural event invitations. The analytics and RSVP tracking have streamlined our planning process."
    },
    {
      name: "Ananya Desai",
      role: "Cultural Program Director",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&auto=format&fit=crop",
      quote: "The multilingual support and traditional design elements in Sandesh perfectly capture the essence of our classical dance performances and cultural events."
    }
  ];

  const recentInvitations = [
    {
      title: "Sharma Wedding Reception",
      image: "https://images.unsplash.com/photo-1520854221256-17451cc331bf?q=80&w=600&auto=format&fit=crop",
      type: "Wedding",
      date: "March 15, 2025"
    },
    {
      title: "Annual Corporate Gala",
      image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=600&auto=format&fit=crop",
      type: "Corporate",
      date: "April 22, 2025"
    },
    {
      title: "Holi Celebration Party",
      image: "https://img.freepik.com/free-psd/holi-party-invitation_23-2151942361.jpg",
      type: "Festival",
      date: "March 10, 2025"
    },
    {
      title: "Aryan's 5th Birthday",
      image: "https://d1csarkz8obe9u.cloudfront.net/posterpreviews/birthday-party-card-design-template-90f9aa6e73fdb1fa8b4ec5c8054df0fe_screen.jpg?ts=1570077553",
      type: "Birthday",
      date: "April 3, 2025"
    }
  ];
  const PlayStoreIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="w-5 h-5 mr-2 fill-current">
      <path d="M325.3 234.3L104.5 25.8C98 20 91.4 20.9 85.8 23.9l233.4 233.4zm22.5 22.5L85.8 488.1c5.6 3 12.2 3.9 18.7-1.9l220.8-208.5zM64 32v448l244.1-224L64 32zm279.7 213.3l-28.6 26.3 86.6 86.6c9.7 9.7 25.4 9.7 35.1 0l29.6-29.6c9.7-9.7 9.7-25.4 0-35.1l-86.6-86.6z"/>
    </svg>
  );


  return (
    <Layout>
      {/* Hero Section with reduced padding and more content */}
      <section className="bg-gradient-to-r from-gray-50 to-amber-50 py-12 lg:py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <span className="bg-amber-100 text-amber-700 px-4 py-1 rounded-full text-sm font-medium inline-block mb-4">India's Premier Digital Invitation Platform</span>
              <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
                Create <span className="text-amber-600">Stunning Invitations</span> For Your Special Moments
              </h1>
              <p className="mt-4 text-lg text-gray-700">
                Sandesh brings modern technology and cultural elegance together to help you create and send beautiful digital invites for all your celebrations across India.
              </p>
              <div className="flex flex-wrap items-center mt-4 text-sm text-gray-700">
                <div className="flex items-center mr-4 mb-2">
                  <Check className="w-4 h-4 text-green-500 mr-1" /> Culturally Authentic
                </div>
                <div className="flex items-center mr-4 mb-2">
                  <Check className="w-4 h-4 text-green-500 mr-1" /> Seamless Sharing
                </div>
                <div className="flex items-center mr-4 mb-2">
                  <Check className="w-4 h-4 text-green-500 mr-1" /> Instant RSVP
                </div>
                <div className="flex items-center mb-2">
                  <Check className="w-4 h-4 text-green-500 mr-1" /> Multi-language Support
                </div>
              </div>
              <div className="mt-6 flex flex-col sm:flex-row gap-4">
                <button className="bg-amber-600 hover:bg-amber-700 text-white px-6 py-3 rounded-md text-base font-medium flex items-center justify-center">
                  Create Your Invitation
                  <ChevronRight className="ml-2 h-4 w-4" />
                </button>
                <button className="border border-gray-300 bg-white hover:bg-gray-100 text-gray-800 px-6 py-3 rounded-md text-base font-medium">
                  View Templates
                </button>
              </div>
              <div className="mt-6 flex items-center">
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4].map((idx) => (
                    <div key={idx} className="w-8 h-8 rounded-full bg-amber-200 border-2 border-white flex items-center justify-center text-xs font-medium text-amber-800">
                      {idx}
                    </div>
                  ))}
                </div>
                <p className="ml-3 text-sm text-gray-600">Joined by 10,000+ event planners & hosts</p>
              </div>
            </div>
            <div className="relative">
              <div className="relative z-10">
                <img
                  src="https://img.freepik.com/premium-vector/indian-wedding-card-template-with-mandala-digital-invitation-design_562076-81.jpg"
                  alt="Digital invitation example"
                  className="w-full rounded-xl shadow-lg"
                />
                <div className="absolute -bottom-4 -right-4 bg-white rounded-lg shadow-md p-3 hidden md:block">
                  <div className="flex items-center">
                    <Heart className="w-5 h-5 text-red-500 mr-2" />
                    <p className="text-sm font-medium">3,500+ events celebrated</p>
                  </div>
                </div>
              </div>
              <div className="absolute top-1/2 right-0 transform translate-x-1/4 -translate-y-1/2 w-32 h-32 bg-amber-100 rounded-full blur-3xl opacity-60 -z-10"></div>
              <div className="absolute bottom-0 left-0 transform -translate-x-1/4 translate-y-1/4 w-40 h-40 bg-amber-200 rounded-full blur-3xl opacity-60 -z-10"></div>
            </div>
          </div>

          {/* Preview Cards Row */}
          <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4">
            {recentInvitations.map((invitation, idx) => (
              <div key={idx} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                <img src={invitation.image} alt={invitation.title} className="w-full h-32 object-cover" />
                <div className="p-3">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-xs font-medium text-amber-600">{invitation.type}</span>
                    <div className="flex items-center text-xs text-gray-500">
                      <Clock className="w-3 h-3 mr-1" /> {invitation.date}
                    </div>
                  </div>
                  <h3 className="text-sm font-medium text-gray-900 truncate">{invitation.title}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-white py-8 border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            ["10,000+", "Invitations Sent", "Users trust us for their special events"],
            ["12", "Indian Languages", "Reach your guests in their native language"],
            ["98%", "Client Satisfaction", "Our clients love our service quality"],
            ["150+", "Template Designs", "Find the perfect design for every occasion"]
          ].map(([stat, label, desc], i) => (
            <div key={i} className="text-center">
              <p className="text-3xl font-bold text-amber-600">{stat}</p>
              <p className="text-sm font-medium text-gray-800 mt-1">{label}</p>
              <p className="text-xs text-gray-600 mt-1">{desc}</p>
            </div>
          ))}
        </div>
      </section>
      <ChatBot />

      {/* Popular Event Categories */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-gray-900">
              Discover <span className="text-amber-600">Event Categories</span>
            </h2>
            <p className="mt-4 text-gray-600 max-w-xl mx-auto">
              Browse our extensive collection of professionally designed templates for every occasion.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {popularEventCategories.map((category, index) => (
              <div key={index} className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all group">
                <div className="relative">
                  <img src={category.image} alt={category.title} className="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-300" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-70"></div>
                  <div className="absolute bottom-0 left-0 p-4 text-white">
                    <h3 className="text-lg font-bold">{category.title}</h3>
                    <p className="text-xs font-medium mt-1">{category.count}</p>
                  </div>
                </div>
                <div className="p-4">
                  <p className="text-sm text-gray-600">{category.description}</p>
                  <button className="mt-3 text-amber-600 font-medium text-sm flex items-center">
                    Explore templates <ArrowRight className="ml-1 w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-gray-900">
              Features Tailored for <span className="text-amber-600">Your Celebrations</span>
            </h2>
            <p className="mt-4 text-gray-600 max-w-xl mx-auto">
              Everything you need to craft the perfect digital invitation for your special occasion.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <div key={index} className="bg-gray-50 rounded-lg hover:shadow-md p-6 border border-gray-100 hover:border-amber-200 transition-all">
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

      {/* How It Works */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            How <span className="text-amber-600">It Works</span>
          </h2>
          <p className="text-gray-600 max-w-xl mx-auto mb-10">
            A seamless experience from creation to distribution in just three simple steps.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {steps.map((step, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md p-6 text-center relative">
                <div className="w-12 h-12 rounded-full bg-amber-100 text-amber-600 font-bold flex items-center justify-center mb-4 mx-auto">
                  {step.number}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{step.title}</h3>
                <p className="text-gray-600 text-sm">{step.description}</p>

              </div>
            ))}
          </div>
          <div className="mt-12 flex justify-center">
            <button className="bg-amber-600 hover:bg-amber-700 text-white px-6 py-3 rounded-md text-base font-medium flex items-center">
              Get Started Now
              <ChevronRight className="ml-2 h-4 w-4" />
            </button>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-gray-900">
              Words From <span className="text-amber-600">Our Clients</span>
            </h2>
            <p className="mt-4 text-gray-600 max-w-xl mx-auto">
              Hear how Sandesh helped create unforgettable moments for events across India.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-gray-50 rounded-lg p-6 border border-gray-100 hover:border-amber-200 hover:shadow-md transition-all">
                <div className="mb-3 text-amber-400 flex">
                  {[...Array(5)].map((_, i) => (
                    <span key={i}>★</span>
                  ))}
                </div>
                <p className="text-gray-600 text-sm mb-6">{testimonial.quote}</p>
                <div className="flex items-center">
                  <img src={testimonial.image} alt={testimonial.name} className="w-12 h-12 rounded-full mr-4 border-2 border-amber-100 object-cover" />
                  <div>
                    <h4 className="text-base font-semibold text-gray-900">{testimonial.name}</h4>
                    <p className="text-sm text-amber-600">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Templates */}
      <section className="py-12 bg-gray-50">
  <div className="max-w-7xl mx-auto px-4">
    <div className="flex flex-col md:flex-row justify-between items-center mb-10">
      <div>
        <h2 className="text-3xl font-bold text-gray-900">
          Featured <span className="text-amber-600">Templates</span>
        </h2>
        <p className="mt-2 text-gray-600">
          Our most popular and trending invitation designs
        </p>
      </div>
      <button className="mt-4 md:mt-0 flex items-center text-amber-600 font-medium">
        View all templates <ArrowRight className="ml-2 w-4 h-4" />
      </button>
    </div>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {[
        {
          id: 1,
          name: "Royal Wedding",
          image: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?q=80&w=600&auto=format&fit=crop",
          category: "Wedding",
          description: "Elegant design with traditional motifs for your special day",
          tag: "Trending",
          tagBg: "bg-amber-100",
          tagText: "text-amber-700"
        },
        {
          id: 2,
          name: "Diwali Sparkles",
          image: "https://www.shutterstock.com/image-photo/hand-holding-burning-sparkler-against-600nw-1834540279.jpg",
          category: "Festival",
          description: "Vibrant designs featuring diyas and beautiful rangoli patterns",
          tag: "Popular",
          tagBg: "bg-green-100",
          tagText: "text-green-700"
        },
        {
          id: 3,
          name: "Corporate Summit",
          image: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?q=80&w=600&auto=format&fit=crop",
          category: "Business",
          description: "Professional templates for conferences and business events",
          tag: "New",
          tagBg: "bg-blue-100",
          tagText: "text-blue-700"
        },
        {
          id: 4,
          name: "Birthday Bash",
          image: "https://images.unsplash.com/photo-1558636508-e0db3814bd1d?q=80&w=600&auto=format&fit=crop",
          category: "Birthday",
          description: "Fun and colorful designs for memorable birthday celebrations",
          tag: "Best Seller",
          tagBg: "bg-purple-100",
          tagText: "text-purple-700"
        }
      ].map((template) => (
        <div key={template.id} className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all group">
          <div className="relative">
            <img
              src={template.image}
              alt={`${template.name} template design`}
              className="w-full h-60 object-cover"
            />
            <div className="absolute top-3 left-3">
              <span className={`${template.tagBg} ${template.tagText} px-2 py-1 rounded-full text-xs font-medium`}>
                {template.tag}
              </span>
            </div>
            <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <div className="text-center space-y-2">
                <button className="bg-white text-amber-600 px-4 py-2 rounded-md text-sm font-medium hover:bg-amber-50 transition-colors">
                  Preview Template
                </button>
                <p className="text-white text-xs px-4">Click to see full details</p>
              </div>
            </div>
          </div>
          <div className="p-4">
            <div className="flex justify-between items-center mb-2">
              <div>
                <h3 className="font-medium text-gray-900">{template.name}</h3>
                <span className="text-xs text-amber-600">{template.category}</span>
              </div>
              <div className="bg-gray-100 text-gray-600 rounded-full w-8 h-8 flex items-center justify-center">
                <Heart className="w-4 h-4" />
              </div>
            </div>
            <p className="text-xs text-gray-600 mb-3">{template.description}</p>
            <button className="w-full bg-amber-50 hover:bg-amber-100 text-amber-600 py-2 rounded-md text-sm font-medium transition-colors flex items-center justify-center">
              Use This Template
              <ChevronRight className="ml-1 w-4 h-4" />
            </button>
          </div>
        </div>
      ))}
    </div>

    {/* Added template categories */}
    <div className="mt-12">
      <h3 className="text-xl font-semibold text-gray-900 mb-6">Browse by Category</h3>
      <div className="flex flex-wrap gap-3">
        {[
          "Wedding", "Birthday", "Diwali", "Holi", "Anniversary", "Baby Shower",
          "Corporate", "Retirement", "Engagement", "Graduation", "Festival", "Puja"
        ].map((category, idx) => (
          <button key={idx} className="bg-white border border-gray-200 hover:border-amber-300 text-gray-700 px-4 py-2 rounded-full text-sm transition-colors">
            {category}
          </button>
        ))}
      </div>
    </div>
  </div>
</section>

      {/* CTA Section */}
      <section className="py-12 bg-gradient-to-r from-amber-600 to-amber-700 text-white">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Your Perfect Invitation Starts Here</h2>
          <p className="text-lg opacity-90 mb-8">Join 10,000+ hosts across India who chose Sandesh for their special occasions.</p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button className="bg-white text-amber-600 hover:bg-gray-100 px-6 py-3 rounded-md text-base font-medium flex items-center justify-center">
              Start Creating
              <ArrowRight className="ml-2 h-4 w-4" />
            </button>
            <button className="border border-white hover:bg-white/10 px-6 py-3 rounded-md text-base font-medium">
              Schedule a Demo
            </button>
          </div>
          <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { icon: <Gift className="w-6 h-6 mx-auto mb-2" />, text: "Free templates to get started" },
              { icon: <Clock className="w-6 h-6 mx-auto mb-2" />, text: "Create in minutes, not hours" },
              { icon: <Calendar className="w-6 h-6 mx-auto mb-2" />, text: "Event management tools included" },
              { icon: <Heart className="w-6 h-6 mx-auto mb-2" />, text: "24/7 customer support" }
            ].map((item, i) => (
              <div key={i} className="text-center">
                {item.icon}
                <p className="text-sm opacity-90">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Home;