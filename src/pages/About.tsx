import React from 'react';
import Button from '../components/ui/Button';
import { Link } from 'react-router-dom';

const About: React.FC = () => {
  return (
    <div className="pt-20 pb-16">
      {/* Hero Section */}
      <section 
        className="relative flex items-center justify-center bg-center bg-cover h-80"
        style={{ backgroundImage: `url('/images/Artboard 11.jpg')` }}
      >
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="relative z-10 px-4 text-center text-white">
          <h1 className="mb-4 text-4xl font-bold md:text-5xl">About Us</h1>
          <p className="max-w-2xl mx-auto text-xl">
            Creating fashion that defines trends and celebrates individuality
          </p>
        </div>
      </section>

      {/* Founder Section */}
      <section className="px-4 py-16">
        <div className="container max-w-4xl mx-auto">
          <div className="flex flex-col items-center gap-8 mb-12 md:flex-row">
            <div className="md:w-1/2">
              <img 
                src="./images/bot8.jpg" 
                alt="Oluwaferanmi Famawode - Founder" 
                className="w-full rounded-lg shadow-lg"
              />
            </div>
            <div className="md:w-1/2">
              <h2 className="mb-4 text-3xl font-bold">Meet Our Founder</h2>
              <h3 className="mb-2 text-xl font-semibold">Oluwaferanmi Famawode</h3>
              <p className="mb-4 text-gray-700">
                A visionary fashion designer with over 15 years of experience in the industry, Oluwaferanmi Famawode founded ZYNTH in 2018 with a mission to redefine contemporary fashion. His journey began in his small apartment studio, where he crafted unique pieces that would later become the foundation of our brand.
              </p>
              <p className="text-gray-700">
                Oluwaferanmi's design philosophy combines bold aesthetics with practical wearability, creating pieces that empower individuals to express their unique style. His work has been featured in leading fashion publications and worn by style influencers worldwide.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Brand Story */}
      <section className="px-4 py-16 bg-gray-50">
        <div className="container max-w-4xl mx-auto">
          <h2 className="mb-8 text-3xl font-bold text-center">Our Story</h2>
          
          <div className="flex flex-col gap-8 mb-12 md:flex-row">
            <div className="md:w-1/2">
              <h3 className="mb-4 text-xl font-semibold">The Beginning</h3>
              <p className="mb-4 text-gray-700">
                What started as Oluwaferanmi's passion project in 2018 quickly evolved into a movement. The first collection, featuring just 12 statement pieces, sold out within weeks of launch. This overwhelming response confirmed our belief that fashion enthusiasts were hungry for designs that didn't just follow trends but defined them.
              </p>
              <p className="text-gray-700">
                Today, ZYNTH has grown into a respected name in contemporary fashion, with our pieces being shipped to style-conscious customers worldwide.
              </p>
            </div>
            
            <div className="md:w-1/2">
              <h3 className="mb-4 text-xl font-semibold">Our Philosophy</h3>
              <p className="mb-4 text-gray-700">
                At ZYNTH, we believe that fashion is more than just clothing—it's a powerful form of self-expression. Our designs blend timeless elements with forward-thinking details, creating pieces that feel both familiar and fresh.
              </p>
              <p className="text-gray-700">
                We're committed to responsible production practices and work closely with ethical manufacturers to ensure our fashion doesn't come at the expense of people or the planet.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="px-4 py-16">
        <div className="container max-w-4xl mx-auto">
          <h2 className="mb-12 text-3xl font-bold text-center">Our Values</h2>
          
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            <div className="p-6 text-center bg-white rounded-lg shadow-sm">
              <h3 className="mb-4 text-xl font-semibold">Quality</h3>
              <p className="text-gray-700">
                We're committed to creating pieces that aren't just beautiful but built to last, using premium materials and meticulous attention to detail.
              </p>
            </div>
            
            <div className="p-6 text-center bg-white rounded-lg shadow-sm">
              <h3 className="mb-4 text-xl font-semibold">Innovation</h3>
              <p className="text-gray-700">
                We constantly push boundaries to create designs that feel fresh and exciting, while maintaining a timeless quality that transcends seasons.
              </p>
            </div>
            
            <div className="p-6 text-center bg-white rounded-lg shadow-sm">
              <h3 className="mb-4 text-xl font-semibold">Inclusivity</h3>
              <p className="text-gray-700">
                We believe fashion should be for everyone. Our collections are designed to empower individuals of all backgrounds to express their unique style.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-4 py-16 text-white bg-black">
        <div className="container max-w-4xl mx-auto text-center">
          <h2 className="mb-4 text-3xl font-bold">Experience Our Latest Collection</h2>
          <p className="mb-8 text-lg">
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