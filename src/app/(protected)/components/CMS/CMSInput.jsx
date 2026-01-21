// components/cms/CMSInput.js
const CMSInput = ({
    value,
    onChange,
    readOnly = false,
    type = "text"
}) => {
    return (
        <input
            className={`
                w-full rounded-md border 
                ${readOnly ? "cursor-not-allowed focus:outline-none focus:ring-0" : "focus:border-blue-500/60 focus:outline-none"}
                border-white/10 bg-[#1f1f1f] 
                px-3 py-2 text-sm text-white
            `}
            
            value={value}
            onChange={onChange && ((e) => onChange(e))}
            readOnly={readOnly}
            type={type}
        />
    );
};

export default CMSInput;
