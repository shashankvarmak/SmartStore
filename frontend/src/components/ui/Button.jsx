function Button({
    children,
    variant = "primary",
    type = "button",
    disabled = false,
    onClick,
}) {

    const variants = {
        primary:
            "rounded-full bg-emerald-600 px-6 py-3 font-semibold text-white transition hover:bg-emerald-700",

        secondary:
            "rounded-full border border-slate-300 px-6 py-3 font-semibold text-slate-700 transition hover:border-emerald-600 hover:text-emerald-600",

        danger:
            "rounded-full bg-red-600 px-6 py-3 font-semibold text-white transition hover:bg-red-700",
    };

    return (
        <button
            type={type}
            disabled={disabled}
            onClick={onClick}
            className={variants[variant] || variants.primary}
        >
            {children}
        </button>
    );
}

export default Button;