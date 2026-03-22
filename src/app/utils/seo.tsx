import { useEffect } from 'react';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  ogUrl?: string;
  twitterTitle?: string;
  twitterDescription?: string;
  twitterImage?: string;
}

export const useSEO = ({
  title = 'Dot & Key - Premium Skincare | Science-Backed Formulations',
  description = 'Shop premium skincare products with science-backed formulations. Serums, moisturizers, sunscreens & more. Free shipping on orders above ₹999. Up to 30% off!',
  keywords = 'skincare, beauty products, serums, moisturizers, sunscreen, anti-aging, vitamin c, hyaluronic acid, dot and key',
  ogTitle,
  ogDescription,
  ogImage = '/og-image.jpg',
  ogUrl,
  twitterTitle,
  twitterDescription,
  twitterImage
}: SEOProps = {}) => {
  useEffect(() => {
    // Set title
    document.title = title;

    // Set or update meta tags
    const setMetaTag = (name: string, content: string, property = false) => {
      const attribute = property ? 'property' : 'name';
      let tag = document.querySelector(`meta[${attribute}="${name}"]`);
      
      if (!tag) {
        tag = document.createElement('meta');
        tag.setAttribute(attribute, name);
        document.head.appendChild(tag);
      }
      
      tag.setAttribute('content', content);
    };

    // Remove existing meta tags to avoid duplicates
    const removeMetaTag = (name: string, property = false) => {
      const attribute = property ? 'property' : 'name';
      const tags = document.querySelectorAll(`meta[${attribute}="${name}"]`);
      tags.forEach(tag => tag.remove());
    };

    // Basic meta tags
    setMetaTag('description', description);
    setMetaTag('keywords', keywords);
    setMetaTag('viewport', 'width=device-width, initial-scale=1.0');
    setMetaTag('robots', 'index, follow');
    setMetaTag('author', 'Dot & Key Skincare');

    // Open Graph tags
    setMetaTag('og:type', 'website', true);
    setMetaTag('og:title', ogTitle || title, true);
    setMetaTag('og:description', ogDescription || description, true);
    setMetaTag('og:image', ogImage, true);
    if (ogUrl) setMetaTag('og:url', ogUrl, true);
    setMetaTag('og:site_name', 'Dot & Key Skincare', true);
    setMetaTag('og:locale', 'en_IN', true);

    // Twitter Card tags
    setMetaTag('twitter:card', 'summary_large_image');
    setMetaTag('twitter:title', twitterTitle || ogTitle || title);
    setMetaTag('twitter:description', twitterDescription || ogDescription || description);
    setMetaTag('twitter:image', twitterImage || ogImage);
    setMetaTag('twitter:site', '@dotandkey');
    setMetaTag('twitter:creator', '@dotandkey');

    // Additional SEO tags
    setMetaTag('theme-color', '#8b5cf6');
    setMetaTag('apple-mobile-web-app-capable', 'yes');
    setMetaTag('apple-mobile-web-app-status-bar-style', 'black-translucent');
    setMetaTag('apple-mobile-web-app-title', 'Dot & Key');
    setMetaTag('format-detection', 'telephone=no');
    
    // Canonical URL
    const canonicalUrl = ogUrl || window.location.href;
    let canonicalLink = document.querySelector('link[rel="canonical"]');
    if (!canonicalLink) {
      canonicalLink = document.createElement('link');
      canonicalLink.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.setAttribute('href', canonicalUrl);

    // Cleanup function to remove tags when component unmounts (optional)
    return () => {
      // Remove dynamically added tags if needed
      // This is optional and depends on your needs
    };
  }, [title, description, keywords, ogTitle, ogDescription, ogImage, ogUrl, twitterTitle, twitterDescription, twitterImage]);
};

export const SEO: React.FC<SEOProps> = (props) => {
  useSEO(props);
  return null;
};

// Generate structured data for products
export const generateProductSchema = (product: any) => {
  return {
    "@context": "https://schema.org/",
    "@type": "Product",
    "name": product.name,
    "image": product.images,
    "description": product.description,
    "sku": product.id,
    "mpn": product.id,
    "brand": {
      "@type": "Brand",
      "name": "Dot & Key"
    },
    "offers": {
      "@type": "Offer",
      "url": `${typeof window !== 'undefined' ? window.location.origin : ''}/products/${product.slug}`,
      "priceCurrency": "INR",
      "price": product.price,
      "priceValidUntil": "2026-12-31",
      "availability": product.stock > 0 ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
      "itemCondition": "https://schema.org/NewCondition",
      "shippingDetails": {
        "@type": "OfferShippingDetails",
        "shippingRate": {
          "@type": "MonetaryAmount",
          "value": 0,
          "currency": "INR"
        },
        "shippingDestination": {
          "@type": "DefinedRegion",
          "addressCountry": "IN"
        },
        "deliveryTime": {
          "@type": "ShippingDeliveryTime",
          "handlingTime": {
            "@type": "QuantitativeValue",
            "minValue": 1,
            "maxValue": 2,
            "unitCode": "DAY"
          },
          "transitTime": {
            "@type": "QuantitativeValue",
            "minValue": 2,
            "maxValue": 5,
            "unitCode": "DAY"
          }
        }
      }
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": product.rating,
      "reviewCount": product.reviews,
      "bestRating": "5",
      "worstRating": "1"
    },
    "review": product.reviews > 0 ? [
      {
        "@type": "Review",
        "reviewRating": {
          "@type": "Rating",
          "ratingValue": product.rating,
          "bestRating": "5"
        },
        "author": {
          "@type": "Person",
          "name": "Verified Customer"
        }
      }
    ] : undefined
  };
};

// Generate structured data for the website
export const generateWebsiteSchema = () => {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Dot & Key Skincare",
    "url": typeof window !== 'undefined' ? window.location.origin : '',
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": `${typeof window !== 'undefined' ? window.location.origin : ''}/products?search={search_term_string}`
      },
      "query-input": "required name=search_term_string"
    }
  };
};

