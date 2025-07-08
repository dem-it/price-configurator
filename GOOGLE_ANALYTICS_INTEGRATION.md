# Google Analytics Integration for Price Configurator

This document explains the Google Analytics integration that has been implemented in the price configurator.

## Features

### 1. Google Analytics ID Configuration
- Admins can configure a Google Analytics Measurement ID (e.g., G-XXXXXXXXXX) in the Settings tab of the configurator editor
- The ID is stored in `ConfigurationMeta.googleAnalyticsId`
- The setting appears alongside the language selector in the Settings tab

### 2. Automatic Page View Tracking
When a Google Analytics ID is configured, the following page views are automatically tracked:

- **Initial page load**: Tracks when a user first loads the configurator
- **Step navigation**: Tracks when users move between different steps/groups in the wizard
- **Completion**: Tracks when users reach the finished/result page

Page view events include:
- Page name (e.g., "configurator_step_1", "configurator_finished")
- Page title (e.g., "Price Configurator - Step Title")
- Current URL location

### 3. User Interaction Event Tracking
The following user interactions are tracked as custom events:

#### Question Interactions
- **Regular Questions**: When a user selects an answer from radio buttons or dropdown
- **Multiple Questions**: When a user checks/unchecks checkbox options
- **Open Text Questions**: When a user enters or clears text input

Event data includes:
- Question ID and title
- Interaction type ('select' or 'input')
- Selected value/answer title
- Event category ('configurator_interaction')

#### Navigation Events
- **Next/Back Navigation**: When users move between steps
- **Reset Action**: When users restart the configurator

Event data includes:
- Step number and title
- Navigation direction ('next', 'back', 'reset')
- Event category ('configurator_navigation')

## Implementation Details

### Files Modified/Created

1. **Data Model**: `src/data/configurator/ConfigurationMeta.ts`
   - Added `googleAnalyticsId?: string` property

2. **Google Analytics Utilities**: `src/utils/googleAnalytics.ts`
   - `initializeGoogleAnalytics()`: Dynamically loads GA script
   - `trackPageView()`: Tracks page views
   - `trackEvent()`: Generic event tracking
   - `trackQuestionInteraction()`: Specific question interaction tracking
   - `trackStepNavigation()`: Step navigation tracking

3. **Configuration Component**: `src/components/configurators/Edit/Metadata/ConfiguratorGoogleAnalytics.tsx`
   - Settings UI for entering Google Analytics ID

4. **Analytics Component**: `src/components/analytics/GoogleAnalytics.tsx`
   - Handles GA initialization and initial page view

5. **Preview Integration**: 
   - `src/pages/configurators/[organizationId]/[id].tsx`: Includes GA component
   - `src/components/configurators/Preview/PreviewAsStepper/index.tsx`: Step navigation tracking
   - Question components: Added interaction tracking to all question types

6. **Settings UI**: `src/components/configurators/Edit/Metadata/index.tsx`
   - Added Google Analytics configuration to Settings tab

## Usage Instructions

### For Administrators

1. **Configure Google Analytics ID**:
   - Go to the configurator editor
   - Navigate to the "Settings" tab
   - Enter your Google Analytics Measurement ID (format: G-XXXXXXXXXX)
   - Save the configurator

2. **Verify Tracking**:
   - Open your configurator in preview mode
   - Check your Google Analytics dashboard for real-time events
   - Look for custom events under Events > All Events

### For Developers

The tracking system is designed to be:
- **Non-intrusive**: Only activates when GA ID is configured
- **Performance-conscious**: Scripts load asynchronously
- **Privacy-friendly**: Only tracks interaction patterns, not personal data
- **Customizable**: Easy to add new event types or modify existing ones

### Event Categories in Google Analytics

- `configurator_interaction`: User interactions with questions
- `configurator_navigation`: Navigation between steps

### Custom Parameters

All events include custom parameters to help with analysis:
- `custom_parameter_configurator_event`: true (helps filter configurator events)
- Question-specific parameters (question_id, question_title, etc.)
- Navigation-specific parameters (step_number, step_title, etc.)

## Privacy Considerations

- No personally identifiable information is tracked
- Only interaction patterns and configurator usage metrics are collected
- Compliance with GDPR and other privacy regulations depends on your GA configuration
- Consider adding appropriate privacy notices to your website

## Troubleshooting

### GA Events Not Appearing
1. Verify the Google Analytics ID is correctly formatted (G-XXXXXXXXXX)
2. Check browser console for any JavaScript errors
3. Ensure GA script is loading (check Network tab in DevTools)
4. Verify events in GA Real-Time reports first before checking historical data

### Testing
- Use GA Real-Time reporting for immediate verification
- Test in incognito/private browsing mode to avoid ad blockers
- Check browser console for any tracking-related errors
