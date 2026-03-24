import { useEffect } from 'react';
import { useLocation } from 'react-router';
import React from 'react';

export function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'instant' // Instant scroll, no smooth animation
    });
  }, [pathname]);

  return null;
}