// Generate organization schema
export const generateOrganizationSchema = () => {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Dot & Key Skincare",
    "url": typeof window !== 'undefined' ? window.location.origin : '',
    "logo": "https://dotandkey.com/logo.png",
    "sameAs": [
      "https://www.facebook.com/dotandkey",
      "https://www.instagram.com/dotandkey.skincare",
      "https://twitter.com/dotandkey",
      "https://www.youtube.com/@dotandkeyskincare"
    ],
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+91-9876543210",
      "contactType": "customer service",
      "availableLanguage": ["English", "Hindi"]
    },
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "123 Skincare Street",
      "addressLocality": "Mumbai",
      "addressRegion": "Maharashtra",
      "postalCode": "400001",
      "addressCountry": "IN"
    }
  };
};

// Inject structured data with proper typing
export const injectStructuredData = (data: any) => {
  if (typeof window === 'undefined') return;

  const scriptId = 'structured-data';
  let script = document.getElementById(scriptId) as HTMLScriptElement | null;

  if (!script) {
    script = document.createElement('script');
    script.id = scriptId;
    script.type = 'application/ld+json';
    document.head.appendChild(script);
  }

  script.textContent = JSON.stringify(data);
};

// Clear all structured data
export const clearStructuredData = () => {
  if (typeof window === 'undefined') return;
  
  const script = document.getElementById('structured-data');
  if (script) {
    script.remove();
  }
};

// Inject multiple schemas
export const injectMultipleSchemas = (schemas: any[]) => {
  if (typeof window === 'undefined') return;
  
  schemas.forEach((schema, index) => {
    const scriptId = `structured-data-${index}`;
    let script = document.getElementById(scriptId) as HTMLScriptElement | null;
    
    if (!script) {
      script = document.createElement('script');
      script.id = scriptId;
      script.type = 'application/ld+json';
      document.head.appendChild(script);
    }
    
    script.textContent = JSON.stringify(schema);
  });
};