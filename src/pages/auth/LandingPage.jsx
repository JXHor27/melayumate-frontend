import React, { useState } from "react";
import AuthForm from "../../components/auth/AuthForm";
import mascot from "../../assets/images/mascot_v2.png"
import branding from  "../../assets/images/branding_v3.png"
import { motion } from "framer-motion";

function LandingPage() {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-zinc-950 text-white flex flex-col items-center justify-start px-4">

      {/* Branding Logo */}
      <img className="h-50% w-60 self-start mt-2" src={branding} alt="Branding" />

      {/* Container */}
      <br/>
      <div className="w-full max-w-4xl grid md:grid-cols-2 gap-8">
        
        {/* Left - Heading */}
        <div className="flex flex-col justify-center">
          <motion.img
            src={mascot}
            alt="Mascot"
            animate={{ scale: isLogin ? 1 : 1.1, rotate: isLogin ? 0 : 5 }}
            transition={{ duration: 0.5 }}
            className={`w-40 h-auto ${isLogin ? "" : "scale-x-[-1]"}`}
          />
          <motion.div
            key={isLogin ? "login" : "register"}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="relative bg-slate-50 dark:bg-zinc-950 text-gray-900 dark:text-white rounded-xl px-4 py-2"
          >
            <p className="text-4xl font-semibold">
            {isLogin ? "Selamat Datang ke" : "Welcome to"}
            </p>
          </motion.div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 px-4 text-yellow-400">
            MelayuMate
          </h1>
          <p className="text-gray-900 dark:text-white text-lg mb-6 px-4">
            Learn Basic Malay through fun, interactive lessons tailored for UM international students.
          </p>
        </div>

        {/* Right - Form */}
        <div className="bg-slate-300 dark:bg-zinc-900 p-3 sm:p-6 rounded-2xl shadow-lg">
          <div className="flex justify-between mb-4">
            <button
              onClick={() => setIsLogin(true)}
              className={`w-1/2 py-2 font-semibold ${
                isLogin ? "bg-yellow-400 text-black" : "bg-gray-100 hover:bg-gray-200 dark:bg-gray-600 dark:hover:bg-gray-400 text-black cursor-pointer"
              } rounded-l-xl`}
            >
              Login
            </button>
            <button
              onClick={() => setIsLogin(false)}
              className={`w-1/2 py-2 font-semibold ${
                !isLogin ? "bg-yellow-400 text-black" : "bg-gray-100 hover:bg-gray-200 dark:bg-gray-600 dark:hover:bg-gray-400 text-black cursor-pointer"
              } rounded-r-xl`}
            >
              Register
            </button>
          </div>
          <AuthForm isLogin={isLogin} />
        </div>
      </div>
    </div>

  );
};

export default LandingPage;

