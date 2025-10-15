import React, { useState } from "react";
import Banner from '../../components/common/Banner';

import { useTheme } from "../../context/ThemeContext";

function ProfilePage() {
   const { theme, toggleTheme } = useTheme();

  // Example initial values, replace with real user data as needed
  const [formData, setFormData] = useState({
    username: "john_doe",
    email: "john@example.com",
    oldPassword: "",
    password: "",
    confirmPassword: "",
  });

  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simple validation example
    if (!formData.oldPassword) {
      setErrorMsg("Please enter your old password.");
      setSuccessMsg("");
      return;
    }
    if (formData.password && formData.password !== formData.confirmPassword) {
      setErrorMsg("Passwords do not match.");
      setSuccessMsg("");
      return;
    }
    // TODO: Add API call to update password here
    setSuccessMsg("Password updated successfully!");
    setErrorMsg("");
    setFormData((prev) => ({
      ...prev,
      oldPassword: "",
      password: "",
      confirmPassword: "",
    }));
  };
  
  return (
    <div className='flex'>
      {/* Main Content */}
      <div className="ml-64 flex-1 w-220 bg-slate-100 dark:bg-zinc-800 min-h-screen py-8">
        {/* My Profile Banner */}
        <Banner header="My Profile" title="Profile" />
            
          <div className="w-full p-8 rounded-lg shadow-lg bg-slate-100 dark:bg-zinc-800">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">My Profile</h2>
            <button
              onClick={toggleTheme}
              className="px-3 py-1 rounded bg-gray-200 dark:bg-zinc-700 text-gray-800 dark:text-gray-200 transition-colors cursor-pointer"
            >
              {theme === "dark" ? "Light Mode" : "Dark Mode"}
            </button>
          </div>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-gray-700 dark:text-gray-200 mb-1">Username</label>
              <input
                type="text"
                name="username"
                className="w-full px-3 py-2 rounded border border-gray-300 dark:border-zinc-700 bg-gray-200 dark:bg-zinc-900 text-gray-900 dark:text-white cursor-not-allowed"
                value={formData.username}
                disabled
                readOnly
              />
            </div>
            <div>
              <label className="block text-gray-700 dark:text-gray-200 mb-1">Email</label>
              <input
                type="email"
                name="email"
                className="w-full px-3 py-2 rounded border border-gray-300 dark:border-zinc-700 bg-gray-200 dark:bg-zinc-900 text-gray-900 dark:text-white cursor-not-allowed"
                value={formData.email}
                disabled
                readOnly
              />
            </div>
            <div>
              <label className="block text-gray-700 dark:text-gray-200 mb-1">Old Password</label>
              <input
                type="password"
                name="oldPassword"
                className="w-full px-3 py-2 rounded border border-gray-300 dark:border-zinc-700 bg-white dark:bg-zinc-700 text-gray-900 dark:text-white"
                value={formData.oldPassword}
                onChange={handleChange}
                autoComplete="current-password"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 dark:text-gray-200 mb-1">New Password</label>
              <input
                type="password"
                name="password"
                className="w-full px-3 py-2 rounded border border-gray-300 dark:border-zinc-700 bg-white dark:bg-zinc-700 text-gray-900 dark:text-white"
                value={formData.password}
                onChange={handleChange}
                autoComplete="new-password"
              />
            </div>
            <div>
              <label className="block text-gray-700 dark:text-gray-200 mb-1">Confirm Password</label>
              <input
                type="password"
                name="confirmPassword"
                className="w-full px-3 py-2 rounded border border-gray-300 dark:border-zinc-700 bg-white dark:bg-zinc-700 text-gray-900 dark:text-white"
                value={formData.confirmPassword}
                onChange={handleChange}
                autoComplete="new-password"
              />
            </div>
            {errorMsg && (
              <div className="text-red-500 text-sm">{errorMsg}</div>
            )}
            {successMsg && (
              <div className="text-green-500 text-sm">{successMsg}</div>
            )}
            <button
              type="submit"
              className="w-full py-2 rounded bg-blue-600 hover:bg-blue-700 text-white font-semibold transition-colors"
            >
              Save Changes
            </button>
          </form>
        </div>
      </div>
  </div>
);

}

export default ProfilePage;