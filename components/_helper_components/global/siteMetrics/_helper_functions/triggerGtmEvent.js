const triggerGtmEvent = (eventName, eventToListenTo = null, delayedEventName = null) => {
  if (typeof window !== 'undefined') {
    const dataLayer = window.dataLayer || [];
    // trigger an event immediately
    if (eventName) {
      dataLayer.push({
        event: eventName,
      });
    }
    // trigger an event after another event occurs
    if (eventToListenTo && delayedEventName) {
      // we define a window property to prevent double- or errant- triggering with the standard connext callback
      // see components/_helper_components/global/connext/default.jsx#153 for details
      window[delayedEventName] = true;
      window.addEventListener(eventToListenTo, () => {
        dataLayer.push({
          event: delayedEventName,
        });
      });
    }
  }
};

export default triggerGtmEvent;
