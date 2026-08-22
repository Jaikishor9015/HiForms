import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FileText, Mail, Lock, User, Eye, EyeOff } from "lucide-react";

import AuthNavbar from "../components/AuthNavbar";
import AuthFooter from "../components/AuthFooter";

function UserAuth() {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");

    if (!formData.email || !formData.password) {
      setError("Please fill in all required fields.");
      return;
    }

    if (!isLogin) {
      if (!formData.name) {
        setError("Please enter your name.");
        return;
      }

      if (formData.password !== formData.confirmPassword) {
        setError("Passwords do not match.");
        return;
      }

      try {
        const response = await fetch("http://localhost:5000/api/auth/signup", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: formData.name,
            email: formData.email,
            password: formData.password,
          }),
        });

        const data = await response.json();

        if (!response.ok) {
          setError(data.message);
          return;
        }

        console.log("Signup successful:", data);

        alert("Account created successfully!");

        setFormData({
          name: "",
          email: "",
          password: "",
          confirmPassword: "",
        });

        setIsLogin(true);
      } catch (error) {
        console.error("Signup error:", error);
        setError("Unable to connect to server.");
      }
    } else {
      try {
        const response = await fetch("http://localhost:5000/api/auth/login", {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            email: formData.email,
            password: formData.password,
          }),
        });

        const data = await response.json();

        if (!response.ok) {
          setError(data.message);
          return;
        }

        console.log("Login successful:", data);

        localStorage.setItem("token", data.token);

        localStorage.setItem(
          "user",
          JSON.stringify({
            name: data.name,
            email: data.email,
            userId: data.userId,
          }),
        );

        navigate("/user-dashboard");
      } catch (error) {
        console.error("Login error:", error);
        setError("Unable to connect to server.");
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <AuthNavbar />

      <main className="flex-1 flex items-center justify-center bg-gray-50 px-6 py-12">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-md p-8">
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <FileText size={40} className="text-blue-600" />
            </div>

            <h1 className="text-3xl font-bold text-gray-900">
              {isLogin ? "Welcome Back!" : "Create Your Account"}
            </h1>

            <p className="text-gray-500 mt-2">
              {isLogin
                ? "Login to continue to HiForms"
                : "Join HiForms and start connecting"}
            </p>
          </div>

          <div className="flex bg-gray-100 rounded-lg p-1 mb-6">
            <button
              onClick={() => setIsLogin(true)}
              className={`w-1/2 py-2 rounded-md font-medium transition ${
                isLogin ? "bg-white text-blue-600 shadow-sm" : "text-gray-500"
              }`}
            >
              Login
            </button>

            <button
              onClick={() => setIsLogin(false)}
              className={`w-1/2 py-2 rounded-md font-medium transition ${
                !isLogin ? "bg-white text-blue-600 shadow-sm" : "text-gray-500"
              }`}
            >
              Sign Up
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name
                </label>

                <div className="relative">
                  <User
                    size={18}
                    className="absolute left-3 top-3 text-gray-400"
                  />

                  <input
                    type="text"
                    name="name"
                    placeholder="Enter your name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-lg pl-10 pr-4 py-2.5 outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>

              <div className="relative">
                <Mail
                  size={18}
                  className="absolute left-3 top-3 text-gray-400"
                />

                <input
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg pl-10 pr-4 py-2.5 outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>

              <div className="relative">
                <Lock
                  size={18}
                  className="absolute left-3 top-3 text-gray-400"
                />

                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg pl-10 pr-12 py-2.5 outline-none focus:ring-2 focus:ring-blue-500"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            {!isLogin && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Confirm Password
                </label>

                <div className="relative">
                  <Lock
                    size={18}
                    className="absolute left-3 top-3 text-gray-400"
                  />

                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    name="confirmPassword"
                    placeholder="Confirm your password"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-lg pl-10 pr-12 py-2.5 outline-none focus:ring-2 focus:ring-blue-500"
                  />

                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600"
                  >
                    {showConfirmPassword ? (
                      <EyeOff size={20} />
                    ) : (
                      <Eye size={20} />
                    )}
                  </button>
                </div>
              </div>
            )}

            {error && (
              <p className="text-red-500 text-sm text-center">{error}</p>
            )}

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition"
            >
              {isLogin ? "Login" : "Create Account"}
            </button>
          </form>

          <p className="text-center text-sm text-gray-500 mt-6">
            {isLogin ? "Don't have an account? " : "Already have an account? "}

            <button
              onClick={() => setIsLogin(!isLogin)}
              className="text-blue-600 font-medium hover:underline"
            >
              {isLogin ? "Sign Up" : "Login"}
            </button>
          </p>
        </div>
      </main>

      <AuthFooter />
    </div>
  );
}

export default UserAuth;
