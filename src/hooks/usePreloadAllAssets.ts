import { useEffect, useState } from "react";
import { useAppState } from "../stores";

type MediaAsset = string;

export const usePreloadAllAssets = () => {
  const [progress, setProgress] = useState(0);
  const [loaded, setLoaded] = useState(false);

  const { setFading } = useAppState();

  useEffect(() => {
    // 1. Импорт всех ассетов из src/assets рекурсивно
    const assets: Record<string, string> = import.meta.glob<string>(
      "../assets/**/*.{png,jpg,jpeg,webp,svg,mp3,ogg,mp4,webm}",
      {
        eager: true,
        import: "default",
      }
    );

    const urls = Object.values(assets) as MediaAsset[];
    const total = urls.length;

    if (total === 0) {
      setLoaded(true);
      setProgress(100);
      setFading(true);
      return;
    }

    let completed = 0;

    urls.forEach((src) => {
      const ext = src.split(".").pop()?.toLowerCase();

      // 📷 Изображения
      if (["png", "jpg", "jpeg", "webp", "svg"].includes(ext || "")) {
        const img = new Image();
        img.onload = img.onerror = () => {
          completed++;
          setProgress(Math.round((completed / total) * 100));
          if (completed === total) {
            setLoaded(true);
            setFading(true);
          }
        };
        img.src = src;
      }
      // 🎧 Видео и аудио
      else {
        fetch(src).finally(() => {
          completed++;
          setProgress(Math.round((completed / total) * 100));
          if (completed === total) {
            setLoaded(true);
            setFading(true);
          }
        });
      }
    });
  }, []);

  return { progress, loaded };
};
