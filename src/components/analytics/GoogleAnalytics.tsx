import { initializeGoogleAnalytics, trackPageView } from "@/utils/googleAnalytics"
import { useEffect } from "react"

interface GoogleAnalyticsProps {
  measurementId: string;
  initialPageName?: string;
}

const GoogleAnalytics: React.FC<GoogleAnalyticsProps> = ({ measurementId, initialPageName = "configurator_start" }) => {
  useEffect(() => {
    if (measurementId && measurementId.trim() !== "") {
      initializeGoogleAnalytics(measurementId)

      // Track initial page view
      setTimeout(() => {
        trackPageView(initialPageName, "Price Configurator - Start")
        // Small delay to ensure gtag is loaded
      }, 500)
    }
  }, [measurementId, initialPageName])

  // This component doesn't render anything visible
  return null
}

export default GoogleAnalytics
