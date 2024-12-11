"use client";

import React from "react";
import { motion } from "framer-motion"; // Adding some animation for smooth transitions

const HomePage = () => {
  return (
    <div className="min-h-screen flex items-center justify-between bg-gradient-to-r from-gray-100 to-gray-300 p-8">
      {/* Left side - Title and Description */}
      <div className="pl-16 max-w-2xl">
        {/* Motion effects for the title and description */}
        <motion.h1
          className="text-5xl font-bold text-gray-800 mb-6"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          IDS SMART CITY PORTAL
        </motion.h1>

        <motion.p
          className="text-lg text-gray-600"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          This is a portal to interact with the Cornell IDS Labratory's Smart
          City, through designing experiments online and uploading them to be
          run. You have the choice of physically running the experiment or
          running it through a simulation for immediate feedback.
        </motion.p>
      </div>

      {/* Right side - Space for logo */}
      <div className="flex-1 flex justify-end pr-16">
        <motion.div
          className="rounded-lg flex items-center justify-center"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
        >
          {/* Placeholder for logo */}
          <p className=" text-center">
            <motion.img
              src="/robo_city_img.jpg"
              alt="Smart City Logo"
              className="p-40 w-100 h-auto"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
            />
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default HomePage;
