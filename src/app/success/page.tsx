import Link from 'next/link';
import { CheckCircle } from 'lucide-react';

export default function SuccessPage() {
  return (
    <div className="min-h-screen bg-cream flex items-center justify-center p-6">
      <div className="max-w-md w-full bg-white rounded-[3rem] p-12 text-center shadow-xl border border-gold/20">
        <div className="w-20 h-20 bg-sage/10 rounded-full flex items-center justify-center mx-auto mb-8">
          <CheckCircle className="w-10 h-10 text-sage" />
        </div>
        
        <h1 className="text-3xl font-bold text-forest mb-4">Welcome to Premium!</h1>
        <p className="text-mid mb-10 leading-relaxed">
          Your account has been upgraded. You now have full access to all AI features and an ad-free experience.
        </p>
        
        <Link 
          href="/"
          className="inline-block bg-forest text-cream font-bold px-10 py-4 rounded-2xl hover:bg-forest/90 transition-all"
        >
          Return Home
        </Link>
        
        <p className="mt-8 text-[10px] font-mono text-mid uppercase tracking-widest">
          Transaction Successful · GLP·1 Natural
        </p>
      </div>
    </div>
  );
}
