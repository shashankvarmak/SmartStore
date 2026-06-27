function Button({
    children,
    variant = "primary",
    type = "button",
    className = "",
    ...props
}) {

    const variants = {

        primary:
            "rounded-full bg-emerald-600 px-6 py-3 font-semibold text-white transition hover:bg-emerald-700",

        secondary:
            "rounded-full border border-slate-300 px-6 py-3 font-semibold transition hover:bg-slate-100",

    };

    return (

        <button

            type={type}

            className={`${variants[variant]} ${className}`}

            {...props}

        >

            {children}

        </button>

    );

}

export default Button;