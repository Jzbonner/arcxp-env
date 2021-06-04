import React from 'react';

const ChainContext = React.createContext();

export const ChainProvider = ChainContext.Provider;
export const ChildConsumer = ChainContext.Consumer;

export default ChainContext;
