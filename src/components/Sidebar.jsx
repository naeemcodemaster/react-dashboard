import { MdDashboard } from "react-icons/md";
import { MdOutlineSecurity } from "react-icons/md";
import { GoOrganization } from "react-icons/go";
import { RiBillLine } from "react-icons/ri";
import { MdSystemUpdate } from "react-icons/md";
import { BsMoonFill, BsSunFill } from "react-icons/bs"; // Icons for Dark and Light modes

const Sidebar = ({ isMobile, toggleSidebar, toggleDarkMode, darkMode }) => {
  return (
    <div
      className={`transition-all duration-300 p-6 fixed top-0 left-0 w-64 bg-gray-100 dark:bg-[#1c1c1c] h-full z-50 ${isMobile ? "translate-x-0" : "-translate-x-full"
        } sm:translate-x-0`}
    >
      <div className="p-6 border dark:border-[#4b4b4b] bg-white dark:bg-[#262626] h-full rounded-lg shadow-md flex flex-col justify-between">
        <div>
          <h2 className={`text-xl mb-4 ${darkMode ? "text-white" : "text-black"}`}>
            ORGVISTA
          </h2>
          <small className="text-black dark:text-gray-500 px-1">Home</small>
          <ul>
            <li className="hover:bg-blue-500/20 rounded">
              <a
                href="/"
                className={`flex items-center text-xs gap-x-2 py-2 px-1 ${darkMode ? "text-white" : "text-black"}`}
              >
                <MdDashboard />
                Dashboard
              </a>
            </li>
            <li className="hover:bg-blue-500/20 rounded">
              <a
                href="/settings"
                className={`flex items-center text-xs gap-x-2 py-2 px-1 ${darkMode ? "text-white" : "text-black"}`}
              >
                <MdOutlineSecurity />
                Manage Sub Admins
              </a>
            </li>
            <li className="hover:bg-blue-500/20 rounded">
              <a
                href="/profile"
                className={`flex items-center text-xs gap-x-2 py-2 px-1 ${darkMode ? "text-white" : "text-black"}`}
              >
                <GoOrganization />
                Manage Organization
              </a>
            </li>
            <li className="hover:bg-blue-500/20 rounded">
              <a
                href="/profile"
                className={`flex items-center text-xs gap-x-2 py-2 px-1 ${darkMode ? "text-white" : "text-black"}`}
              >
                <RiBillLine />
                Billing Management
              </a>
            </li>
            <li className="hover:bg-blue-500/20 rounded">
              <a
                href="/profile"
                className={`flex items-center text-xs gap-x-2 py-2 px-1 ${darkMode ? "text-white" : "text-black"}`}
              >
                <MdSystemUpdate />
                System Update
              </a>
            </li>
          </ul>
        </div>

        {/* Dark Mode Toggle */}
        <div className="flex justify-center items-center mt-4 p-1 bg-gray-200 dark:bg-[#1c1c1c] rounded-lg gap-x-0 ">
          <button
            onClick={() => darkMode && toggleDarkMode()}
            className={`flex items-center px-4 py-2 text-xs font-medium rounded-md transition-all ${darkMode ? "bg-[#545454] text-gray-400" : "bg-transparent text-black"
              }`}
          >
            <BsSunFill className="mr-2" />
            Light
          </button>
          <button
            onClick={() => !darkMode && toggleDarkMode()}
            className={`flex items-center px-4 py-2 text-xs font-medium rounded-md transition-all ${darkMode ? "bg-transparent text-gray-400" : "bg-[#545454] text-white"
              }`}
          >
            <BsMoonFill className="mr-2 text-xs" />
            Dark
          </button>
        </div>


      </div>
    </div>
  );
};

export default Sidebar;
