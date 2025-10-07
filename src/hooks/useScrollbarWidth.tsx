import { useEffect } from "react";

// REFACTORING CHECKED ✅

export const useScrollbarWidth = () => {
  useEffect(() => {
    const getScrollbarWidth = () =>
      window.innerWidth - document.documentElement.clientWidth;

    document.documentElement.style.setProperty(
      "--scrollbar-width",
      `${getScrollbarWidth()}px`
    );
  }, []);
};
