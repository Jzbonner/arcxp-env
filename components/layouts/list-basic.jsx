import React from 'react';
import { useAppContext } from 'fusion:context';


const ListPageLayout = () => {
  const appContext = useAppContext();
  const { globalContent } = appContext;
  if (!globalContent) return null;

  return (
  <>
    List Page Layout
  </>
  );
};

export default ListPageLayout;
