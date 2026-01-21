import Link from "next/link";
import { ArrowRight } from "lucide-react";

const Menu = ({ data, title = "Resources" }) => {
  return (
    <div className="flex-wrap w-fit">
      <p className="text-gray-500 mb-3 text-[1.1rem]">{title}</p>

      <div className="flex flex-col gap-4 font-medium">
        {data.map((item, index) => (
          <Link
            key={index}
            href={item.link}
            className="group flex items-center gap-2 hover:text-black transition-all"
          >
            <span className="text-nowrap">{item.text}</span>

            <span className="opacity-0 -translate-x-1.5 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200">
              <ArrowRight size={18} />
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Menu;
