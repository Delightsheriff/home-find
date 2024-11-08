import { Mail, Phone, MapPin } from "lucide-react";

export const metadata = {
  title: "Contact Us | NestQuest",
  description: "Reach out to us for assistance",
};

export default function Page() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Contact Us</h1>
      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <p className="mb-4">
            We&apos;re here to help you with all your real estate needs. Feel
            free to reach out to us using any of the methods below:
          </p>
          <div className="space-y-4">
            <div className="flex items-center">
              <Phone className="mr-2" />
              <span>(555) 123-4567</span>
            </div>
            <div className="flex items-center">
              <Mail className="mr-2" />
              <span>info@dreamhomerealty.com</span>
            </div>
            <div className="flex items-center">
              <MapPin className="mr-2" />
              <span>123 Main St, Anytown, USA 12345</span>
            </div>
          </div>
          <div className="mt-6">
            <h2 className="text-xl font-semibold mb-2">Office Hours</h2>
            <p>Monday - Friday: 9:00 AM - 6:00 PM</p>
            <p>Saturday: 10:00 AM - 4:00 PM</p>
            <p>Sunday: Closed</p>
          </div>
        </div>
        <div>
          <form className="space-y-4">
            <div>
              <label htmlFor="name" className="block mb-1">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                className="w-full px-3 py-2 border rounded-lg"
                required
              />
            </div>
            <div>
              <label htmlFor="email" className="block mb-1">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="w-full px-3 py-2 border rounded-lg"
                required
              />
            </div>
            <div>
              <label htmlFor="message" className="block mb-1">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                rows={4}
                className="w-full px-3 py-2 border rounded-lg"
                required
              ></textarea>
            </div>
            <button
              type="submit"
              className="btn-primary text-white px-6 py-2 rounded-lg transition-colors"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
