"use client";

import { cn } from "@/lib/utils";
import { appConfig } from "@root/project.config";
import { usePathname } from "next/navigation";
import React, { useEffect, useId, useRef } from "react";
import "./adsense.css";

const adsTypes = {
  "display-horizontal": {
    adSlot: "6712325533",
    adFormat: "auto",
  },
  "display-square": {
    adSlot: "3535390051",
    adFormat: "auto",
  },
  "display-vertical": {
    adSlot: "9374040095",
    adFormat: "auto",
  },
  multiplex_vertical: {
    adSlot: "9146917182",
    adFormat: "autorelaxed",
  },
  multiplex_horizontal: {
    adSlot: "9716110433",
    adFormat: "autorelaxed",
  },
  "in_article": {
    adSlot: "7833835515",
    adFormat: "autorelaxed",
  },
  "in_feed": {
    adSlot: "7760865085",
    adFormat: "autorelaxed",
  },
} as const;


declare global {
  interface Window {
    adsbygoogle: { [key: string]: unknown }[]
  }
}
interface AdUnitProps {
  adSlot: keyof typeof adsTypes;
  className?: string;
}

const AdUnit: React.FC<AdUnitProps> = ({ adSlot, className }) => {
  const adsProps = adsTypes[adSlot];
  const id = useId();
  const pathname = usePathname();
  const adRef = useRef<HTMLModElement>(null);

  useEffect(() => {
    try {
      if(process.env.NEXT_PUBLIC_ENV !== "production") return;
      if (typeof window !== "undefined") {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      }
    } catch (e) {
      console.error("Adsense error:", e);
      adRef.current?.classList.add("error");
    }
  }, [pathname, adSlot]); // refresh ad when route or slot changes

  return (
    <div className={cn("adsense-container empty:hidden", className)} id={`adsense-${id}`}>
      <ins
        key={id}
        id={`adsbygoogle-${id}`}
        ref={adRef}
        className="adsbygoogle"
        style={{ display: "block" }}
        data-ad-client={appConfig.verifications.google_adsense}
        data-ad-slot={adsProps.adSlot}
        data-ad-format={adsProps.adFormat}
        data-full-width-responsive="true"
      />
    </div>
  );
};

export default AdUnit;
