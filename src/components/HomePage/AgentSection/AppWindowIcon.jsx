export const AppWindowIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="url(#ac-gradient)"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="mt-1"
    >
      <defs>
        <linearGradient id="ac-gradient" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#FCA26E" />
          <stop offset="100%" stopColor="#E077FF" />
        </linearGradient>
      </defs>

      <rect x="3" y="3" width="7" height="7" rx="2" />
      <rect x="14" y="3" width="7" height="7" rx="2" />
      <rect x="3" y="14" width="7" height="7" rx="2" />
      <rect x="14" y="14" width="7" height="7" rx="2" />
    </svg>
  );
};
