/**
 * Event system for RiverGuard application
 * This provides a simple pub/sub system to communicate between components
 */

export interface IncidentEventData {
  id: string;
  title: string;
  type: string;
  severity: string;
  location: string;
  imageUrl: string;
  timestamp: Date;
}

/**
 * Emit a new incident event that can be listened to by other components
 * @param incidentData The incident data to broadcast
 */
export const emitNewIncident = (incidentData: IncidentEventData): void => {
  // Create and dispatch a custom event
  const event = new CustomEvent('newIncident', {
    detail: incidentData,
    bubbles: true,
  });
  
  window.dispatchEvent(event);
};

/**
 * Listen for new incident events
 * @param callback Function to call when an incident is created
 * @returns Cleanup function to remove the event listener
 */
export const onNewIncident = (callback: (incident: IncidentEventData) => void): (() => void) => {
  const handler = (event: Event) => {
    const customEvent = event as CustomEvent<IncidentEventData>;
    callback(customEvent.detail);
  };
  
  window.addEventListener('newIncident', handler);
  
  // Return cleanup function
  return () => {
    window.removeEventListener('newIncident', handler);
  };
};

/**
 * Chat message event data
 */
export interface ChatMessageEventData {
  id: string;
  content: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

/**
 * Emit a new chat message event
 * @param messageData The chat message data
 */
export const emitNewChatMessage = (messageData: ChatMessageEventData): void => {
  const event = new CustomEvent('newChatMessage', {
    detail: messageData,
    bubbles: true,
  });
  
  window.dispatchEvent(event);
};

/**
 * Listen for new chat message events
 * @param callback Function to call when a message is created
 * @returns Cleanup function to remove the event listener
 */
export const onNewChatMessage = (callback: (message: ChatMessageEventData) => void): (() => void) => {
  const handler = (event: Event) => {
    const customEvent = event as CustomEvent<ChatMessageEventData>;
    callback(customEvent.detail);
  };
  
  window.addEventListener('newChatMessage', handler);
  
  // Return cleanup function
  return () => {
    window.removeEventListener('newChatMessage', handler);
  };
}; 