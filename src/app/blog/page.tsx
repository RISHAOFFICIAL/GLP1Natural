import Link from 'next/link';
import { BLOG_POSTS } from '@/lib/blog-data';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Metabolic Authority Blog | GLP·1 Natural',
  description: 'Learn the science of natural GLP-1 stimulation, food sequencing, and metabolic health from our expert guides.',
};

export default function BlogIndex() {
  return (
    <div className="min-h-screen bg-white">
      <header className="px-4 md:px-6 py-12 md:py-20 bg-cream/30 text-center border-b border-border/50">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold text-forest mb-6">
            Metabolic <span className="italic text-gold font-serif">Authority</span>
          </h1>
          <p className="text-lg md:text-xl text-mid max-w-2xl mx-auto leading-relaxed">
            Science-backed guides to naturally stimulating your GLP-1 production and reclaiming your metabolic health.
          </p>
        </div>
      </header>

      <main className="px-4 md:px-6 py-16 md:py-24 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {BLOG_POSTS.map((post) => (
            <Link 
              key={post.slug} 
              href={`/blog/${post.slug}`}
              className="group flex flex-col bg-white border border-border/50 rounded-[2rem] overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              <div className="aspect-[16/10] bg-sage-pale/30 flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-sage/5 to-gold/5" />
                <span className="text-4xl group-hover:scale-110 transition-transform duration-500">
                  {post.slug.includes('food') ? '🥗' : post.slug.includes('score') ? '📈' : post.slug.includes('flexibility') ? '⚡' : '🌿'}
                </span>
                <div className="absolute top-4 left-4 bg-white/80 backdrop-blur-sm px-3 py-1 rounded-full border border-sage/20">
                  <span className="text-[10px] font-bold text-sage uppercase tracking-widest">{post.category}</span>
                </div>
              </div>
              
              <div className="p-8 flex-1 flex flex-col">
                <div className="text-[10px] font-mono text-mid uppercase tracking-widest mb-3">{post.date}</div>
                <h2 className="text-xl font-bold text-forest mb-4 group-hover:text-gold transition-colors leading-tight">
                  {post.title}
                </h2>
                <p className="text-sm text-mid line-clamp-3 mb-6 leading-relaxed">
                  {post.metaDescription}
                </p>
                <div className="mt-auto pt-6 border-t border-border/30 flex items-center justify-between">
                  <span className="text-xs font-bold text-forest uppercase tracking-widest group-hover:translate-x-1 transition-transform inline-flex items-center gap-2">
                    Read Guide <span className="text-gold">→</span>
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </main>

      <footer className="px-6 py-16 border-t border-border/30 text-center bg-cream/10">
        <Link href="/" className="text-xl font-bold text-forest tracking-tight inline-block mb-4">
          GLP<span className="text-gold">·</span>1 Natural
        </Link>
        <p className="text-xs font-mono text-mid uppercase tracking-widest">
          The Future of Metabolic Health is Natural.
        </p>
      </footer>
    </div>
  );
}
