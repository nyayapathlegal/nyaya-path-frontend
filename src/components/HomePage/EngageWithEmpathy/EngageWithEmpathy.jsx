import { LeftSection } from "./LeftSection";
import { RightSection } from "./RightSection";

export function EngageWithEmpathy() {
    return (
        <div

            className="
                text-white 

                border border-white/10 
                rounded-2xl
                opacity-100
                mt-15
                
        
                flex   
                flex-col 

                px-1 
                py-1 
                
                sm:px-2
                sm:py-2
                sm:mt-20

                md:px-2
                md:py-2
                md:flex-row
                md:mt-30                
                
                lg:mt-40
            "
        >
            <LeftSection />
            <RightSection />
        </div>
    );
}
