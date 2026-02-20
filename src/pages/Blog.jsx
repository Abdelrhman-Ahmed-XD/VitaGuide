import { Link } from "react-router-dom";
import { Clock, ArrowRight } from "lucide-react";
import { blogPosts } from "../data/blogPosts";

export default function Blog() {
  const [featured, ...rest] = blogPosts;

  return (
    <div className="pt-20 min-h-screen bg-cream">
      {/* Header */}
      <div className="bg-gradient-to-br from-deep to-[#0f3460] py-16 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="font-display text-5xl font-black text-white mb-4">
            Health Blog
          </h1>
          <p className="text-gray-300 text-lg">
            Deep-dive articles on vitamins, nutrition science, and practical health guidance.
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12">
        {/* Featured Post */}
        <Link
          to={`/blog/${featured.id}`}
          className="group block bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 mb-8 border border-gray-100"
        >
          <div className={`bg-gradient-to-br ${featured.color} p-10`}>
            <span className="text-5xl block mb-3">{featured.emoji}</span>
            <div className="inline-block bg-white/20 text-white text-xs px-3 py-1 rounded-full mb-3">
              {featured.category}
            </div>
            <h2 className="font-display text-3xl font-bold text-white mb-2">
              {featured.title}
            </h2>
            <p className="text-white/80 text-lg">{featured.excerpt}</p>
          </div>
          <div className="p-6 flex items-center justify-between">
            <div className="flex items-center gap-4 text-gray-400 text-sm">
              <span>{featured.date}</span>
              <span className="flex items-center gap-1">
                <Clock size={12} />
                {featured.readTime}
              </span>
            </div>
            <span className="text-leaf font-medium text-sm flex items-center gap-1 group-hover:gap-2 transition-all">
              Read Article <ArrowRight size={16} />
            </span>
          </div>
        </Link>

        {/* Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {rest.map((post) => (
            <Link
              key={post.id}
              to={`/blog/${post.id}`}
              className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5 border border-gray-100"
            >
              <div className={`bg-gradient-to-br ${post.color} p-6`}>
                <span className="text-3xl block mb-2">{post.emoji}</span>
                <div className="inline-block bg-white/20 text-white text-xs px-2 py-0.5 rounded-full">
                  {post.category}
                </div>
              </div>
              <div className="p-5">
                <h3 className="font-bold text-gray-800 mb-2 group-hover:text-leaf transition-colors text-sm leading-snug">
                  {post.title}
                </h3>
                <p className="text-gray-500 text-xs leading-relaxed mb-3 line-clamp-2">{post.excerpt}</p>
                <div className="flex items-center gap-3 text-gray-400 text-xs">
                  <span>{post.date}</span>
                  <span className="flex items-center gap-1">
                    <Clock size={10} />
                    {post.readTime}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
