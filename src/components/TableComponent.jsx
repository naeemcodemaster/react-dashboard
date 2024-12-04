import React, { useState, useEffect } from "react";

const TableComponent = ({ tableData, setStartDate, setEndDate, setSortType }) => {
  const [localStartDate, setLocalStartDate] = useState("");
  const [localEndDate, setLocalEndDate] = useState("");
  const [localSortType, setLocalSortType] = useState("Type");
  const [resources, setResources] = useState([]); // State to store fetched resources

  console.log(localSortType);

  useEffect(() => {
    // Fetch resources from the API on component mount
    const fetchResources = async () => {
      try {
        const response = await fetch("https://monitoring-steel.vercel.app/resources");
        const data = await response.json();
        setResources(data); // Store fetched resources in state
      } catch (error) {
        console.error("Failed to fetch resources:", error);
      }
    };

    fetchResources();
  }, []);

  const applyFilter = () => {
    setStartDate(localStartDate);
    setEndDate(localEndDate);
    setSortType(localSortType);
  };

  const clearFilter = () => {
    // Clear local states
    setLocalStartDate("");
    setLocalEndDate("");
    setLocalSortType("Type");
  
    // Reset filters in parent state immediately
    setStartDate("");
    setEndDate("");
    setSortType(""); // Assuming an empty value fetches all data
  };
  

  return (
    <div className="text-gray-800 dark:text-white p-2 w-full">
      <h1 className="text-xl font-bold mb-0">Critical Alerts</h1>
      <div className="flex flex-wrap gap-4 justify-between items-center mb-2">
        <span className="text-sm w-full sm:w-auto">10 Today</span>
        <div className="flex flex-wrap gap-4">
          {/* Start Date Input */}
          <input
            type="date"
            className="bg-gray-100 border border-gray-200 dark:bg-[#262626] dark:border-gray-700 text-gray-800 dark:text-gray-300 px-3 py-2 rounded-md focus:outline-none w-full sm:w-auto"
            value={localStartDate}
            onChange={(e) => setLocalStartDate(e.target.value)}
          />
          {/* End Date Input */}
          <input
            type="date"
            className="bg-gray-100 border border-gray-200 dark:bg-[#262626] dark:border-gray-700 text-gray-800 dark:text-gray-300 px-3 py-2 rounded-md focus:outline-none w-full sm:w-auto"
            value={localEndDate}
            onChange={(e) => setLocalEndDate(e.target.value)}
          />
          {/* Sort Dropdown */}
          <select
            className="bg-gray-100 border border-gray-200 dark:bg-[#262626] dark:border-gray-700 text-gray-800 dark:text-gray-300 px-3 py-2 rounded-md focus:outline-none w-full sm:w-auto"
            value={localSortType}
            onChange={(e) => setLocalSortType(e.target.value)}
          >
            <option value="Type" disabled>
              Type
            </option>

            {/* Dynamically populate options from fetched resources */}
            {resources.map((resource, index) => (
              <option key={index} value={resource}>
                {resource}
              </option>
            ))}
          </select>
          {/* Apply Filter Button */}
          <button
            className="bg-blue-500 text-white w-full sm:w-auto px-6 py-2 rounded-lg hover:bg-blue-600"
            onClick={applyFilter}
          >
            Apply Filter
          </button>

          <button
            className="bg-blue-500 text-white w-full sm:w-auto px-6 py-2 rounded-lg hover:bg-blue-600"
            onClick={clearFilter}
          >
            Clear
          </button>
        </div>
      </div>

      {/* Table Container for Large Screens */}
      <div className="md:block overflow-x-auto">
        <table className="w-full border-collapse">
          {/* Table Header */}
          <thead className="hidden md:table-header-group">
            <tr>
              <th className="border-b text-xs border-gray-300 dark:border-gray-600 px-4 py-2 text-left">
                Source
              </th>
              <th className="border-b text-xs border-gray-300 dark:border-gray-600 px-4 py-2 text-left">
                Description
              </th>
              <th className="border-b text-right text-xs border-gray-300 dark:border-gray-600 px-4 py-2">
                Date & Time
              </th>
            </tr>
          </thead>

          {/* Table Body */}
          <tbody>
            {tableData.map((row, index) => (
              <tr
                key={index}
                className="hover:bg-gray-200 dark:hover:bg-[#262626] hover:rounded-md transition duration-150 flex flex-col md:table-row"
              >
                {/* Mobile View Content */}
                <td className="px-4 text-xs py-2.5 whitespace-nowrap md:table-cell">
                  <span className="block md:hidden font-semibold">Source:</span>
                  {row.resource}
                </td>
                <td className="px-4 text-gray-400 text-xs py-2 md:table-cell md:text-left">
                  <span className="block md:hidden font-semibold truncate">
                    Description:
                  </span>
                  {row.description}
                </td>
                <td className="px-4 text-xs py-2 text-right md:table-cell">
                  <span className="block md:hidden font-semibold">
                    Date & Time:
                  </span>
                  {row.dateTime}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TableComponent;
