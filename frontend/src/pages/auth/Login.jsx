import { Link } from "react-router-dom";

import AuthLayout from "../../auth/AuthLayout";
import Button from "../../components/ui/Button";
import Input from "../../components/ui/Input";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { login } from "../../services/authService";
import { saveToken } from "../../utils/tokenStorage";

import {
    Mail,
    Lock
} from "lucide-react";

function Login() {

    const navigate = useNavigate();

    const [loginData, setLoginData] = useState({

        email: "",

        password: ""

    });

  const handleChange = (event) => {

      const { name, value } = event.target;

      setLoginData(previous => ({

          ...previous,

          [name]: value

      }));

  };
 const handleSubmit = async (event) => {

     event.preventDefault();

     try {

         const response = await login(loginData);
         saveToken(response.data.token);
         navigate("/");

     } catch (error) {

         console.error(error);

     }

 };

    return (

        <AuthLayout>

            <h2 className="text-4xl font-bold tracking-tight text-slate-900">
                Welcome Back 👋
            </h2>

            <p className="mt-3 text-base leading-7 text-slate-500">
                Sign in to continue your SmartStore journey.
            </p>

            <form
                onSubmit={handleSubmit}
                className="mt-10 space-y-6"
            >

                <Input
                    label="Email"
                    type="email"
                    name="email"
                    value={loginData.email}
                    onChange={handleChange}
                    placeholder="Enter your email"
                    icon={Mail}
                />

                <Input
                    label="Password"
                    type="password"
                    name="password"
                    value={loginData.password}
                    onChange={handleChange}
                    placeholder="Enter your password"
                    icon={Lock}
                />

                <div className="flex justify-end pt-1">

                    <button
                        type="button"
                        className="text-sm font-semibold text-emerald-600 transition hover:text-emerald-700 hover:underline"
                    >

                        Forgot Password?

                    </button>

                </div>

                <Button
                    type="submit"
                    variant="primary"
                    className="w-full py-4"
                >
                    Login
                </Button>
            </form>

            <p className="mt-8 text-center text-sm text-slate-500">

                Don't have an account?

                <Link
                    to="/register"
                    className="ml-1 font-semibold text-emerald-600 transition hover:text-emerald-700 hover:underline"
                >

                    Create an account

                </Link>

            </p>

        </AuthLayout>

    );

}

export default Login;