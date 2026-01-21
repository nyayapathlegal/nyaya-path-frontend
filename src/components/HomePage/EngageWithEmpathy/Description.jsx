import { THEMES } from "@/styles/themes"

export const Description = ({description}) => {
  return (
    <p className={`text-[1.1rem] ${THEMES.current.textSecondary} leading-8 w-full lg:max-w-[350px]`}>
      {description}
    </p>
  );
};
