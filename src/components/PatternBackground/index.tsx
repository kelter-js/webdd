import React, { useState, useRef, useEffect } from "react";
import cityImage from "../../assets/test.png";

export const ImageMapHighlight = () => {
  const [hoveredArea, setHoveredArea] = useState<number | null>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Оригинальные размеры изображения и координаты
  const originalWidth = 1920;
  const originalHeight = 954;
  const originalCoords = [
    "103,375,14,501,35,511,36,598,374,693,450,696,566,650,559,547,476,462,272,384,225,370",
    "1012,708,1495,820,1848,665,1848,555,1690,440,1436,506,1278,565,1015,682",
    "759,579,756,494,912,460,915,542", // 3-я область (четырехугольник)
    "84,334,454,280,522,194,620,183,705,217,723,126,250,41,45,158", // 4-я область
    "1125,216,1044,219,968,188,973,112,946,105,957,66,1042,39,1139,65,1149,100", // 5-я область
    "745,484,890,453,896,396,920,338,866,261,759,205,589,199,464,317,488,440", // 6-я область
    "973,334,924,319,862,238,879,210,1030,234,1073,275,1061,328", // 7-я область
    "1102,423,1132,452,1234,474,1342,455,1407,465,1492,435,1595,450,1682,423,1705,343,1653,290,1473,280,1500,171,1426,154,1242,209,1093,363",
  ];

  return (
    <div className="image-map-container" ref={containerRef}>
      <div className="image-wrapper">
        <img
          ref={imgRef}
          src={cityImage}
          alt="Interactive Map"
          useMap="#image-map"
          className="map-image"
          onLoad={() => window.dispatchEvent(new Event("resize"))}
        />

        <map name="image-map">
          {originalCoords.map((_, index) => (
            <area
              key={index}
              shape="poly"
              coords={originalCoords[index]}
              onMouseEnter={() => setHoveredArea(index)}
              onMouseLeave={() => setHoveredArea(null)}
              href="#"
            />
          ))}
        </map>

        <svg
          className="highlight-overlay"
          viewBox={`0 0 ${originalWidth} ${originalHeight}`}
        >
          {hoveredArea !== null && (
            <polygon
              points={originalCoords[hoveredArea]}
              fill="rgba(255, 215, 0, 0.3)"
              stroke="gold"
              strokeWidth="3"
            />
          )}
        </svg>
      </div>
    </div>
  );
};
