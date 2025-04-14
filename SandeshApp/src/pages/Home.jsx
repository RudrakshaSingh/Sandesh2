import React, { useEffect } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
} from 'react-native';
import tw from 'twrnc';
import { useNavigation } from '@react-navigation/native';
import {
  PenTool,
  Mail,
  Video,
  Globe,
  ChevronRight,
  ArrowRight,
  Check,
  Heart,
  Clock,
  Gift,
  Calendar,
} from 'lucide-react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';

const Home = () => {
  const navigation = useNavigation();

  // Animation states
  const opacity = useSharedValue(0);
  const translateY = useSharedValue(10);

  useEffect(() => {
    opacity.value = withTiming(1, { duration: 600 });
    translateY.value = withTiming(0, { duration: 600 });
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ translateY: translateY.value }],
  }));

  const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);

  const features = [
    {
      icon: <PenTool size={28} color="#d97706" />,
      title: 'Customizable Templates',
      description: 'Tailored for Indian celebrations, fully customizable.',
    },
    {
      icon: <Mail size={28} color="#d97706" />,
      title: 'Eco-Friendly Delivery',
      description: 'Send digital invites sustainably.',
    },
    {
      icon: <Video size={28} color="#d97706" />,
      title: 'Rich Media Integration',
      description: 'Embed videos, photos, and typography.',
    },
    {
      icon: <Globe size={28} color="#d97706" />,
      title: 'Multilingual Support',
      description: 'Invites in native languages.',
    },
    {
      icon: <ChevronRight size={28} color="#d97706" />,
      title: 'RSVP Tracking',
      description: 'Monitor responses instantly.',
    },
    {
      icon: <ArrowRight size={28} color="#d97706" />,
      title: 'Seamless Sharing',
      description: 'Share via WhatsApp, email, links.',
    },
  ];

  const popularEventCategories = [
    {
      title: 'Wedding',
      image:
        'https://images.unsplash.com/photo-1519741347686-c1e0aadf4611?q=80&w=1800&auto=format&fit=crop',
      description: 'Traditional motifs, modern design.',
      count: '250+ Templates',
    },
    {
      title: 'Diwali Celebration',
      image:
        'https://marketplace.canva.com/EAFxDku9Kxo/1/0/1600w/canva-purple-traditional-festive-happy-diwali-greeting-card-cey04IAVLI4.jpg',
      description: 'Diyas, rangoli, festive vibes.',
      count: '120+ Templates',
    },
    {
      title: 'Birthday Party',
      image:
        'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?q=80&w=1800&auto=format&fit=crop',
      description: 'Fun, colorful designs.',
      count: '180+ Templates',
    },
    {
      title: 'Corporate Events',
      image:
        'https://images.unsplash.com/photo-1511578314322-379afb476865?q=80&w=1800&auto=format&fit=crop',
      description: 'Professional conference invites.',
      count: '150+ Templates',
    },
  ];

  const steps = [
    {
      number: '01',
      title: 'Select Template',
      description: 'Browse vibrant designs.',
    },
    {
      number: '02',
      title: 'Personalize Details',
      description: 'Add details, media, fonts.',
    },
    {
      number: '03',
      title: 'Send & Track',
      description: 'Share and track RSVPs.',
    },
  ];

  const testimonials = [
    {
      name: 'Priya Sharma',
      role: 'Wedding Planner',
      image:
        'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?q=80&w=200&auto=format&fit=crop',
      quote: 'Transformed our wedding invites.',
    },
    {
      name: 'Rajesh Patel',
      role: 'Events Manager',
      image:
        'https://images.unsplash.com/photo-1566492031773-4f4e44671857?q=80&w=200&auto=format&fit=crop',
      quote: 'Streamlined our Diwali events.',
    },
    {
      name: 'Ananya Desai',
      role: 'Program Director',
      image:
        'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&auto=format&fit=crop',
      quote: 'Perfect for cultural events.',
    },
  ];

  const recentInvitations = [
    {
      title: 'Sharma Wedding',
      image:
        'https://images.unsplash.com/photo-1520854221256-17451cc331bf?q=80&w=600&auto=format&fit=crop',
      type: 'Wedding',
      date: 'Mar 15, 2025',
    },
    {
      title: 'Corporate Gala',
      image:
        'https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=600&auto=format&fit=crop',
      type: 'Corporate',
      date: 'Apr 22, 2025',
    },
    {
      title: 'Holi Party',
      image: 'https://img.freepik.com/free-psd/holi-party-invitation_23-2151942361.jpg',
      type: 'Festival',
      date: 'Mar 10, 2025',
    },
    {
      title: 'Aryan’s Birthday',
      image:
        'https://d1csarkz8obe9u.cloudfront.net/posterpreviews/birthday-party-card-design-template-90f9aa6e73fdb1fa8b4ec5c8054df0fe_screen.jpg?ts=1570077553',
      type: 'Birthday',
      date: 'Apr 3, 2025',
    },
  ];

  const templates = [
    {
      id: 1,
      name: 'Royal Wedding',
      image:
        'https://images.unsplash.com/photo-1519225421980-715cb0215aed?q=80&w=600&auto=format&fit=crop',
      category: 'Wedding',
      description: 'Traditional motifs.',
      tag: 'Trending',
      tagBg: 'bg-amber-100',
      tagText: 'text-amber-700',
    },
    {
      id: 2,
      name: 'Diwali Sparkles',
      image:
        'https://www.shutterstock.com/image-photo/hand-holding-burning-sparkler-against-600nw-1834540279.jpg',
      category: 'Festival',
      description: 'Festive diyas.',
      tag: 'Popular',
      tagBg: 'bg-green-100',
      tagText: 'text-green-700',
    },
    {
      id: 3,
      name: 'Corporate Summit',
      image:
        'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?q=80&w=600&auto=format&fit=crop',
      category: 'Business',
      description: 'Professional invites.',
      tag: 'New',
      tagBg: 'bg-blue-100',
      tagText: 'text-blue-700',
    },
    {
      id: 4,
      name: 'Birthday Bash',
      image:
        'https://images.unsplash.com/photo-1558636508-e0db3814bd1d?q=80&w=600&auto=format&fit=crop',
      category: 'Birthday',
      description: 'Colorful designs.',
      tag: 'Best Seller',
      tagBg: 'bg-purple-100',
      tagText: 'text-purple-700',
    },
  ];

  const stats = [
    ['10,000+', 'Invitations Sent', 'Trusted by users'],
    ['12', 'Languages', 'Native language support'],
    ['98%', 'Satisfaction', 'Loved by clients'],
    ['150+', 'Templates', 'For every occasion'],
  ];

  const ctaItems = [
    { icon: <Gift size={24} color="white" />, text: 'Free Templates' },
    { icon: <Clock size={24} color="white" />, text: 'Create Fast' },
    { icon: <Calendar size={24} color="white" />, text: 'Event Tools' },
    { icon: <Heart size={24} color="white" />, text: '24/7 Support' },
  ];

  // Sections for FlatList
  const sections = [
    {
      id: 'hero',
      render: () => (
        <Animated.View style={[tw`py-6 px-5`, animatedStyle]}>
          <LinearGradient
            colors={['#fefce8', '#fef9c3', '#fef08a']}
            style={tw`rounded-xl p-5`}
          >
            <Text
              style={tw`bg-amber-100 text-amber-700 px-4 py-1.5 rounded-full text-sm font-semibold mb-4 text-center`}
            >
              India’s Premier Invitation Platform
            </Text>
            <Text style={tw`text-3xl font-extrabold text-gray-900 text-center mb-3`}>
              Create <Text style={tw`text-amber-600`}>Stunning Invitations</Text>
            </Text>
            <Text style={tw`text-base text-gray-700 text-center mb-4`}>
              Sandesh blends technology and elegance for your celebrations.
            </Text>
            <View style={tw`flex-row flex-wrap justify-center mb-4`}>
              {[
                'Authentic Designs',
                'Easy Sharing',
                'Instant RSVP',
                'Multilingual',
              ].map((item, idx) => (
                <View key={idx} style={tw`flex-row items-center mr-4 mb-2`}>
                  <Check size={18} color="#22c55e" />
                  <Text style={tw`text-sm font-medium text-gray-700 ml-1.5`}>
                    {item}
                  </Text>
                </View>
              ))}
            </View>
            <View style={tw`flex-row justify-center gap-4 mb-4`}>
              <AnimatedTouchable
                style={tw`bg-amber-600 px-6 py-3 rounded-xl flex-row items-center`}
                onPress={() => navigation.navigate('CreateCard')}
                activeOpacity={0.8}
              >
                <Text style={tw`text-base font-semibold text-white`}>
                  Create Invitation
                </Text>
                <ChevronRight size={20} color="white" style={tw`ml-2`} />
              </AnimatedTouchable>
              <AnimatedTouchable
                style={tw`border-2 border-amber-200 bg-white px-6 py-3 rounded-xl flex-row items-center`}
                onPress={() => navigation.navigate('Templates')}
                activeOpacity={0.8}
              >
                <Text style={tw`text-base font-semibold text-amber-600`}>
                  View Templates
                </Text>
              </AnimatedTouchable>
            </View>
            <View style={tw`flex-row items-center justify-center mb-4`}>
              <View style={tw`flex-row -mr-2`}>
                {[1, 2, 3, 4].map((idx) => (
                  <View
                    key={idx}
                    style={tw`w-8 h-8 rounded-full bg-amber-200 border-2 border-white flex items-center justify-center -mr-2`}
                  >
                    <Text style={tw`text-sm font-semibold text-amber-800`}>
                      {idx}
                    </Text>
                  </View>
                ))}
              </View>
              <Text style={tw`text-sm font-medium text-gray-600 ml-3`}>
                10,000+ Event Planners
              </Text>
            </View>
            <Image
              source={{
                uri: 'https://img.freepik.com/premium-vector/indian-wedding-card-template-with-mandala-digital-invitation-design_562076-81.jpg',
              }}
              style={tw`w-full h-40 rounded-xl border-2 border-amber-200`}
              resizeMode="cover"
            />
          </LinearGradient>
        </Animated.View>
      ),
    },
    {
      id: 'recentInvitations',
      render: () => (
        <Animated.View style={[tw`px-5 py-6`, animatedStyle]}>
          <Text style={tw`text-2xl font-bold text-gray-900 mb-3`}>
            Recent <Text style={tw`text-amber-600`}>Invitations</Text>
          </Text>
          <FlatList
            data={recentInvitations}
            horizontal
            keyExtractor={(item, idx) => idx.toString()}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={tw`bg-white rounded-xl shadow-lg w-48 mr-4 overflow-hidden border border-amber-100`}
              >
                <Image
                  source={{ uri: item.image }}
                  style={tw`w-full h-28`}
                  resizeMode="cover"
                />
                <View style={tw`p-3`}>
                  <View style={tw`flex-row justify-between mb-1`}>
                    <Text style={tw`text-sm font-semibold text-amber-600`}>
                      {item.type}
                    </Text>
                    <View style={tw`flex-row items-center`}>
                      <Clock size={16} color="#6b7280" />
                      <Text style={tw`text-xs text-gray-500 ml-1`}>
                        {item.date}
                      </Text>
                    </View>
                  </View>
                  <Text
                    style={tw`text-base font-semibold text-gray-900`}
                    numberOfLines={1}
                  >
                    {item.title}
                  </Text>
                </View>
              </TouchableOpacity>
            )}
            showsHorizontalScrollIndicator={false}
          />
        </Animated.View>
      ),
    },
    {
      id: 'stats',
      render: () => (
        <Animated.View style={[tw`bg-white py-6 px-5`, animatedStyle]}>
          <Text style={tw`text-2xl font-bold text-gray-900 text-center mb-4`}>
            Why <Text style={tw`text-amber-600`}>Sandesh</Text>?
          </Text>
          <View style={tw`flex-row flex-wrap`}>
            {stats.map((item, idx) => (
              <View key={idx} style={tw`flex-1 items-center p-3 min-w-[50%]`}>
                <Text style={tw`text-3xl font-extrabold text-amber-600`}>
                  {item[0]}
                </Text>
                <Text style={tw`text-base font-semibold text-gray-800 mt-2`}>
                  {item[1]}
                </Text>
                <Text style={tw`text-sm text-gray-600 mt-1 text-center`}>
                  {item[2]}
                </Text>
              </View>
            ))}
          </View>
        </Animated.View>
      ),
    },
    {
      id: 'categories',
      render: () => (
        <Animated.View style={[tw`py-6 px-5 bg-gray-50`, animatedStyle]}>
          <Text style={tw`text-2xl font-bold text-gray-900 mb-3`}>
            Discover <Text style={tw`text-amber-600`}>Categories</Text>
          </Text>
          <Text style={tw`text-sm text-gray-600 mb-4`}>
            Templates for every occasion.
          </Text>
          <View style={tw`flex-row flex-wrap`}>
            {popularEventCategories.map((item, idx) => (
              <TouchableOpacity
                key={idx}
                style={tw`flex-1 m-2 bg-white rounded-xl shadow-lg overflow-hidden border border-amber-100 min-w-[45%]`}
              >
                <Image
                  source={{ uri: item.image }}
                  style={tw`w-full h-24`}
                  resizeMode="cover"
                />
                <View style={tw`p-4`}>
                  <Text
                    style={tw`text-base font-semibold text-gray-900`}
                    numberOfLines={1}
                  >
                    {item.title}
                  </Text>
                  <Text style={tw`text-sm font-medium text-amber-600 mt-1`}>
                    {item.count}
                  </Text>
                  <Text
                    style={tw`text-sm text-gray-600 mt-2`}
                    numberOfLines={2}
                  >
                    {item.description}
                  </Text>
                  <TouchableOpacity style={tw`mt-3 flex-row items-center`}>
                    <Text style={tw`text-amber-600 font-semibold text-sm`}>
                      Explore
                    </Text>
                    <ArrowRight size={18} color="#d97706" style={tw`ml-1`} />
                  </TouchableOpacity>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </Animated.View>
      ),
    },
    {
      id: 'features',
      render: () => (
        <Animated.View style={[tw`py-6 px-5 bg-white`, animatedStyle]}>
          <Text style={tw`text-2xl font-bold text-gray-900 mb-3`}>
            Features for <Text style={tw`text-amber-600`}>Celebrations</Text>
          </Text>
          <Text style={tw`text-sm text-gray-600 mb-4`}>
            Craft perfect invitations.
          </Text>
          <View style={tw`flex-row flex-wrap`}>
            {features.map((item, idx) => (
              <TouchableOpacity
                key={idx}
                style={tw`flex-1 m-2 bg-gray-50 rounded-xl p-4 border border-amber-100 min-w-[45%]`}
              >
                <View
                  style={tw`bg-amber-50 w-12 h-12 rounded-lg flex items-center justify-center mb-3`}
                >
                  {item.icon}
                </View>
                <Text
                  style={tw`text-base font-semibold text-gray-900 mb-2`}
                  numberOfLines={1}
                >
                  {item.title}
                </Text>
                <Text style={tw`text-sm text-gray-600`} numberOfLines={3}>
                  {item.description}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </Animated.View>
      ),
    },
    {
      id: 'howItWorks',
      render: () => (
        <Animated.View style={[tw`py-6 px-5 bg-gray-50`, animatedStyle]}>
          <Text style={tw`text-2xl font-bold text-gray-900 mb-3`}>
            How <Text style={tw`text-amber-600`}>It Works</Text>
          </Text>
          <Text style={tw`text-sm text-gray-600 mb-4`}>
            Create invites in three steps.
          </Text>
          {steps.map((item, idx) => (
            <View
              key={idx}
              style={tw`bg-white rounded-xl shadow-lg p-5 mb-4 flex-row items-center border border-amber-100`}
            >
              <View
                style={tw`w-12 h-12 rounded-full bg-amber-100 flex items-center justify-center mr-4`}
              >
                <Text style={tw`text-lg font-bold text-amber-600`}>
                  {item.number}
                </Text>
              </View>
              <View style={tw`flex-1`}>
                <Text style={tw`text-base font-semibold text-gray-900 mb-1`}>
                  {item.title}
                </Text>
                <Text style={tw`text-sm text-gray-600`}>
                  {item.description}
                </Text>
              </View>
            </View>
          ))}
          <AnimatedTouchable
            style={tw`bg-amber-600 px-6 py-3 rounded-xl flex-row items-center justify-center mt-4`}
            onPress={() => navigation.navigate('CreateCard')}
            activeOpacity={0.8}
          >
            <Text style={tw`text-base font-semibold text-white`}>
              Get Started
            </Text>
            <ChevronRight size={20} color="white" style={tw`ml-2`} />
          </AnimatedTouchable>
        </Animated.View>
      ),
    },
    {
      id: 'testimonials',
      render: () => (
        <Animated.View style={[tw`py-6 px-5 bg-white`, animatedStyle]}>
          <Text style={tw`text-2xl font-bold text-gray-900 mb-3`}>
            Words from <Text style={tw`text-amber-600`}>Clients</Text>
          </Text>
          <Text style={tw`text-sm text-gray-600 mb-4`}>
            Unforgettable moments with Sandesh.
          </Text>
          <FlatList
            data={testimonials}
            horizontal
            keyExtractor={(item, idx) => idx.toString()}
            renderItem={({ item }) => (
              <View
                style={tw`bg-gray-50 rounded-xl p-5 mr-4 w-72 border border-amber-100 shadow-lg`}
              >
                <View style={tw`flex-row mb-3`}>
                  {[...Array(5)].map((_, i) => (
                    <Text key={i} style={tw`text-amber-400 text-lg`}>★</Text>
                  ))}
                </View>
                <Text
                  style={tw`text-sm text-gray-600 mb-4`}
                  numberOfLines={4}
                >
                  {item.quote}
                </Text>
                <View style={tw`flex-row items-center`}>
                  <Image
                    source={{ uri: item.image }}
                    style={tw`w-12 h-12 rounded-full mr-3 border-2 border-amber-200`}
                    resizeMode="cover"
                  />
                  <View>
                    <Text style={tw`text-base font-semibold text-gray-900`}>
                      {item.name}
                    </Text>
                    <Text style={tw`text-sm text-amber-600`}>{item.role}</Text>
                  </View>
                </View>
              </View>
            )}
            showsHorizontalScrollIndicator={false}
          />
        </Animated.View>
      ),
    },
    {
      id: 'templates',
      render: () => (
        <Animated.View style={[tw`py-6 px-5 bg-gray-50`, animatedStyle]}>
          <View style={tw`flex-row justify-between items-center mb-4`}>
            <Text style={tw`text-2xl font-bold text-gray-900`}>
              Featured <Text style={tw`text-amber-600`}>Templates</Text>
            </Text>
            <TouchableOpacity
              style={tw`flex-row items-center`}
              onPress={() => navigation.navigate('Templates')}
            >
              <Text style={tw`text-amber-600 font-semibold text-sm`}>
                View All
              </Text>
              <ArrowRight size={18} color="#d97706" style={tw`ml-1`} />
            </TouchableOpacity>
          </View>
          <View style={tw`flex-row flex-wrap`}>
            {templates.map((item, idx) => (
              <TouchableOpacity
                key={item.id}
                style={tw`flex-1 m-2 bg-white rounded-xl shadow-lg overflow-hidden border border-amber-100 min-w-[45%]`}
              >
                <View style={tw`relative`}>
                  <Image
                    source={{ uri: item.image }}
                    style={tw`w-full h-24`}
                    resizeMode="cover"
                  />
                  <View style={tw`absolute top-2 left-2`}>
                    <Text
                      style={tw`${item.tagBg} ${item.tagText} px-2 py-1 rounded-full text-xs font-semibold`}
                    >
                      {item.tag}
                    </Text>
                  </View>
                </View>
                <View style={tw`p-4`}>
                  <Text
                    style={tw`text-base font-semibold text-gray-900`}
                    numberOfLines={1}
                  >
                    {item.name}
                  </Text>
                  <Text style={tw`text-sm text-amber-600`}>{item.category}</Text>
                  <Text
                    style={tw`text-sm text-gray-600 mt-2`}
                    numberOfLines={2}
                  >
                    {item.description}
                  </Text>
                  <TouchableOpacity
                    style={tw`bg-amber-50 text-amber-600 py-2 rounded-lg mt-3 flex-row items-center justify-center`}
                  >
                    <Text style={tw`text-sm font-semibold`}>Use Template</Text>
                    <ChevronRight size={18} color="#d97706" style={tw`ml-1`} />
                  </TouchableOpacity>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </Animated.View>
      ),
    },
    {
      id: 'cta',
      render: () => (
        <Animated.View style={[tw`py-6 px-5`, animatedStyle]}>
          <LinearGradient
            colors={['#d97706', '#b45309']}
            style={tw`rounded-xl p-5`}
          >
            <Text style={tw`text-2xl font-bold text-white text-center mb-3`}>
              Start Your Invitation
            </Text>
            <Text style={tw`text-base text-white opacity-90 text-center mb-4`}>
              Join 10,000+ hosts crafting memorable events.
            </Text>
            <View style={tw`flex-row justify-center gap-4 mb-4`}>
              <AnimatedTouchable
                style={tw`bg-white px-6 py-3 rounded-xl flex-row items-center`}
                onPress={() => navigation.navigate('CreateCard')}
                activeOpacity={0.8}
              >
                <Text style={tw`text-base font-semibold text-amber-600`}>
                  Start Creating
                </Text>
                <ArrowRight size={20} color="#d97706" style={tw`ml-2`} />
              </AnimatedTouchable>
              <AnimatedTouchable
                style={tw`border-2 border-white px-6 py-3 rounded-xl`}
                activeOpacity={0.8}
              >
                <Text style={tw`text-base font-semibold text-white`}>
                  Schedule Demo
                </Text>
              </AnimatedTouchable>
            </View>
            <View style={tw`flex-row flex-wrap`}>
              {ctaItems.map((item, idx) => (
                <View key={idx} style={tw`flex-1 items-center p-3 min-w-[50%]`}>
                  <View style={tw`mb-2`}>{item.icon}</View>
                  <Text style={tw`text-sm text-white font-medium text-center`}>
                    {item.text}
                  </Text>
                </View>
              ))}
            </View>
          </LinearGradient>
        </Animated.View>
      ),
    },
  ];

  return (
    <SafeAreaView style={tw`flex-1 bg-gray-50`}>
      <FlatList
        data={sections}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => item.render()}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={tw`pb-20`}
      />
    </SafeAreaView>
  );
};

export default Home;