import React from 'react';
import Button from '../components/ui/Button';
import { Instagram, Facebook, Twitter, Mail, Phone, MapPin } from 'lucide-react';

const Contact: React.FC = () => {
  return (
    <div className="pt-20 pb-16">
      {/* Hero Section */}
      <section 
        className="relative flex items-center justify-center bg-center bg-cover h-80"
        style={{ backgroundImage: 'url(https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg)' }}
      >
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="relative z-10 px-4 text-center text-white">
          <h1 className="mb-4 text-4xl font-bold md:text-5xl">Get In Touch</h1>
          <p className="max-w-2xl mx-auto text-xl">
            We'd love to hear from you. Reach out to us with any questions or feedback.
          </p>
        </div>
      </section>

      {/* Contact Information */}
      <section className="px-4 py-16">
        <div className="container max-w-4xl mx-auto">
          <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
            <div>
              <div className="flex items-start mb-6">
                <Mail className="mr-4 text-black" />
                <div>
                  <h3 className="mb-1 text-lg font-medium">Email Us</h3>
                  <p className="text-gray-700">info@zynth.com</p>
                  <p className="text-gray-700">support@zynth.com</p>
                </div>
              </div>
              
              <div className="flex items-start mb-6">
                <Phone className="mr-4 text-black" />
                <div>
                  <h3 className="mb-1 text-lg font-medium">Call Us</h3>
                  <p className="text-gray-700">+234 906 629 3147</p>
                  <p className="text-gray-700">Mon-Fri: 9am - 6pm</p>
                </div>
              </div>
              
              <div className="flex items-start mb-6">
                <MapPin className="mr-4 text-black" />
                <div>
                  <h3 className="mb-1 text-lg font-medium">Visit Us</h3>
                  <p className="text-gray-700">
                    123 Fashion Street
                    <br />
                    Style City, SC 12345
                  </p>
                </div>
              </div>
              
              <div className="mt-8">
                <h3 className="mb-3 text-lg font-medium">Follow Us</h3>
                <div className="flex space-x-4">
                  <a href="https://www.instagram.com/botrend__" className="text-black transition-colors hover:text-gray-700" aria-label="Instagram">
                    <Instagram size={24} />
                  </a>
                  <a href="https://facebook.com" className="text-black transition-colors hover:text-gray-700" aria-label="Facebook">
                    <Facebook size={24} />
                  </a>
                  <a href="https://twitter.com" className="text-black transition-colors hover:text-gray-700" aria-label="Twitter">
                    <Twitter size={24} />
                  </a>
                </div>
              </div>
            </div>
            
            <div className="p-6 rounded-lg bg-gray-50">
              <h3 className="mb-4 text-xl font-semibold">Send Us a Message</h3>
              <form>
                <div className="mb-4">
                  <label htmlFor="name" className="block mb-1 text-sm font-medium text-gray-700">
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-black"
                  />
                </div>
                
                <div className="mb-4">
                  <label htmlFor="email" className="block mb-1 text-sm font-medium text-gray-700">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-black"
                  />
                </div>
                
                <div className="mb-4">
                  <label htmlFor="message" className="block mb-1 text-sm font-medium text-gray-700">
                    Message
                  </label>
                  <textarea
                    id="message"
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-black"
                  ></textarea>
                </div>
                
                <Button type="submit" fullWidth>Send Message</Button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      
    </div>
  );
};

export default Contact;