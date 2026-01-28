import React, { useEffect, useRef } from "react";

export default function TurnstileWidget({ onVerify, onError, onExpire }) {
  const containerRef = useRef(null);
  const widgetIdRef = useRef(null);
  const isLoadingRef = useRef(false);

  useEffect(() => {
    if (isLoadingRef.current) return;
    isLoadingRef.current = true;

    const renderTurnstile = () => {
      if (!containerRef.current) return;

      if (widgetIdRef.current !== null) {
        console.log("⚠️ Turnstile already rendered, skipping...");
        return;
      }

      if (window.turnstile) {
        try {
          console.log("✅ Rendering Cloudflare Turnstile...");

          widgetIdRef.current = window.turnstile.render(containerRef.current, {
            sitekey: "0x4AAAAAACP1-1H5SaiQ7Zxj",
            callback: (token) => {
              console.log("✅ Turnstile verified successfully");
              onVerify(token);
            },
            "error-callback": () => {
              console.log("❌ Turnstile error");
              if (onError) onError();
            },
            "expired-callback": () => {
              console.log("⏰ Turnstile expired");
              if (onExpire) onExpire();
            },
            theme: "light",
            size: "normal",
          });
        } catch (error) {
          console.error("Error rendering Turnstile:", error);
          isLoadingRef.current = false;
        }
      }
    };

    const existingScript = document.querySelector(
      'script[src*="challenges.cloudflare.com/turnstile"]',
    );

    if (existingScript) {
      if (window.turnstile) {
        renderTurnstile();
      } else {
        existingScript.addEventListener("load", renderTurnstile);
      }
    } else {
      const script = document.createElement("script");
      script.src = "https://challenges.cloudflare.com/turnstile/v0/api.js";
      script.async = true;
      script.defer = true;
      script.onload = renderTurnstile;
      document.head.appendChild(script);
    }

    return () => {
      if (widgetIdRef.current !== null && window.turnstile) {
        try {
          console.log("🧹 Cleaning up Turnstile widget");
          window.turnstile.remove(widgetIdRef.current);
          widgetIdRef.current = null;
        } catch (error) {
          console.error("Error removing Turnstile:", error);
        }
      }
      isLoadingRef.current = false;
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="flex justify-center my-4"
      id="turnstile-container"
    />
  );
}
