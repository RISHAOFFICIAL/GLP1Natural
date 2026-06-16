export function getAmazonAffiliateLink(ingredient: string): string {
  const affiliateCode = 'glp1natural-20'; // Placeholder affiliate code
  const query = encodeURIComponent(ingredient);
  return `https://www.amazon.com/s?k=${query}&tag=${affiliateCode}`;
}
