import { THEMES } from "@/styles/themes";



export function HomePageWrapper({ children, className = "" }) {
  return (
    <div
      className={`relative w-full p-2 sm:p-3 md:p-4 lg:p-5 ${THEMES.current.homeGradient} ${THEMES.current.textPrimary} overflow-hidden ${className}`}
    >
      {children}
    </div>
  );
}
