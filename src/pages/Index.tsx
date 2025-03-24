
import Hero from "../components/Hero";
import FeaturedProducts from "../components/FeaturedProducts";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const Index = () => {
  const categories = [
    {
      name: "Posters",
      image: "https://images.unsplash.com/photo-1613376023733-0a73315d9b06?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxyYW5kb218MHx8cG9zdGVyfHx8fHx8MTY5NDEwMjg2OQ&ixlib=rb-4.0.3&q=80",
      link: "/shop?category=poster",
      description: "Premium anime art prints for your walls",
    },
    {
      name: "Figures",
      image: "https://images.unsplash.com/photo-1605488000363-f71ed0dd678e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxyYW5kb218MHx8YWN0aW9uIGZpZ3VyZXx8fHx8fDE2OTQxMDI4MjA&ixlib=rb-4.0.3&q=80",
      link: "/shop?category=figure",
      description: "Detailed collectible figures of your favorite characters",
    },
    {
      name: "Keychains",
      image: "https://images.unsplash.com/photo-1602178141781-ecc8d388c946?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxyYW5kb218MHx8a2V5Y2hhaW58fHx8fHwxNjk0MTAyODQ0&ixlib=rb-4.0.3&q=80",
      link: "/shop?category=keychain",
      description: "Cute and collectible anime keychains",
    },
    {
      name: "Plushies",
      image: "https://images.unsplash.com/photo-1554825203-68321ddde262?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxyYW5kb218MHx8cGx1c2h8fHx8fHwxNjk0MTAyOTMx&ixlib=rb-4.0.3&q=80",
      link: "/shop?category=plushie",
      description: "Soft and huggable character plushies",
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <Hero />

      {/* Featured Products Section */}
      <FeaturedProducts />

      {/* Categories Section */}
      <section className="py-24 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-block px-3 py-1 bg-secondary-100 text-secondary-800 rounded-full text-sm font-medium mb-4">
              Browse by Category
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Discover Our Collections</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Find exactly what you're looking for among our carefully curated collections of anime merchandise.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {categories.map((category, index) => (
              <Link 
                key={category.name} 
                to={category.link}
                className="group hover:scale-[1.01] transition-all duration-300"
              >
                <div 
                  className="rounded-xl overflow-hidden shadow-lg h-full flex flex-col"
                  style={{ 
                    animationDelay: `${index * 150}ms`,
                    animation: "fade-in 0.5s ease-out forwards",
                  }}
                >
                  <div className="relative h-60 overflow-hidden">
                    <img
                      src={category.image}
                      alt={category.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-70"></div>
                  </div>
                  <div className="p-6 flex flex-col flex-grow bg-white">
                    <h3 className="font-bold text-xl mb-2 text-gray-900">{category.name}</h3>
                    <p className="text-gray-600 mb-6 flex-grow">{category.description}</p>
                    <div className="text-primary-600 font-medium flex items-center transition-all group-hover:translate-x-1">
                      Shop Now <ArrowRight className="ml-1 h-4 w-4" />
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-20 px-4 bg-primary-50">
        <div className="max-w-5xl mx-auto text-center">
          <div className="inline-block px-3 py-1 bg-primary-100 text-primary-600 rounded-full text-sm font-medium mb-4">
            Stay Updated
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Join Our Anime Community</h2>
          <p className="text-gray-600 max-w-2xl mx-auto mb-8">
            Subscribe to our newsletter for exclusive drops, special offers, and anime news. Be the first to know when new merchandise arrives!
          </p>
          <div className="max-w-md mx-auto flex flex-col sm:flex-row gap-3">
            <input
              type="email"
              placeholder="Your email address"
              className="flex-grow bg-white border border-gray-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary-600 focus:border-transparent"
            />
            <Button className="bg-primary-600 hover:bg-primary-700 transition-colors">
              Subscribe
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
