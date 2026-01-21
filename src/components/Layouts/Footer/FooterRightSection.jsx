import React from "react";
import Menu from "./Menu";

const FooterRightSection = ({menuData}) => {
     return (
          <div
               className="
                    flex 
                    justify-start 
                    mr-0 sm:mr-4 md:mr-10
               "
          >
               <div
                    className="
                         grid
                         grid-cols-2 
                         sm:grid-cols-4
                         gap-6 
                         lg:gap-12
                         w-fit
                         h-fit
                         text-black hover:text-gray-500
                    "
               >
                    {
                         menuData.map((menu) => (
                              <Menu key={menu.title} title={menu.title} data={menu.data} />
                         ))
                    }
               </div>
          </div>
     );
};

export default FooterRightSection;
