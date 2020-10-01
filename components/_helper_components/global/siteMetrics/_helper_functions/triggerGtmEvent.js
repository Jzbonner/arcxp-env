const triggerGtmEvent = (eventName, eventToListenTo = null, listenerEventName = null) => {
  if (typeof window !== 'undefined') {
    const dataLayer = window.dataLayer || [];
    const queuedEventTriggers = window.queuedEventTriggers || [];
    // trigger an event immediately
    if (eventName) {
      dataLayer.push({
        event: eventName,
      });
    }
    // trigger an event after another event occurs
    if (eventToListenTo && listenerEventName && !queuedEventTriggers.includes(listenerEventName)) {
      queuedEventTriggers.push(listenerEventName);
      window.addEventListener(eventToListenTo, () => {
        dataLayer.push({
          event: listenerEventName,
        });
        window.queuedEventTriggers = queuedEventTriggers.filter(t => t !== listenerEventName);
      });
    }
  }
};

export default triggerGtmEvent;
