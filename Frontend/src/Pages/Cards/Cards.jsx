import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';

const Cards = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const params = useParams(); // Get URL parameters
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState(null);
  const [type, setType] = useState(null);
  const [pageTitle, setPageTitle] = useState('Cards');
  const [pageDescription, setPageDescription] = useState('Browse our collection of cards');

  // Helper function to get category and type names
  const getCategoryInfo = (categoryId, typeId) => {
    const categoryData = templateCategories.find(cat => cat.id === categoryId);
    if (!categoryData) {
      // Try to find the type in all categories if category is not specified
      for (const cat of templateCategories) {
        const typeData = cat.subcategories.find(sub => sub.type === typeId);
        if (typeData) {
          return {
            categoryName: cat.name,
            typeName: typeData.name
          };
        }
      }
      return { categoryName: 'All Cards', typeName: typeId ? typeId.charAt(0).toUpperCase() + typeId.slice(1) : '' };
    }

    const typeData = categoryData.subcategories.find(sub => sub.type === typeId);
    return {
      categoryName: categoryData.name,
      typeName: typeData ? typeData.name : 'All'
    };
  };

  // Template categories data (same as in HeaderDrawer)
  const templateCategories = [
    {
      id: 'events',
      name: 'Events & Celebrations',
      subcategories: [
        { name: 'Wedding Invitations', type: 'wedding-card' },
        { name: 'Engagement Announcements', type: 'engagement' },
        { name: 'Birthday Invites', type: 'birthday' },
        { name: 'Baby Shower / Naming Ceremony', type: 'baby-shower' },
        { name: 'Anniversary Celebrations', type: 'anniversary' },
        { name: 'Housewarming Invites', type: 'housewarming' },
        { name: 'Retirement Party Invites', type: 'retirement' },
        { name: 'Graduation Celebrations', type: 'graduation' },
      ]
    },
    {
      id: 'festivals',
      name: 'Festivals',
      subcategories: [
        { name: 'Diwali Greetings', type: 'diwali' },
        { name: 'Eid Mubarak Cards', type: 'eid' },
        { name: 'Holi Wishes', type: 'holi' },
        { name: 'Christmas Cards', type: 'christmas' },
        { name: 'Raksha Bandhan / Bhai Dooj', type: 'raksha-bandhan' },
        { name: 'Navratri / Durga Puja', type: 'navratri' },
        { name: 'Pongal / Makar Sankranti', type: 'pongal' },
        { name: 'Lohri / Baisakhi / Onam', type: 'regional-festivals' },
      ]
    },
    {
      id: 'personal',
      name: 'Personal & Professional',
      subcategories: [
        { name: 'Thank You Cards', type: 'thank-you' },
        { name: 'Get Well Soon', type: 'get-well' },
        { name: 'Sorry / Apology Cards', type: 'apology' },
        { name: 'Farewell Notes', type: 'farewell' },
        { name: 'New Job / Promotion Cards', type: 'promotion' },
        { name: 'Love Notes / Proposal Cards', type: 'love' },
        { name: 'Condolences / RIP Cards', type: 'condolences' },
        { name: 'Professional Greetings', type: 'professional' },
      ]
    },
    {
      id: 'special',
      name: 'Special Days',
      subcategories: [
        { name: 'Valentine\'s Day', type: 'valentines' },
        { name: 'Mother\'s Day / Father\'s Day', type: 'parents-day' },
        { name: 'Teacher\'s Day', type: 'teachers-day' },
        { name: 'Children\'s Day', type: 'childrens-day' },
        { name: 'Independence / Republic Day', type: 'national-days' },
        { name: 'Women\'s Day', type: 'womens-day' },
        { name: 'New Year Greetings', type: 'new-year' },
      ]
    }
  ];

  useEffect(() => {
    // Try to get parameters from both URL query and path params
    const queryParams = new URLSearchParams(location.search);
    const categoryParam = queryParams.get('category');
    let typeParam = queryParams.get('type');

    // If type is not in query params, check if it's in the path params
    // This handles cases like /templates/wedding-card
    if (!typeParam && params.type) {
      typeParam = params.type;
    }

    // For /templates/wedding-card specific URL, hardcode the type
    if (location.pathname === '/templates/wedding-card') {
      typeParam = 'wedding-card';
    }

    setCategory(categoryParam);
    setType(typeParam);

    // Set page title based on parameters
    if (typeParam) {
      const { categoryName, typeName } = getCategoryInfo(categoryParam, typeParam);
      setPageTitle(typeName);
      setPageDescription(`Browse our collection of ${typeName} cards from ${categoryName}`);
    } else if (categoryParam) {
      const categoryData = templateCategories.find(cat => cat.id === categoryParam);
      if (categoryData) {
        setPageTitle(categoryData.name);
        setPageDescription(`Browse our collection of ${categoryData.name} cards`);
      }
    }

    // Fetch cards based on the parameters
    fetchCards(categoryParam, typeParam);
  }, [location.search, location.pathname, params]);

  // Function to fetch cards - replace with your actual API call
  const fetchCards = async (categoryParam, typeParam) => {
    setLoading(true);
    try {
      // Simulate API call with a timeout
      await new Promise(resolve => setTimeout(resolve, 800));

      // Here you would typically fetch data from your API
      // For now, we'll use mock data
      const mockCards = generateMockCards(categoryParam, typeParam);
      setCards(mockCards);
    } catch (error) {
      console.error('Error fetching cards:', error);
    } finally {
      setLoading(false);
    }
  };

  // Generate mock cards for demonstration
  const generateMockCards = (categoryParam, typeParam) => {
    // This is just for demonstration
    const mockCards = [];
    const count = 12; // Number of mock cards to generate

    for (let i = 1; i <= count; i++) {
      mockCards.push({
        id: `card-${i}`,
        title: `${typeParam ? typeParam.charAt(0).toUpperCase() + typeParam.slice(1).replace(/-/g, ' ') : 'Card'} ${i}`,
        image: `/api/placeholder/300/200`,
        description: `A beautiful ${typeParam ? typeParam.replace(/-/g, ' ') : 'card'} design for your special occasion.`,
        category: categoryParam || 'general',
        type: typeParam || 'general'
      });
    }

    return mockCards;
  };

  // Go back function
  const goBack = () => {
    navigate(-1);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <button onClick={goBack} className="flex items-center text-amber-600 hover:text-amber-700 mb-4">
          <ChevronLeft className="h-5 w-5" />
          <span>Back</span>
        </button>
        <h1 className="text-3xl font-bold text-gray-800">{pageTitle}</h1>
        <p className="text-gray-600 mt-2">{pageDescription}</p>
      </div>

      {/* Loading State */}
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-amber-600"></div>
        </div>
      ) : (
        <>
          {/* Cards Grid */}
          {cards.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {cards.map((card) => (
                <div key={card.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
                  <div className="h-48 bg-gray-200">
                    <img
                      src={card.image}
                      alt={card.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="text-lg font-semibold text-gray-800">{card.title}</h3>
                    <p className="text-gray-600 text-sm mt-2">{card.description}</p>
                    <div className="mt-4">
                      <button className="w-full bg-amber-600 text-white py-2 rounded hover:bg-amber-700 transition-colors duration-300">
                        Use This Template
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-600">No cards found for this category. Please try a different selection.</p>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Cards;