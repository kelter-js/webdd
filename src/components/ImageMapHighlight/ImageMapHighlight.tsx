import { FC, useState, useRef, useEffect, useMemo } from "react";

import { originalHeight, originalWidth } from "./constants";
import { ImageMapHighlightProps } from "./types";

export const ImageMapHighlight: FC<ImageMapHighlightProps> = ({
  onOpen,
  isDialogueOpen,
  mapImage,
  coords,
}) => {
  const [hoveredArea, setHoveredArea] = useState<number | null>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isDialogueOpen) {
      setHoveredArea(null);
    }
  }, [isDialogueOpen]);

  // Оригинальные размеры изображения и координаты

  const mapCoordinates = useMemo(() => {
    return coords.map((_, index) => {
      const handleMouseEnter = () => {
        if (!isDialogueOpen) {
          setHoveredArea(index);
        }
      };

      const handleMouseLeave = () => {
        if (!isDialogueOpen) {
          setHoveredArea(null);
        }
      };

      const handleAreaClick = () => {
        onOpen(coords[index].name, index);
      };

      return (
        <area
          key={index}
          shape="poly"
          coords={coords[index].coords}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onClick={handleAreaClick}
          href="#"
        />
      );
    });
  }, [coords, isDialogueOpen, onOpen]);

  return (
    <div className="image-map-container" ref={containerRef}>
      <div className="image-wrapper">
        <img
          ref={imgRef}
          src={mapImage}
          alt="Interactive Map"
          useMap="#image-map"
          className="map-image"
          onLoad={() => window.dispatchEvent(new Event("resize"))}
        />

        <map name="image-map">{mapCoordinates}</map>

        <svg
          className="highlight-overlay"
          viewBox={`0 0 ${originalWidth} ${originalHeight}`}
        >
          <defs>
            <radialGradient id="souls-glow-v2" cx="50%" cy="50%" r="65%">
              <stop offset="0%" stopColor="#f8e6c0" stopOpacity="0.05" />
              <stop offset="80%" stopColor="#e6b422" stopOpacity="0.25" />
              <stop offset="95%" stopColor="#8a2b0d" stopOpacity="0.2" />
              <stop offset="100%" stopColor="#000" stopOpacity="0" />
            </radialGradient>

            <filter
              id="subtle-ripple"
              x="-10%"
              y="-10%"
              width="120%"
              height="120%"
            >
              <feTurbulence
                type="fractalNoise"
                baseFrequency="0.01 0.015"
                numOctaves="1"
                result="turbulence"
              />
              <feDisplacementMap
                in2="turbulence"
                in="SourceGraphic"
                scale="1"
                xChannelSelector="R"
                yChannelSelector="G"
              />
            </filter>

            <filter id="soft-glow" colorInterpolationFilters="sRGB">
              <feGaussianBlur stdDeviation="1.5" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {hoveredArea !== null && (
            <>
              <polygon
                points={coords[hoveredArea].coords}
                fill="url(#souls-glow-v2)"
                style={{
                  animation: "gentlePulse 3s ease-in-out infinite alternate",
                  mixBlendMode: "hard-light",
                  filter: "url(#subtle-ripple)",
                }}
              />

              <polygon
                points={coords[hoveredArea].coords}
                fill="none"
                stroke="#e6b422"
                strokeWidth="1.2"
                strokeDasharray="6 3"
                strokeLinejoin="round"
                style={{
                  animation: `
            gentleStroke 2s ease-in-out infinite alternate,
            dashOffset 4s linear infinite
          `,
                  paintOrder: "stroke",
                  filter: "url(#soft-glow)",
                }}
              />

              <polygon
                points={coords[hoveredArea].coords}
                fill="none"
                stroke="rgba(200, 160, 60, 0.15)"
                strokeWidth="0.6"
                transform="scale(0.97)"
                transform-Origin="center"
              />
            </>
          )}
        </svg>
      </div>
    </div>
  );
};
