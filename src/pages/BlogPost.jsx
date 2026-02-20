import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Clock } from "lucide-react";
import { blogPosts } from "../data/blogPosts";

export default function BlogPost() {
  const { id } = useParams();
  const post = blogPosts.find((p) => p.id === parseInt(id));

  if (!post) {
    return (
      <div className="pt-24 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-2xl text-gray-400 mb-4">Post not found</p>
          <Link to="/blog" className="text-leaf hover:underline">← Back to Blog</Link>
        </div>
      </div>
    );
  }

  // Parse markdown-like bold text
  const parseContent = (content) => {
    return content.split("\n").map((line, i) => {
      if (line.startsWith("**") && line.endsWith("**")) {
        return (
          <h3 key={i} className="font-bold text-gray-800 text-lg mt-6 mb-2">
            {line.replace(/\*\*/g, "")}
          </h3>
        );
      }
      if (line.startsWith("→")) {
        return (
          <div key={i} className="bg-green-50 border border-green-200 rounded-lg p-3 my-2 text-green-800 text-sm">
            {line}
          </div>
        );
      }
      if (line.startsWith("- ")) {
        return (
          <li key={i} className="text-gray-600 ml-4 mb-1">
            {line.substring(2)}
          </li>
        );
      }
      if (line.trim() === "") return <br key={i} />;
      // Handle inline bold
      const parts = line.split(/\*\*(.*?)\*\*/g);
      return (
        <p key={i} className="text-gray-600 leading-relaxed mb-2">
          {parts.map((part, j) => j % 2 === 1 ? <strong key={j}>{part}</strong> : part)}
        </p>
      );
    });
  };

  const others = blogPosts.filter((p) => p.id !== post.id).slice(0, 3);

  return (
    <div className="pt-16 min-h-screen bg-cream">
      {/* Hero */}
      <div className={`bg-gradient-to-br ${post.color} py-16 px-4`}>
        <div className="max-w-3xl mx-auto">
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 text-white/70 hover:text-white text-sm mb-6 transition-colors"
          >
            <ArrowLeft size={16} /> Back to Blog
          </Link>
          <span className="text-5xl block mb-3">{post.emoji}</span>
          <div className="inline-block bg-white/20 text-white text-xs px-3 py-1 rounded-full mb-3">
            {post.category}
          </div>
          <h1 className="font-display text-4xl sm:text-5xl font-black text-white mb-4 leading-tight">
            {post.title}
          </h1>
          <div className="flex items-center gap-4 text-white/70 text-sm">
            <span>{post.date}</span>
            <span className="flex items-center gap-1">
              <Clock size={12} />
              {post.readTime}
            </span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
          {parseContent(post.content)}
        </div>

        {/* Disclaimer */}
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mt-6">
          <p className="text-amber-800 text-xs leading-relaxed">
            <strong>⚠️ Educational Content Only:</strong> This article is for informational purposes and does not constitute medical advice. Consult a qualified healthcare professional before making changes to your diet or supplement regimen.
          </p>
        </div>

        {/* More Articles */}
        <div className="mt-10">
          <h3 className="font-display text-2xl font-bold text-deep mb-4">More Articles</h3>
          <div className="grid sm:grid-cols-3 gap-4">
            {others.map((p) => (
              <Link
                key={p.id}
                to={`/blog/${p.id}`}
                className="group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all border border-gray-100"
              >
                <div className={`bg-gradient-to-br ${p.color} p-4`}>
                  <span className="text-2xl">{p.emoji}</span>
                </div>
                <div className="p-3">
                  <p className="text-xs font-semibold text-gray-700 group-hover:text-leaf transition-colors line-clamp-2">
                    {p.title}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
