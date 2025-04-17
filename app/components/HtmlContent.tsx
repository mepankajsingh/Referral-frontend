import { useEffect, useState } from "react";

interface HtmlContentProps {
  html: string;
  className?: string;
}

/**
 * A component that safely renders HTML content
 * Uses a basic client-side sanitization approach
 */
export default function HtmlContent({ html, className = "" }: HtmlContentProps) {
  const [isMounted, setIsMounted] = useState(false);
  
  // Only render HTML content on the client side to avoid hydration issues
  useEffect(() => {
    setIsMounted(true);
  }, []);
  
  // Basic sanitization function to remove potentially dangerous tags/attributes
  const sanitizeHtml = (html: string): string => {
    if (!html) return "";
    
    // Remove script tags and their content
    let sanitized = html.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, "");
    
    // Remove onclick, onerror, and other on* attributes
    sanitized = sanitized.replace(/\son\w+\s*=\s*["']?[^"']*["']?/gi, "");
    
    // Remove javascript: URLs
    sanitized = sanitized.replace(/javascript:/gi, "unsafe:");
    
    // Remove data: URLs from img src
    sanitized = sanitized.replace(/(<img[^>]*\ssrc=["'])data:/gi, '$1unsafe:data:');
    
    return sanitized;
  };
  
  // Server-side rendering or initial client render
  if (!isMounted) {
    return (
      <div className={className}>
        {/* Placeholder with similar styling to avoid layout shifts */}
        <div className="opacity-0" dangerouslySetInnerHTML={{ __html: html }} />
      </div>
    );
  }
  
  // Client-side rendering with sanitization
  const sanitizedHtml = sanitizeHtml(html);
  
  return (
    <div 
      className={className} 
      dangerouslySetInnerHTML={{ __html: sanitizedHtml }}
    />
  );
}
