const customStyles = {
    control: (base) => ({
        ...base,
        borderColor: "#cbd5e1",
        "&:hover": { borderColor: "#1D4ED8" },
        boxShadow: "none",
        borderRadius: "0.375rem",
        minHeight: "2.5rem", // Changed from fixed height to minHeight
        height: "auto", // Allow height to grow
        padding: "2px", // Add some padding
    }),
    option: (base, state) => ({
        ...base,
        backgroundColor: state.isSelected
            ? "#2563EB"
            : state.isFocused
                ? "#93C5FD"
                : "white",
        color: state.isSelected ? "white" : "black",
        padding: "8px 12px",
    }),
    multiValue: (base) => ({
        ...base,
        backgroundColor: "#2563EB",
        color: "white",
        margin: "2px",
        borderRadius: "4px",
    }),
    multiValueLabel: (base) => ({
        ...base,
        color: "white",
        padding: "2px 6px",
        fontSize: "0.875rem",
    }),
    multiValueRemove: (base) => ({
        ...base,
        color: "white",
        padding: "0 4px",
        borderRadius: "0 4px 4px 0",
        "&:hover": {
            backgroundColor: "#1D4ED8",
            color: "white",
        },
    }),
    valueContainer: (base) => ({
        ...base,
        padding: "2px 8px",
        flexWrap: "wrap",
        maxHeight: "120px",
        overflowY: "auto",
    }),
    input: (base) => ({
        ...base,
        margin: "2px",
    }),
    menu: (base) => ({
        ...base,
        zIndex: 9999,
    }),
    menuList: (base) => ({
        ...base,
        maxHeight: "200px",
    }),
    container: (base) => ({
        ...base,
        width: "100%",
    }),
};

export {
    customStyles
}