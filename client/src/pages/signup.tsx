import { useState } from "react";
import { useLocation } from "wouter";
import { motion } from "framer-motion";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [, setLocation] = useLocation();

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError("Passwords don't match");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    // TEMP: Replace with real auth logic
    // For now, just redirect to onboarding
    setLocation("/onboarding");
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4">
      <motion.div 
        className="w-full max-w-md p-8 rounded-2xl shadow-xl border border-gray-200"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
          Sign up for <span className="text-black font-bold">VORTA</span>
        </h1>

        <form onSubmit={handleSignup} className="space-y-4">
          <div>
            <label className="block text-sm text-gray-600 mb-1">Email</label>
            <input 
              type="email"
              className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-black"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-sm text-gray-600 mb-1">Password</label>
            <input 
              type="password"
              className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-black"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-sm text-gray-600 mb-1">Confirm Password</label>
            <input 
              type="password"
              className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-black"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <button
            type="submit"
            className="w-full bg-black text-white py-2 rounded-xl hover:opacity-90 transition"
          >
            Sign up
          </button>
        </form>

        <p className="text-sm text-gray-600 mt-4 text-center">
          Already have an account?{" "}
          <a href="/login" className="text-black font-medium underline hover:opacity-80">
            Log in
          </a>
        </p>
      </motion.div>
    </div>
  );
}