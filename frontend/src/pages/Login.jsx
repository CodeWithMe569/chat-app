import { useState } from "react"
import { Link } from "react-router-dom"
import { useNavigate } from "react-router-dom"

import AuthLayout from "../layouts/AuthLayout"
import Input from "../components/ui/Input"
import Button from "../components/ui/Button"
import useForm from "../hooks/useForm"
import { login } from "../services/api"

import { Eye, EyeOff } from "lucide-react"


export default function Login() {

    const [showPassword, setShowPassword] = useState(false)

    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()


    // Validation Rules
    const validate = (v) => {
        const err = {}

        if (!v.email)
            err.email = "Email required"
        else if (!/\S+@\S+\.\S+/.test(v.email))
            err.email = "Invalid email"

        if (!v.password)
            err.password = "Password required"

        return err
    }

    const {
        values,
        errors,
        handleChange,
        runValidation
    } = useForm(
        { email: "", password: "" },
        validate
    )

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!runValidation()) return

        try {
            setLoading(true)

            const res = await login(values)

            if (res.token) {
                localStorage.setItem("token", res.token)

                navigate("/chat")
            } else {
                alert(res.msg || "Login failed")
            }

        } catch (err) {
            alert("Server error")
        } finally {
            setLoading(false)
        }
    }


    return (
        <AuthLayout title="Login">

            <form onSubmit={handleSubmit} className="space-y-4">

                {/* Email */}
                <Input
                    label="Email"
                    name="email"
                    value={values.email}
                    onChange={handleChange}
                    error={errors.email}
                />

                {/* Password */}
                <div className="relative">

                    <Input
                        label="Password"
                        name="password"
                        type={showPassword ? "text" : "password"}
                        value={values.password}
                        onChange={handleChange}
                        error={errors.password}
                    />

                    <button
                        type="button"
                        onClick={() => setShowPassword(p => !p)}
                        className="absolute right-3 top-[38px] text-slate-300 hover:text-white"
                    >
                        {showPassword
                            ? <EyeOff size={18} />
                            : <Eye size={18} />}
                    </button>

                </div>

                <Button loading={loading}>
                    Sign In
                </Button>

            </form>

            <p className="text-sm text-center mt-4">
                No account?
                <Link to="/register" className="text-indigo-400 ml-1">
                    Register
                </Link>
            </p>

        </AuthLayout>
    )
}
