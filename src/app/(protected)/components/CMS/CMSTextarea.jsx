const CMSTextarea = ({
    value,
    onChange,
    rows = 3
}) => {
    return (
        <textarea

            className="
          w-full rounded-md border border-white/10 bg-[#1f1f1f]
          px-3 py-2 text-sm text-white
          focus:border-blue-500/60 focus:outline-none
        "
            value={value}
            onChange={onChange}
            rows={rows}

        />
    );
};

export default CMSTextarea;
