import { initializeGoogleAnalytics, trackPageView } from "@/utils/googleAnalytics"
import { useEffect } from "react"

interface GoogleAnalyticsProps {
  measurementId: string;
  initialPageName?: string;
}

const GoogleAnalytics: React.FC<GoogleAnalyticsProps> = ({ measurementId, initialPageName = "configurator_start" }) => {
  useEffect(() => {
    if (measurementId && measurementId.trim() !== "") {
      initializeGoogleAnalytics(measurementId);
      
      // Track initial page view
      setTimeout(() => {
        trackPageView(initialPageName, "Price Configurator - Start");
      }, 500); // Small delay to ensure gtag is loaded
    }
  }, [measurementId, initialPageName]);

  return null; // This component doesn't render anything visible
};

export default GoogleAnalytics;
