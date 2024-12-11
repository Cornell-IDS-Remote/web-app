"use client";

import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { motion } from "framer-motion";

const RegisterPage = () => {
  const router = useRouter();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await fetch("/api/users/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ firstName, lastName, email, password }),
      });

      const data = await response.json();
      if (response.ok) {
        router.push("/login"); // Redirect to the login page upon successful registration
      } else {
        throw new Error(data.message || "Registration failed");
      }
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-b from-gray-100 to-gray-200">
      <motion.div
        className="bg-white rounded-lg shadow-2xl p-8 max-w-md w-full"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold text-center text-gray-700 mb-6">
          Create an Account
        </h1>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        <form onSubmit={handleRegister}>
          <motion.div className="mb-4" transition={{ duration: 0.3 }}>
            <label
              className="block text-sm font-medium text-gray-700"
              htmlFor="firstName"
            >
              First Name
            </label>
            <input
              type="text"
              id="firstName"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="border border-gray-300 rounded-md w-full p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-lg transition duration-300"
              required
            />
          </motion.div>
          <motion.div className="mb-4" transition={{ duration: 0.3 }}>
            <label
              className="block text-sm font-medium text-gray-700"
              htmlFor="lastName"
            >
              Last Name
            </label>
            <input
              type="text"
              id="lastName"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="border border-gray-300 rounded-md w-full p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-lg transition duration-300"
              required
            />
          </motion.div>
          <motion.div className="mb-4" transition={{ duration: 0.3 }}>
            <label
              className="block text-sm font-medium text-gray-700"
              htmlFor="email"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border border-gray-300 rounded-md w-full p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-lg transition duration-300"
              required
            />
          </motion.div>
          <motion.div className="mb-6" transition={{ duration: 0.3 }}>
            <label
              className="block text-sm font-medium text-gray-700"
              htmlFor="password"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border border-gray-300 rounded-md w-full p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-lg transition duration-300"
              required
            />
          </motion.div>
          <motion.button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-md transition duration-300"
            transition={{ duration: 0.3 }}
          >
            Register
          </motion.button>
        </form>
        <p className="text-center text-sm text-gray-500 mt-4">
          Already have an account?{" "}
          <a
            href="/login"
            className="text-blue-600 hover:text-blue-700 font-semibold"
          >
            Log In
          </a>
        </p>
      </motion.div>
    </div>
  );
};

export default RegisterPage;
