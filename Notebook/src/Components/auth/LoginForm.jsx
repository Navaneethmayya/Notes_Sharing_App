import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";

       export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
   
  const handleSubmit = (e) => {
    e.preventDefault(); // prevent page refresh
   
    if (!email || !password) {
      toast.error("Please fill in both fields!");
    } 
  
    else {
      toast.success(`Submitted!\nEmail: ${email}\nPassword: ${password}`);
    }
  }; 

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      {/* Toaster must be at the root of your component tree */}
      <Toaster position="top-center" reverseOrder={false} />

      <div className="w-full max-w-sm p-6 bg-white rounded-2xl shadow-md">
        <h2 className="text-2xl font-bold text-center mb-6">Sign In</h2>
      
        <form onSubmit={handleSubmit} className="space-y-4">
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
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="w-full mt-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="mt-4 w-full py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            Sign In
          </button>
        </form>

        <p className="mt-4 text-center text-sm text-gray-600">
          Don’t have an account?{" "}
          <a href="#" className="text-blue-600 hover:underline">
            Sign Up
          </a>
        </p>
      </div>
    </div>
  );
}
