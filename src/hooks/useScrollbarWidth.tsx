import { useEffect } from "react";

export const useScrollbarWidth = () => {
  useEffect(() => {
    const getScrollbarWidth = () =>
      window.innerWidth - document.documentElement.clientWidth;

    document.documentElement.style.setProperty(
      "--scrollbar-width",
      `${getScrollbarWidth()}px`,
    );
  }, []);
};
