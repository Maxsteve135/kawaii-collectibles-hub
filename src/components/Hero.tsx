import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
const Hero = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!heroRef.current) return;
      const {
        clientX,
        clientY
      } = e;
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;
      const posX = (clientX - centerX) / centerX;
      const posY = (clientY - centerY) / centerY;
      const overlayElement = heroRef.current.querySelector('.hero-overlay') as HTMLElement;
      const imageElement = heroRef.current.querySelector('.hero-image') as HTMLElement;
      const contentElement = heroRef.current.querySelector('.hero-content') as HTMLElement;
      if (overlayElement && imageElement && contentElement) {
        // Subtle parallax effect
        imageElement.style.transform = `translate(${posX * -10}px, ${posY * -10}px) scale(1.05)`;
        overlayElement.style.opacity = `${0.4 - (Math.abs(posX) + Math.abs(posY)) * 0.05}`;
        contentElement.style.transform = `translate(${posX * 5}px, ${posY * 5}px)`;
      }
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);
  return <div ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 overflow-hidden">
        <img src="https://images.unsplash.com/photo-1565204310168-501404c04cec?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxyYW5kb218MHx8YW5pbWV8fHx8fHwxNjk0MTAzMTM0&ixlib=rb-4.0.3&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=1080" alt="Anime Collectibles" className="hero-image w-full h-full object-cover transition-transform duration-300 ease-out" />
        <div className="hero-overlay absolute inset-0 bg-gradient-to-r from-primary-900/90 to-primary-600/70 mix-blend-multiply transition-opacity duration-300"></div>
      </div>

      {/* Content */}
      <div className="hero-content relative z-10 text-white text-center max-w-5xl px-4 transition-transform duration-300 ease-out">
        <div className="animate-fade-in">
          <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold mb-4 leading-tight">
            Your Anime Universe <br />
            <span className="text-secondary-200">Collectibles & More</span>
          </h1>
          
          <p className="text-lg md:text-xl max-w-2xl mx-auto mb-8 text-white/90">
            Discover premium anime merchandise - from eye-catching posters 
            to collectible figures that bring your favorite characters to life.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
            <Link to="/shop">
              <Button className="rounded-full bg-white text-primary-600 hover:bg-white/90 hover:scale-105 transition-all px-8 py-6 text-lg shadow-lg">
                Explore Shop
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link to="/shop?category=figure">
              <Button variant="outline" className="rounded-full border-white text-white transition-all px-8 py-6 text-lg bg-cyan-300 hover:bg-cyan-200">
                View Figures
              </Button>
            </Link>
          </div>
        </div>
      </div>
      
      {/* Floating decorative elements */}
      <div className="absolute -left-20 top-1/4 w-40 h-40 bg-secondary-200/10 rounded-full filter blur-3xl animate-float"></div>
      <div className="absolute right-20 top-1/3 w-60 h-60 bg-primary-100/10 rounded-full filter blur-3xl animate-float" style={{
      animationDelay: '1s'
    }}></div>
      <div className="absolute bottom-10 left-1/3 w-40 h-40 bg-primary-700/10 rounded-full filter blur-3xl animate-float" style={{
      animationDelay: '2s'
    }}></div>
    </div>;
};
export default Hero;