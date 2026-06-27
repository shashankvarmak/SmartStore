import { Link } from "react-router-dom";

import AuthLayout from "../../auth/AuthLayout";
import Button from "../../components/ui/Button";
import Input from "../../components/ui/Input";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { register } from "../../services/authService";

import {
    User,
    Mail,
    Phone,
    Lock
} from "lucide-react";

function Register() {


    const navigate = useNavigate();

    const [registerData, setRegisterData] = useState({

        name: "",

        email: "",

        phoneNumber: "",

        password: "",

        confirmPassword: ""

    });
const handleChange = (event) => {

    const { name, value } = event.target;

    setRegisterData(previous => ({

        ...previous,

        [name]: value

    }));

};
const handleSubmit = async (event) => {

    event.preventDefault();

    if (registerData.password !== registerData.confirmPassword) {

        alert("Passwords do not match");

        return;

    }

    try {

        const request = {

            name: registerData.name,

            email: registerData.email,

            phoneNumber: registerData.phoneNumber,

            password: registerData.password

        };

        await register(request);


        alert("Registration Successful");

        navigate("/login");

    }

    catch (error) {

        console.error(error);


            console.error(error);

            console.log(error.response);

            console.log(error.response?.data);

            console.log(error.response?.status);

            alert("Registration Failed");



        alert("Registration Failed");

    }

};
    return (

        <AuthLayout>

            <h2 className="text-4xl font-bold tracking-tight text-slate-900">
                Create Your Account
            </h2>

            <p className="mt-3 text-base leading-7 text-slate-500">
                Create your account and reserve groceries with ease.
            </p>

            <form

                onSubmit={handleSubmit}

                className="mt-8 space-y-5"

            >

                <div className="grid grid-cols-2 gap-4">

                    <Input
                        label="Full Name"
                        name="name"
                        value={registerData.name}
                        onChange={handleChange}
                        icon={User}
                        placeholder="Enter your name"
                    />

                    <Input
                        label="Phone Number"
                        name="phoneNumber"
                        value={registerData.phoneNumber}
                        onChange={handleChange}
                        icon={Phone}
                        placeholder="Enter phone number"
                    />

                </div>

                <Input
                    label="Email"
                    type="email"
                    name="email"
                    value={registerData.email}
                    onChange={handleChange}
                    icon={Mail}
                    placeholder="Enter your email"
                />

                <Input
                    label="Password"
                    type="password"
                    name="password"
                    value={registerData.password}
                    onChange={handleChange}
                    icon={Lock}
                    placeholder="Create password"
                />

                <Input
                    label="Confirm Password"
                    type="password"
                    name="confirmPassword"
                    value={registerData.confirmPassword}
                    onChange={handleChange}
                    icon={Lock}
                    placeholder="Confirm password"
                />

                <Button

                    type="submit"

                    variant="primary"

                    className="w-full py-4"

                >

                    Register

                </Button>

            </form>

            <p className="mt-8 text-center text-sm text-slate-500">

                Already have an account?

                <Link
                    to="/login"
                    className="ml-1 font-semibold text-emerald-600 transition hover:text-emerald-700 hover:underline"
                >

                    Sign in

                </Link>

            </p>

        </AuthLayout>

    );

}

export default Register;