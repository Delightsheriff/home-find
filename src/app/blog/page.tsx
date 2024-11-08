import Link from "next/link";
import { Calendar } from "lucide-react";

export const metadata = {
  title: "Blog | NestQuest",
  description: "Our blog",
};

export default function Page() {
  const blogPosts = [
    {
      id: 1,
      title: "5 Tips for First-Time Home Buyers",
      excerpt:
        "Buying your first home can be exciting and overwhelming. Here are five essential tips to help you navigate the process.",
      date: "2023-05-15",
    },
    {
      id: 2,
      title: "Understanding the Current Real Estate Market Trends",
      excerpt:
        "Stay informed about the latest trends in the real estate market and how they might affect your buying or selling decisions.",
      date: "2023-05-08",
    },
    {
      id: 3,
      title: "How to Stage Your Home for a Quick Sale",
      excerpt:
        "Learn the secrets of home staging that can help you sell your property faster and potentially increase its value.",
      date: "2023-05-01",
    },
  ];

  return (
    <div className="w-full bg-deep_orange-50">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Real Estate Blog</h1>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post) => (
            <div
              key={post.id}
              className="border rounded-lg overflow-hidden shadow-md bg-white-A700"
            >
              <div className="p-6 ">
                <h2 className="text-xl font-semibold mb-2">{post.title}</h2>
                <p className="text-gray-600 mb-4">{post.excerpt}</p>
                <div className="flex items-center text-sm text-gray-500 mb-4">
                  <Calendar className="mr-2" size={16} />
                  <span>{post.date}</span>
                </div>
                <Link
                  href={`/blog/${post.id}`}
                  className="text-blue-600 hover:text-blue-800 transition-colors"
                >
                  Read More →
                </Link>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-8 text-center">
          <Link
            href="/blog"
            className="inline-block btn-primary text-white px-6 py-2 rounded-lg  transition-colors"
          >
            View All Posts
          </Link>
        </div>
      </div>
    </div>
  );
}
