import { Outlet } from 'react-router-dom';
import SidebarMenu from "../components/common/SidebarMenu";
function MainLayout() {
  return (
    <div className="flex flex-col min-h-screen">
      <SidebarMenu />
      <Outlet />
    </div>
  );
}

export default MainLayout

// import React, { useState } from 'react';
// import SidebarMenu from "../components/common/SidebarMenu";
// import { FaBars } from 'react-icons/fa';
// import { Outlet } from 'react-router-dom';

// // This component will wrap your main page content
// function MainLayout({ children }) {
//   const [isSidebarOpen, setSidebarOpen] = useState(false);

//   const toggleSidebar = () => {
//     setSidebarOpen(!isSidebarOpen);
//   };

//   return (
//     <div className="flex flex-col min-h-screen">
//       {/* --- Sidebar --- */}
//       <SidebarMenu isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
//       {/* --- Main Content --- */}
//       <div className="flex-1">
//         {/* Hamburger Menu Button - visible only on mobile */}
//         <div className="md:hidden bg-zinc-900 text-white">
//           <button onClick={toggleSidebar}>
//             <FaBars size={24} />
//           </button>
//         </div>
  
//         {/* The actual page content passed in */}
//         <main className="">
//           {children}
//         </main>
//       </div>

//       {/* --- Overlay --- */}
//       {/* Shows a dark overlay on mobile when the sidebar is open */}
//       {isSidebarOpen && (
//         <div
//           onClick={toggleSidebar}
//           className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
//         ></div>
//       )}
//     </div>
//   );
// }

// export default MainLayout;