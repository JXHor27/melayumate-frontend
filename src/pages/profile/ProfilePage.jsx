import React, { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { FaSignOutAlt, FaMoon, FaSun } from 'react-icons/fa';
import Banner from '../../components/common/Banner';
import SlidingSidebar from '../../components/common/SlidingSidebar';
import SnackbarAlert from "../../components/common/SnackbarAlert";
import { useAuth } from '../../context/AuthContext';
import { useTheme } from "../../context/ThemeContext";
import useUserDetail from "../../hooks/auth/useUserDetail";
import useChangePassword from "../../hooks/auth/useChangePassword";
function ProfilePage() {
  const { logout } = useAuth();
  const { theme, toggleTheme } = useTheme();

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [oldPasswordVisible, setOldPasswordVisible] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);

  const [oldPasswordEmptyError, setOldPasswordEmptyError] = useState(false);
  const [newPasswordEmptyError, setNewPasswordEmptyError] = useState(false);
  const [confirmPasswordEmptyError, setConfirmPasswordEmptyError] = useState(false);
  const [passwordNotMatchError, setPasswordNotMatchError] = useState(false);
  const [passwordValidationError, setPasswordValidationError] = useState(false);
  const [passwordUpdateError, setPasswordUpdateError] = useState(false);
  const [passwordUpdateMessage, setPasswordUpdateMessage] = useState('');
  const [passwordUpdateSuccess, setPasswordUpdateSuccess] = useState(false);

  const { formData, setFormData } = useUserDetail();
  const { changePassword } = useChangePassword( {setPasswordUpdateError, setPasswordUpdateMessage} );

  function handleSidebarToggle(){
    setSidebarOpen(!sidebarOpen);
  }

  function toggleOldPasswordVisibility() {
    setOldPasswordVisible(!oldPasswordVisible);
  };

  function togglePasswordVisibility() {
    setPasswordVisible(!passwordVisible);
  }

  function toggleConfirmPasswordVisibility() {
    setConfirmPasswordVisible(!confirmPasswordVisible);
  }

  function validatePassword(password){
        const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
        return regex.test(password);
  };

  function handleChange(e) {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  function handleLogout(e){
    e.preventDefault();
    logout();
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!formData.oldPassword.trim()) {
      setOldPasswordEmptyError(true);
      return;
    }
    if (!formData.password.trim()) {
      setNewPasswordEmptyError(true);
      return;
    }
    if (!formData.confirmPassword.trim()) {
      setConfirmPasswordEmptyError(true);
      return;
    }

    if (formData.password && formData.password !== formData.confirmPassword) {
      setPasswordNotMatchError(true);
      return;
    }

    if(!validatePassword(formData.password)){
      setPasswordValidationError(true);
      return;
    }


    const result = await changePassword(formData.oldPassword, formData.password, formData.confirmPassword);
    if (!result) {
      setPasswordUpdateError(true);
      return;
    }
    setPasswordUpdateSuccess(true);
    setFormData((prev) => ({
      ...prev,
      oldPassword: "",
      password: "",
      confirmPassword: "",
    }));
  };
  
  return (
    <div className='flex'>
      {/* Mobile Sidebar Component */}
      <SlidingSidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setSidebarOpen(false)}
          style={{ pointerEvents: "auto" }}
        />
      )}

      {/* Main Content */}
      <div className="ml-0 sm:ml-64 flex-1 bg-slate-100 dark:bg-zinc-800 text-white min-h-screen py-8">
        {/* My Profile Banner */}
        <Banner header="My Profile" title="Profile" onOpen={sidebarOpen} handleSidebarToggle={handleSidebarToggle}/>

        {/* My Profile Card */}  
        <div className="w-full p-3 sm:p-8 rounded-lg shadow-lg bg-slate-100 dark:bg-zinc-800">
          {/* <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">My Profile</h2>
            <button
              onClick={toggleTheme}
              className="px-3 py-1 rounded bg-gray-300 dark:bg-zinc-700 text-black dark:text-gray-200 transition-colors cursor-pointer"
            >
              {theme === "dark" ? "Light Mode" : "Dark Mode"}
            </button>
          </div> */}
            {/* --- HEADER --- */}
            <div className="flex justify-between items-center mb-8">
              <h1 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">My Profile</h1>
              {/* Dark Mode Toggle */}
              <div className="flex items-center gap-2">
                <FaSun className={theme !== "dark" ? 'text-yellow-400' : 'text-slate-500'} />
                <button 
                  onClick={toggleTheme}
                  className={`relative inline-flex items-center h-6 rounded-full w-11 transition-colors cursor-pointer
                    ${theme === "dark" ? 'bg-purple-600' : 'bg-slate-600'}
                  `}
                >
                  <span className={`inline-block w-4 h-4 transform bg-white rounded-full transition-transform
                    ${theme === "dark" ? 'translate-x-6' : 'translate-x-1'}
                  `} />
                </button>
                <FaMoon className={theme === "dark" ? 'text-purple-400' : 'text-slate-500'} />
              </div>
            </div>

            {/* --- PROFILE CONTENT --- */}
            <div className="text-gray-900 dark:text-gray-100 bg-slate-200 dark:bg-slate-950 border-1 border-slate-700 dark:border-slate-500 rounded-2xl shadow-xl">
              
              {/* --- Upper Section: User Info --- */}
              <div className="p-3 sm:p-8 border-b border-slate-700 dark:border-slate-500 flex flex-col sm:flex-row items-center gap-6">
                <div className="text-center sm:text-left">
                  <h2 className="text-2xl font-semibold">{formData.username}</h2>
                  <p className="text-gray-900 dark:text-slate-300">{formData.email}</p>
                </div>
              </div>

              {/* --- Lower Section: Change Password Form --- */}
              <form onSubmit={handleSubmit}>
                <div className="p-2 sm:p-8">
                  <h3 className="text-lg font-semibold mb-6">Change Password</h3>
                  <div className="grid grid-cols-1 gap-6">
                    {/* Password Fields */}
                    <label className="block text-sm font-medium text-gray-800 dark:text-slate-300 -mb-4">Old Password</label>
                    <div className="w-full px-4 py-2 rounded-lg bg-slate-300 dark:bg-slate-900 border-1 dark:border-2 border-slate-700 flex justify-between items-center focus-within:ring-1" >
                      <input
                        type={oldPasswordVisible ? "text" : "password"}
                        maxLength={16}
                        className="display:none w-full rounded-full outline-none placeholder-gray-300"
                        name="oldPassword"
                        value={formData.oldPassword}
                        onChange={handleChange}
                      /> 
                      <span><FontAwesomeIcon
                        icon={oldPasswordVisible ? faEyeSlash : faEye}
                        onClick={toggleOldPasswordVisibility}
                        style={{ cursor: 'pointer'}}/>
                      </span>
                    </div>
                    <label className="block text-sm font-medium text-gray-800 dark:text-slate-300 -mb-4">New Password</label>
                    <div className="w-full px-4 py-2 rounded-lg bg-slate-300 dark:bg-slate-900 border-1 dark:border-2 border-slate-700 flex justify-between items-center focus-within:ring-1" >
                      <input
                        type={passwordVisible ? "text" : "password"}
                        maxLength={16}
                        className="display:none w-full rounded-full outline-none placeholder-gray-300"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                      /> 
                      <span><FontAwesomeIcon
                        icon={passwordVisible ? faEyeSlash : faEye}
                        onClick={togglePasswordVisibility}
                        style={{ cursor: 'pointer'}}/>
                      </span>
                    </div>
                    <label className="block text-sm font-medium text-gray-800 dark:text-slate-300 -mb-4">Confirm Password</label>
                    <div className="w-full px-4 py-2 rounded-lg bg-slate-300 dark:bg-slate-900 border-1 dark:border-2 border-slate-700 flex justify-between items-center focus-within:ring-1" >
                      <input
                        type={confirmPasswordVisible ? "text" : "password"}
                        maxLength={16}
                        className="display:none w-full rounded-full outline-none placeholder-gray-300"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                      /> 
                      <span><FontAwesomeIcon
                        icon={confirmPasswordVisible ? faEyeSlash : faEye}
                        onClick={toggleConfirmPasswordVisibility}
                        style={{ cursor: 'pointer'}}/>
                      </span>
                    </div>
                  </div>
                </div>
                
                {/* --- Action Panel --- */}
                <div className="bg-slate-200/90 dark:bg-slate-800/50 p-4 flex justify-between items-center rounded-b-2xl border-t border-slate-700">
                  <button
                    type="button"
                    onClick={handleLogout}
                    className="flex items-center gap-2 px-4 py-2 text-red-500 dark:text-red-400 font-semibold hover:bg-red-500/20 dark:hover:bg-red-500/10 rounded-lg cursor-pointer"
                  >
                    <FaSignOutAlt />
                    Logout
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-yellow-400 hover:bg-yellow-500 text-black font-semibold rounded-lg shadow-lg cursor-pointer"
                  >
                    Save Changes
                  </button>
                </div>
              </form>
            </div>
          </div>
          {/* <form className="space-y-4">
            <div>
              <label className="block text-gray-800 dark:text-gray-200 mb-1">Username</label>
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
              <label className="block text-gray-800 dark:text-gray-200 mb-1">Email</label>
              <input
                type="email"
                name="email"
                className="w-full px-3 py-2 rounded border border-gray-300 dark:border-zinc-700 bg-gray-200 dark:bg-zinc-900 text-gray-900 dark:text-white cursor-not-allowed"
                value={formData.email}
                disabled
                readOnly
              />
            </div>
             <span>
                <FontAwesomeIcon
                  className="text-black dark:text-white absolute right-10 mt-10"
                  icon={oldPasswordVisible ? faEyeSlash : faEye}
                  onClick={toggleOldPasswordVisibility}
                  style={{ cursor: 'pointer'}}/>
              </span>
            <div>
              <label className="block text-gray-800 dark:text-gray-200 mb-1">Old Password</label>
              <input
                type={oldPasswordVisible ? "text" : "password"}
                name="oldPassword"
                className="w-full px-3 py-2 rounded border border-gray-300 dark:border-zinc-700 bg-white dark:bg-zinc-700 text-gray-900 dark:text-white"
                value={formData.oldPassword}
                onChange={handleChange}
              />
            </div>
            <span>
                <FontAwesomeIcon
                  className="text-black dark:text-white absolute right-10 mt-10"
                  icon={passwordVisible ? faEyeSlash : faEye}
                  onClick={togglePasswordVisibility}
                  style={{ cursor: 'pointer'}}/>
              </span>
            <div>
              <label className="block text-gray-800 dark:text-gray-200 mb-1">New Password</label>
              <input
                type={passwordVisible ? "text" : "password"}
                name="password"
                className="w-full px-3 py-2 rounded border border-gray-300 dark:border-zinc-700 bg-white dark:bg-zinc-700 text-gray-900 dark:text-white"
                value={formData.password}
                onChange={handleChange}
              />
            </div>

            <span>
                <FontAwesomeIcon
                  className="text-black dark:text-white absolute right-10 mt-10"
                  icon={confirmPasswordVisible ? faEyeSlash : faEye}
                  onClick={toggleConfirmPasswordVisibility}
                  style={{ cursor: 'pointer'}}/>
            </span>
            <div>
              <label className="block text-gray-800 dark:text-gray-200 mb-1">Confirm Password</label>
              <input
                type={confirmPasswordVisible ? "text" : "password"}
                name="confirmPassword"
                className="w-full px-3 py-2 rounded border border-gray-300 dark:border-zinc-700 bg-white dark:bg-zinc-700 text-gray-900 dark:text-white"
                value={formData.confirmPassword}
                onChange={handleChange}
              />
            </div>
            <div className="flex justify-between gap-4">
            <button
              className="self-center w-50 py-2 rounded bg-blue-600 dark:bg-blue-500 hover:bg-blue-700 dark:hover:bg-blue-600 text-white font-semibold transition-colors cursor-pointer"
              onClick={handleSubmit}
            >
              Save Changes
            </button>
            <button
              className="self-center w-20 py-2 rounded bg-red-600 dark:bg-red-500 hover:bg-red-700 dark:hover:bg-red-600 text-white font-semibold transition-colors cursor-pointer"
              onClick={handleLogout}
            >
              Logout
            </button>
            </div>
          </form> */}
        </div>

        {/* Old Password Empty Alert */}
        <SnackbarAlert
          open={oldPasswordEmptyError}
          onClose={() => setOldPasswordEmptyError(false)}
          severity="error"
          message="Please enter your old password."
        />

        {/* New Password Empty Alert */}
        <SnackbarAlert
          open={newPasswordEmptyError}
          onClose={() => setNewPasswordEmptyError(false)}
          severity="error"
          message="Please enter your new password."
        />

        {/* Confirm Password Empty Alert */}
        <SnackbarAlert
          open={confirmPasswordEmptyError}
          onClose={() => setConfirmPasswordEmptyError(false)}
          severity="error"
          message="Please enter confirm password."
        />

        {/* Password Not Much Alert */}
        <SnackbarAlert
          open={passwordNotMatchError}
          onClose={() => setPasswordNotMatchError(false)}
          severity="error"
          message="New password and confirmation do not match."
        />

         {/* Password Validation Alert */}
        <SnackbarAlert
          open={passwordValidationError}
          onClose={() => setPasswordValidationError(false)}
          autoHideDuration={2500}
          severity="error"
          message="Password must be at least 8 characters long and include uppercase, lowercase, number, and special character."
        />

        {/* Password Update Error Alert */}
        <SnackbarAlert
          open={passwordUpdateError}
          onClose={() => setPasswordUpdateError(false)}
          severity="error"
          message={passwordUpdateMessage}
        />
        {/* Password Update Success Alert */}
        <SnackbarAlert
          open={passwordUpdateSuccess}
          onClose={() => setPasswordUpdateSuccess(false)}
          severity="success"
          message="Password updated successfully."
        />
      </div>
);

}

export default ProfilePage;