function SubText({description}) {
    return (
        <p
            className="
                opacity-90
                px-2
                mt-3
                text-base

                /* SM */
                sm:text-lg
                sm:mt-4
                sm:px-0

                /* MD */
                
            "
        >
            {
                description
            }
        </p>
    );
}

export default SubText;
