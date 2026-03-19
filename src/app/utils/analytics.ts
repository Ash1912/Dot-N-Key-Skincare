// Analytics and tracking utilities
// Replace API keys with your actual keys in production

// Meta Pixel Configuration
export const initMetaPixel = () => {
  if (typeof window !== 'undefined') {
    // Meta Pixel Code
    // Replace 'YOUR_PIXEL_ID' with your actual Meta Pixel ID
    const pixelId = 'YOUR_PIXEL_ID';
    
    // @ts-ignore
    !(function(f: any, b: any, e: any, v: any, n?: any, t?: any, s?: any) {
      if (f.fbq) return;
      n = f.fbq = function() {
        n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments);
      };
      if (!f._fbq) f._fbq = n;
      n.push = n;
      n.loaded = !0;
      n.version = '2.0';
      n.queue = [];
      t = b.createElement(e);
      t.async = !0;
      t.src = v;
      s = b.getElementsByTagName(e)[0];
      s.parentNode.insertBefore(t, s);
    })(
      window,
      document,
      'script',
      'https://connect.facebook.net/en_US/fbevents.js'
    );
    
    // @ts-ignore
    window.fbq('init', pixelId);
    // @ts-ignore
    window.fbq('track', 'PageView');
  }
};

// Google Analytics Configuration
export const initGoogleAnalytics = () => {
  if (typeof window !== 'undefined') {
    // Replace 'G-XXXXXXXXXX' with your actual Google Analytics ID
    const gaId = 'G-XXXXXXXXXX';
    
    const script1 = document.createElement('script');
    script1.async = true;
    script1.src = `https://www.googletagmanager.com/gtag/js?id=${gaId}`;
    document.head.appendChild(script1);
    
    const script2 = document.createElement('script');
    script2.innerHTML = `
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', '${gaId}');
    `;
    document.head.appendChild(script2);
  }
};

// Google Ads Conversion Tracking
export const initGoogleAds = () => {
  if (typeof window !== 'undefined') {
    // Replace 'AW-XXXXXXXXX' with your actual Google Ads Conversion ID
    const adsId = 'AW-XXXXXXXXX';
    
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${adsId}`;
    document.head.appendChild(script);
  }
};

// Track Events
export const trackEvent = (eventName: string, eventParams?: any) => {
  // Meta Pixel Event
  if (typeof window !== 'undefined' && (window as any).fbq) {
    (window as any).fbq('track', eventName, eventParams);
  }
  
  // Google Analytics Event
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('event', eventName, eventParams);
  }
  
  console.log('Event tracked:', eventName, eventParams);
};

// Specific E-commerce Events
export const trackAddToCart = (product: any, quantity: number = 1) => {
  trackEvent('AddToCart', {
    content_name: product.name,
    content_ids: [product.id],
    content_type: 'product',
    value: product.price * quantity,
    currency: 'INR',
    quantity: quantity
  });
};

export const trackViewContent = (product: any) => {
  trackEvent('ViewContent', {
    content_name: product.name,
    content_ids: [product.id],
    content_type: 'product',
    value: product.price,
    currency: 'INR'
  });
};

export const trackInitiateCheckout = (cartTotal: number, numItems: number) => {
  trackEvent('InitiateCheckout', {
    value: cartTotal,
    currency: 'INR',
    num_items: numItems
  });
};

export const trackPurchase = (orderId: string, value: number, items: any[]) => {
  trackEvent('Purchase', {
    transaction_id: orderId,
    value: value,
    currency: 'INR',
    content_ids: items.map(item => item.product.id),
    content_type: 'product',
    num_items: items.length
  });
  
  // Google Ads Conversion
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('event', 'conversion', {
      send_to: 'AW-XXXXXXXXX/CONVERSION_LABEL',
      transaction_id: orderId,
      value: value,
      currency: 'INR'
    });
  }
};

export const trackSearch = (searchTerm: string) => {
  trackEvent('Search', {
    search_string: searchTerm
  });
};

export const trackAddToWishlist = (product: any) => {
  trackEvent('AddToWishlist', {
    content_name: product.name,
    content_ids: [product.id],
    content_type: 'product',
    value: product.price,
    currency: 'INR'
  });
};
