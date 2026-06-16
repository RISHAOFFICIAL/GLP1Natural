"use client";

import { useEffect, useState } from "react";

interface AdBannerProps {
  slot: string;
  format?: "auto" | "fluid" | "rectangle";
  className?: string;
}

export default function AdBanner({ slot, format = "auto", className = "" }: AdBannerProps) {
  const [isPremium, setIsPremium] = useState<boolean | null>(null);

  useEffect(() => {
    async function checkPremium() {
      try {
        const res = await fetch("/api/user/profile");
        if (res.ok) {
          const profile = await res.json();
          // Mock logic: check is_premium flag
          setIsPremium(profile.is_premium || false);
        } else {
          // If unauthorized or error, assume free user
          setIsPremium(false);
        }
      } catch (err) {
        console.error("Failed to check premium status:", err);
        setIsPremium(false);
      }
    }
    checkPremium();
  }, []);

  useEffect(() => {
    // Only push if not premium and on client side
    if (isPremium === false && typeof window !== "undefined") {
      try {
        // @ts-ignore
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      } catch (err) {
        console.error("AdSense push error:", err);
      }
    }
  }, [isPremium]);

  // Don't render anything while loading or if user is premium
  if (isPremium === null || isPremium === true) {
    return null;
  }

  return (
    <div className={`relative my-6 overflow-hidden rounded-xl bg-sage/5 flex flex-col items-center justify-center min-h-[120px] border border-sage/10 ${className}`}>
      <div className="absolute top-2 left-3 text-[9px] text-sage/40 uppercase tracking-[0.2em] font-medium pointer-events-none">
        Sponsored Content
      </div>
      
      <div className="w-full h-full flex items-center justify-center py-6 px-4">
        {/* AdSense ins tag */}
        <ins
          className="adsbygoogle"
          style={{ display: "block", width: "100%", textAlign: "center" }}
          data-ad-client={process.env.NEXT_PUBLIC_ADSENSE_PUB_ID || "ca-pub-placeholder"}
          data-ad-slot={slot}
          data-ad-format={format}
          data-full-width-responsive="true"
        />
      </div>

      {/* Decorative corners to maintain premium aesthetic */}
      <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-gold/20" />
      <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-gold/20" />
      <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-gold/20" />
      <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-gold/20" />
    </div>
  );
}
