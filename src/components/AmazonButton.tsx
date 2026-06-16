import { ShoppingCart } from 'lucide-react';
import { getAmazonAffiliateLink } from '@/lib/amazon';

interface AmazonButtonProps {
  ingredient: string;
  className?: string;
}

export default function AmazonButton({ ingredient, className }: AmazonButtonProps) {
  const link = getAmazonAffiliateLink(ingredient);
  
  return (
    <a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center gap-2 bg-forest text-white px-4 py-2 rounded-xl text-xs font-bold hover:bg-forest/90 transition-colors shadow-sm ${className}`}
    >
      <ShoppingCart className="w-3 h-3" />
      Buy {ingredient}
    </a>
  );
}
