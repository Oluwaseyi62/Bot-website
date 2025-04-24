import React from 'react';
import Button from '../components/ui/Button';
import { Link } from 'react-router-dom';

const About: React.FC = () => {
  return (
    <div className="pt-20 pb-16">
      {/* Hero Section */}
      <section 
        className="relative h-80 flex items-center justify-center bg-cover bg-center"
        style={{ backgroundImage: 'url(https://images.pexels.com/photos/4820740/pexels-photo-4820740.jpeg)' }}
      >
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="relative z-10 text-center text-white px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">About Us</h1>
          <p className="text-xl max-w-2xl mx-auto">
            Creating fashion that defines trends and celebrates individuality
          </p>
        </div>
      </section>

      {/* Founder Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="flex flex-col md:flex-row gap-8 items-center mb-12">
            <div className="md:w-1/2">
              <img 
                src="https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg" 
                alt="Emma Thompson - Founder" 
                className="rounded-lg shadow-lg w-full"
              />
            </div>
            <div className="md:w-1/2">
              <h2 className="text-3xl font-bold mb-4">Meet Our Founder</h2>
              <h3 className="text-xl font-semibold mb-2">Emma Thompson</h3>
              <p className="text-gray-700 mb-4">
                A visionary fashion designer with over 15 years of experience in the industry, Emma Thompson founded BANG ON TREND in 2018 with a mission to redefine contemporary fashion. Her journey began in her small apartment studio, where she crafted unique pieces that would later become the foundation of our brand.
              </p>
              <p className="text-gray-700">
                Emma's design philosophy combines bold aesthetics with practical wearability, creating pieces that empower individuals to express their unique style. Her work has been featured in leading fashion publications and worn by style influencers worldwide.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Brand Story */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-3xl font-bold text-center mb-8">Our Story</h2>
          
          <div className="flex flex-col md:flex-row gap-8 mb-12">
            <div className="md:w-1/2">
              <h3 className="text-xl font-semibold mb-4">The Beginning</h3>
              <p className="text-gray-700 mb-4">
                What started as Emma's passion project in 2018 quickly evolved into a movement. The first collection, featuring just 12 statement pieces, sold out within weeks of launch. This overwhelming response confirmed our belief that fashion enthusiasts were hungry for designs that didn't just follow trends but defined them.
              </p>
              <p className="text-gray-700">
                Today, BANG ON TREND has grown into a respected name in contemporary fashion, with our pieces being shipped to style-conscious customers worldwide.
              </p>
            </div>
            
            <div className="md:w-1/2">
              <h3 className="text-xl font-semibold mb-4">Our Philosophy</h3>
              <p className="text-gray-700 mb-4">
                At BANG ON TREND, we believe that fashion is more than just clothing—it's a powerful form of self-expression. Our designs blend timeless elements with forward-thinking details, creating pieces that feel both familiar and fresh.
              </p>
              <p className="text-gray-700">
                We're committed to responsible production practices and work closely with ethical manufacturers to ensure our fashion doesn't come at the expense of people or the planet.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-3xl font-bold text-center mb-12">Our Values</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-sm text-center">
              <h3 className="text-xl font-semibold mb-4">Quality</h3>
              <p className="text-gray-700">
                We're committed to creating pieces that aren't just beautiful but built to last, using premium materials and meticulous attention to detail.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm text-center">
              <h3 className="text-xl font-semibold mb-4">Innovation</h3>
              <p className="text-gray-700">
                We constantly push boundaries to create designs that feel fresh and exciting, while maintaining a timeless quality that transcends seasons.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm text-center">
              <h3 className="text-xl font-semibold mb-4">Inclusivity</h3>
              <p className="text-gray-700">
                We believe fashion should be for everyone. Our collections are designed to empower individuals of all backgrounds to express their unique style.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-black text-white">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl font-bold mb-4">Experience Our Latest Collection</h2>
          <p className="text-lg mb-8">
            Discover pieces that reflect your unique style and personality.
          </p>
          <Link to="/shop">
            <Button>Shop Now</Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default About;