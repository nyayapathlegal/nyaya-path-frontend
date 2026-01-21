import React from 'react'

const TextSection = ({text}) => {
    return (
        <p 
            className="
                text-[4rem]
                sm:text-[10rem]
                md:text-[12rem]
                lg:text-[16rem]
                xl:text-[20rem]
                leading-[1em]
                text-center
                font-normal
                translate-y-[20%]
                bg-linear-to-b from-white to-white/0 
                text-transparent bg-clip-text
            "
        >
            {text}
        </p>
    )
}

export default TextSection;