import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import Button from "../Button/Buttons";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false); // new state

  const handleSubmit = (e) => {
    e.preventDefault(); // prevent page refresh

    if (!email || !password) {
      toast.error("Please fill in both fields!");
    } else {
      toast.success(`Submitted!\nEmail: ${email}\nPassword: ${password}`);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen ">
      {/* Toaster must be at the root of your component tree */}
      <Toaster position="top-center" reverseOrder={false} />

      <div className="w-full max-w-sm p-6 bg-white rounded-2xl shadow-md">
        <h2 className="!text-3xl font-extrabold  text-center mt-4 ">Sign In</h2>

        <form onSubmit={handleSubmit} className="space-y-4 p-4">
          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full mt-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Password */}
          <div className="py-3">
            <label className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type={showPassword ? "text" : "password"} // toggle type
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="w-full mt-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            {/* Show/Hide Password Checkbox */}
            <div className="mt-2 flex items-center space-x-2 py-2 ">
              <input
                type="checkbox"
                id="showPassword"
                checked={showPassword}
                onChange={() => setShowPassword(!showPassword)}
                className="h-4 w-4 text-blue-600 border-gray-300 rounded"
              />
              <label htmlFor="showPassword" className="text-sm text-gray-700 !pl-2  ">
                Show Password
              </label>
            </div>
          </div>




          {/* Submit Button */}
          <div className="flex items-center justify-center ">
            <Button type="submit" label={"Sign in"} variant="primary" />
          </div>
        </form>

        <p className=" text-center text-sm text-gray-600">
          Don’t have an account?{" "}
          <a href="#" className="text-blue-600 hover:underline">
            Sign Up
          </a>
        </p>
      </div>
    </div>
  );
}
