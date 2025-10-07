export const LeveledUpCharacter = () => (
  <svg
    width="40"
    height="40"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <ellipse cx="12" cy="16" rx="4" ry="5" fill="#2C2C2C" />
    <circle cx="12" cy="10" r="3.5" fill="#2C2C2C" />

    <path d="M12 2 L14 6 L10 6 Z" fill="#FFD700" opacity="0.7" />
    <path d="M8 4 L16 4 L12 8 Z" fill="#FFA500" opacity="0.5" />

    <text
      x="6"
      y="8"
      font-family="Arial"
      font-size="4"
      fill="#FFD700"
      text-anchor="middle"
    >
      ?
    </text>
    <text
      x="18"
      y="8"
      font-family="Arial"
      font-size="4"
      fill="#FFD700"
      text-anchor="middle"
    >
      ?
    </text>
    <text
      x="12"
      y="14"
      font-family="Arial"
      font-size="3"
      fill="#FFA500"
      text-anchor="middle"
    >
      ?
    </text>

    <circle
      cx="12"
      cy="12"
      r="7"
      fill="none"
      stroke="#FFD700"
      stroke-width="0.5"
      opacity="0.6"
      stroke-dasharray="2,1"
    />
  </svg>
);
