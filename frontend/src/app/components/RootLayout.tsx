import { Outlet } from 'react-router';
import React from 'react';
import { ScrollToTop } from './ScrollToTop';

export function RootLayout() {
  return (
    <>
      <ScrollToTop />
      <Outlet />
    </>
  );
}
