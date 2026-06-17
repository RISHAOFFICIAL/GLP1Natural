export function getAmazonAffiliateLink(ingredient: string): string {
  const affiliateCode = process.env.NEXT_PUBLIC_AMAZON_AFFILIATE_ID || 'glp1natural-20';
  const query = encodeURIComponent(ingredient);
  // Search within Amazon Fresh if possible, otherwise general search
  return `https://www.amazon.com/s?k=${query}&i=amazonfresh&tag=${affiliateCode}`;
}

/**
 * Generates a link to Amazon with multiple ingredients.
 * Since a true "multi-item cart" requires ASINs and PAAPI,
 * this POC uses a consolidated search query which is the most reliable
 * deep-linking method for generic ingredients.
 */
export function generateGroceryCartLink(ingredients: string[]): string {
  if (ingredients.length === 0) return 'https://www.amazon.com/fresh';
  
  const affiliateCode = process.env.NEXT_PUBLIC_AMAZON_AFFILIATE_ID || 'glp1natural-20';
  const query = encodeURIComponent(ingredients.join(' '));
  return `https://www.amazon.com/s?k=${query}&i=amazonfresh&tag=${affiliateCode}`;
}
