import { RouterProvider } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import { router } from './routes';
import { useEffect } from 'react';
import { initMetaPixel, initGoogleAnalytics, initGoogleAds } from './utils/analytics';

export default function App() {
  useEffect(() => {
    // Initialize analytics and tracking
    initMetaPixel();
    initGoogleAnalytics();
    initGoogleAds();
  }, []);

  return (
    <AppProvider>
      <RouterProvider router={router} />
    </AppProvider>
  );
}
