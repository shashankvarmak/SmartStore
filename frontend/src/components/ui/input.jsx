import { useState } from "react";
import {
    Eye,
    EyeOff
} from "lucide-react";

function Input({

    label,
    type = "text",
    name,
    value,
    onChange,
    placeholder,
    icon: Icon

}) {

    const [showPassword, setShowPassword] = useState(false);

    const inputType =
        type === "password"
            ? (showPassword ? "text" : "password")
            : type;

    return (

        <div>

            {/* Label */}

            <label className="mb-2 block text-sm font-semibold text-slate-700">

                {label}

            </label>

            {/* Input */}

            <div className="relative">

                {/* Left Icon */}

                {Icon && (

                    <Icon
                        size={22}
                        className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400"
                    />

                )}

                <input

                    type={inputType}

                    name={name}

                    value={value}

                    onChange={onChange}

                    placeholder={placeholder}

                    className={`
                        w-full
                        rounded-2xl
                        border
                        border-slate-300
                        bg-white
                        py-4
                        ${Icon ? "pl-14" : "pl-5"}
                        ${type === "password" ? "pr-14" : "pr-5"}
                        text-slate-800
                        placeholder:text-slate-400
                        outline-none
                        transition
                        duration-200
                        focus:border-emerald-500
                        focus:ring-4
                        focus:ring-emerald-100
                    `}

                />

                {/* Password Toggle */}

                {type === "password" && (

                    <button

                        type="button"

                        onClick={() =>
                            setShowPassword(!showPassword)
                        }

                        className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-400 transition hover:text-slate-600"

                    >

                        {

                            showPassword

                                ? <EyeOff size={22} />

                                : <Eye size={22} />

                        }

                    </button>

                )}

            </div>

        </div>

    );

}

export default Input;