export const GoldIcon = ({ size = 40 }: { size?: number }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    role="img"
  >
    <circle cx="12" cy="12" r="10" fill="#B8860B" />

    <circle cx="12" cy="12" r="8" fill="#FFD700" />

    <path
      d="M12 7l1.2 2.4 2.6.4-1.9 1.9.5 2.6-2.4-1.2-2.4 1.2.5-2.6-1.9-1.9 2.6-.4L12 7z"
      fill="#996515"
    />
  </svg>
);
