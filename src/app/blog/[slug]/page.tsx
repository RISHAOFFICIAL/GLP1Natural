import { BLOG_POSTS, BlogPost } from '@/lib/blog-data';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Sparkles, ChevronLeft, ArrowRight, CheckCircle2 } from 'lucide-react';
import { Metadata } from 'next';

interface Props {
  params: { slug: string };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = BLOG_POSTS.find((p) => p.slug === params.slug);
  if (!post) return {};

  return {
    title: post.metaTitle,
    description: post.metaDescription,
    keywords: post.keyword,
  };
}

export default function BlogPostPage({ params }: Props) {
  const post = BLOG_POSTS.find((p) => p.slug === params.slug);
  if (!post) notFound();

  const relatedPosts = BLOG_POSTS.filter((p) => p.slug !== post.slug).slice(0, 3);

  // Simple markdown-to-JSX parser (handling only what we have in blog-data.ts)
  const renderContent = (content: string) => {
    return content.split('\n').map((line, i) => {
      if (line.startsWith('### ')) {
        return <h3 key={i} className="text-2xl font-bold text-forest mt-12 mb-4">{line.replace('### ', '')}</h3>;
      }
      if (line.startsWith('#### ')) {
        return <h4 key={i} className="text-xl font-bold text-forest mt-8 mb-3">{line.replace('#### ', '')}</h4>;
      }
      if (line.match(/^\d+\. /)) {
        return <p key={i} className="pl-6 mb-4 text-mid leading-relaxed relative"><span className="absolute left-0 font-bold text-gold">{line.split('.')[0]}.</span> {line.replace(/^\d+\. /, '')}</p>;
      }
      if (line.startsWith('- ')) {
        return <p key={i} className="pl-6 mb-3 text-mid leading-relaxed relative"><span className="absolute left-0 text-sage">•</span> {line.replace('- ', '')}</p>;
      }
      if (line.trim() === '') return <div key={i} className="h-4" />;
      
      // Inline formatting (links and bold)
      let text: any = line;
      if (line.includes('**') || line.includes('[')) {
        // This is a very crude parser, but enough for our curated content
        const parts = line.split(/(\*\*.*?\*\*|\[.*?\]\(.*?\))/g);
        text = parts.map((p, j) => {
          if (p.startsWith('**') && p.endsWith('**')) {
            return <strong key={j} className="text-forest font-bold">{p.slice(2, -2)}</strong>;
          }
          if (p.startsWith('[') && p.includes('](')) {
            const label = p.match(/\[(.*?)\]/)?.[1];
            const url = p.match(/\((.*?)\)/)?.[1];
            if (url?.startsWith('/')) {
              return <Link key={j} href={url} className="text-sage font-bold underline decoration-sage/30 hover:decoration-sage transition-all">{label}</Link>;
            }
            return <a key={j} href={url} target="_blank" rel="noopener noreferrer" className="text-sage font-bold underline decoration-sage/30 hover:decoration-sage transition-all">{label}</a>;
          }
          return p;
        });
      }

      return <p key={i} className="text-mid leading-relaxed mb-6 text-lg">{text}</p>;
    });
  };

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": post.title,
    "description": post.metaDescription,
    "datePublished": post.date,
    "author": {
      "@type": "Organization",
      "name": "GLP·1 Natural"
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://glp1natural.com/blog/${post.slug}`
    }
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": post.faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };

  return (
    <div className="min-h-screen bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      <nav className="px-4 md:px-6 py-4 border-b border-border/50 sticky top-0 bg-white/80 backdrop-blur-md z-50">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <Link href="/blog" className="flex items-center gap-2 text-xs font-bold text-mid hover:text-forest transition-colors uppercase tracking-widest">
            <ChevronLeft className="w-4 h-4" />
            Back to Blog
          </Link>
          <Link href="/" className="text-lg font-bold text-forest tracking-tight">
            GLP<span className="text-gold">·</span>1 Natural
          </Link>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 md:px-6 py-12 md:py-24 grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-16">
        <article>
          <div className="mb-12">
            <div className="text-xs font-bold text-gold uppercase tracking-[0.2em] mb-4">{post.category}</div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-forest leading-[1.1] mb-8">
              {post.title}
            </h1>
            <div className="flex items-center gap-4 text-sm text-mid border-y border-border/30 py-6">
              <div className="w-10 h-10 rounded-full bg-sage-pale flex items-center justify-center text-sage font-bold">GN</div>
              <div>
                <div className="font-bold text-forest">GLP·1 Natural Editorial Team</div>
                <div>Published on {post.date} · 8 min read</div>
              </div>
            </div>
          </div>

          <div className="prose prose-lg max-w-none">
            {renderContent(post.content)}

            {/* Mid-content CTA */}
            <div className="my-16 p-8 md:p-12 bg-forest rounded-[2.5rem] text-white relative overflow-hidden shadow-2xl">
              <div className="relative z-10">
                <div className="flex items-center gap-2 mb-6">
                  <Sparkles className="w-6 h-6 text-gold" />
                  <span className="text-xs font-bold uppercase tracking-[0.2em] text-gold">Free Metabolic Intelligence</span>
                </div>
                <h3 className="text-3xl md:text-4xl font-bold mb-6 leading-tight">
                  Ready to see your <br/> 
                  <span className="italic font-serif text-gold">GLP-1 Score?</span>
                </h3>
                <p className="text-lg text-white/80 mb-10 max-w-md">
                  Join 10,000+ people naturally stimulating their hunger hormones through the Eat-in-Order protocol.
                </p>
                <Link 
                  href="/"
                  className="inline-flex items-center gap-3 bg-gold text-forest font-bold px-10 py-5 rounded-2xl hover:bg-white hover:scale-105 transition-all shadow-lg"
                >
                  Start Your Free Trial <ArrowRight className="w-5 h-5" />
                </Link>
                <p className="mt-6 text-xs text-white/50 font-medium uppercase tracking-widest">
                  No credit card required · Instant Setup
                </p>
              </div>
              <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-white/5 rounded-full blur-3xl" />
            </div>

            {/* FAQs */}
            <div className="mt-20 pt-12 border-t border-border/50">
              <h3 className="text-3xl font-bold text-forest mb-8">Frequently Asked Questions</h3>
              <div className="space-y-6">
                {post.faqs.map((faq, i) => (
                  <div key={i} className="bg-cream/20 border border-border/30 p-8 rounded-3xl">
                    <h4 className="text-xl font-bold text-forest mb-3 flex items-start gap-3">
                      <span className="text-gold mt-1 font-serif italic text-2xl">Q.</span>
                      {faq.question}
                    </h4>
                    <p className="text-mid leading-relaxed pl-8">{faq.answer}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </article>

        <aside className="space-y-12">
          <div className="sticky top-24">
            <h4 className="text-xs font-bold text-forest uppercase tracking-[0.2em] mb-8 pb-4 border-b border-border/50 flex items-center justify-between">
              Related Guides
              <CheckCircle2 className="w-4 h-4 text-sage" />
            </h4>
            <div className="space-y-8">
              {relatedPosts.map((rp) => (
                <Link key={rp.slug} href={`/blog/${rp.slug}`} className="group block">
                  <div className="text-[10px] font-bold text-sage uppercase tracking-widest mb-2">{rp.category}</div>
                  <h5 className="font-bold text-forest group-hover:text-gold transition-colors leading-tight mb-2">
                    {rp.title}
                  </h5>
                  <div className="text-[10px] text-mid uppercase tracking-widest font-mono">{rp.date}</div>
                </Link>
              ))}
            </div>

            <div className="mt-16 p-8 bg-sage-pale/30 rounded-3xl border border-sage/10">
              <h4 className="font-bold text-forest mb-4">The Natural Protocol</h4>
              <p className="text-sm text-mid leading-relaxed mb-6">
                The GLP·1 Natural app helps you master the Eat-in-Order protocol with AI scanning and real-time guidance.
              </p>
              <Link 
                href="/metabolic-health"
                className="text-xs font-bold text-sage uppercase tracking-widest flex items-center gap-2 hover:gap-3 transition-all"
              >
                Learn More <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
          </div>
        </aside>
      </main>

      <footer className="px-6 py-16 border-t border-border/30 text-center bg-cream/10">
        <p className="text-xs font-mono text-mid uppercase tracking-widest">
          Built by GLP·1 Natural · Empowering you naturally.
        </p>
      </footer>
    </div>
  );
}

export async function generateStaticParams() {
  return BLOG_POSTS.map((post) => ({
    slug: post.slug,
  }));
}
