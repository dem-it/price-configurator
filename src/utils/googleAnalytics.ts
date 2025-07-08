// Google Analytics utility functions
declare global {
  interface Window {
    gtag: (...args: any[]) => void;
    dataLayer: any[];
  }
}

export const initializeGoogleAnalytics = (measurementId: string) => {
  // Remove existing Google Analytics scripts
  const existingScripts = document.querySelectorAll('script[src*="googletagmanager.com"]');
  existingScripts.forEach(script => script.remove());

  // Create and append the Google Analytics script
  const script1 = document.createElement('script');
  script1.async = true;
  script1.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
  document.head.appendChild(script1);

  // Create and append the configuration script
  const script2 = document.createElement('script');
  script2.innerHTML = `
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', '${measurementId}');
  `;
  document.head.appendChild(script2);

  // Set up gtag function on window
  window.gtag = function(...args: any[]) {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push(args);
  };
};

export const trackPageView = (pageName: string, pageTitle?: string) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'page_view', {
      page_title: pageTitle || pageName,
      page_location: window.location.href,
      custom_parameter_page_name: pageName
    });
  }
};

export const trackEvent = (eventName: string, eventParameters?: Record<string, any>) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', eventName, {
      ...eventParameters,
      custom_parameter_configurator_event: true
    });
  }
};

export const trackQuestionInteraction = (questionId: string, questionTitle: string, interactionType: 'select' | 'input', value?: string) => {
  trackEvent('question_interaction', {
    question_id: questionId,
    question_title: questionTitle,
    interaction_type: interactionType,
    interaction_value: value,
    event_category: 'configurator_interaction'
  });
};

export const trackStepNavigation = (stepNumber: number, stepTitle: string, direction: 'next' | 'back' | 'reset') => {
  trackEvent('step_navigation', {
    step_number: stepNumber,
    step_title: stepTitle,
    navigation_direction: direction,
    event_category: 'configurator_navigation'
  });
};
