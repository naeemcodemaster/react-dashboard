import { useEffect, useState } from "react";
import { FaBarsProgress } from "react-icons/fa6";
import { IoTimerOutline } from "react-icons/io5";
import LineChart from "../components/LineChart";
import TableComponent from "../components/TableComponent";

const Dashboard = ({ darkMode, toggleSidebar }) => {
  const [chartData, setChartData] = useState([]); // State for chart data
  const [cpuLoad, setCpuLoad] = useState(null); // State for CPU load time
  const [queryResponse, setQueryResponse] = useState(null); // State for query response time
  const [tableData,setTableData] = useState([]);


  // Filters for API
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [sortType, setSortType] = useState("Type");
  console.log("in dashbaord type is ", typeof(sortType))

  const fetchData = async () => {
    try {
      // Construct query parameters based on filters
      const params = new URLSearchParams();
      if (startDate) params.append("startDate", startDate);
      if (endDate) params.append("endDate", endDate);
      if (sortType !== "Type") params.append("source", sortType);

      const response = await fetch(
        // `http://localhost:5000/performance?${params.toString()}`
        `https://monitoring-steel.vercel.app/performance?${params.toString()}`
      );
      const data = await response.json();

      // Process the response to get data for chart and info cards
      const chartData = data.map((item) => ({
        dateTime: new Date(item.dateTime).toLocaleTimeString(),
        cpuLoadTime: item.cpuLoadTime,
        queryResponseTime: item.queryResponseTime,
      }));

      const latestCpuLoad = data[data.length - 1]?.cpuLoadTime;
      const latestQueryResponse = data[data.length - 1]?.queryResponseTime;

      const tableData = data.map((item) => ({
        dateTime: new Date(item.dateTime).toLocaleString(),
        resource: item.source,
        description: item.description,
      }));

      setTableData(tableData);
      setChartData(chartData);
      setCpuLoad(latestCpuLoad);
      setQueryResponse(latestQueryResponse);
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };

  // Fetch data initially and on filter changes
  useEffect(() => {
    fetchData();
  }, [startDate, endDate, sortType]);

  return (
    <div className="flex flex-col gap-2 w-full overflow-x-hidden">
      {/* Reduced gap */}
      <div
        className="bg-white border dark:border-[#4b4b4b] dark:bg-[#262626] p-3 rounded-lg shadow-md 
                 overflow-x-hidden w-[98%] md:w-[100%] ml-1 md:ml-0 flex items-center justify-between"
      >
        <p className="text-[12px] text-gray-900 dark:text-gray-200">
          {/* Hamburger icon */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="w-6 h-6 md:hidden" // This makes the icon only visible on mobile (hidden on desktop)
            onClick={toggleSidebar} // Add functionality to open the sidebar
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </p>

        <p className="text-[14px] text-gray-900 dark:text-gray-500">Dashboard</p>
        <img
          src="profile.jpg"
          alt="Profile"
          className="w-6 h-6 rounded-full object-cover shadow-lg"
        />
      </div>

      <div className="md:flex gap-2 md:w-full w-[98%] ml-1 md:ml-0 mt-2">
        {/* Chart Section */}
        <div
          className="bg-white dark:bg-[#262626] p-4 rounded-lg shadow-md 
               overflow-x-hidden w-full md:w-3/4"
        >
          {/* Pass data to LineChart component */}
          <LineChart darkMode={darkMode} chartData={chartData} />
        </div>

        {/* Info Cards Section */}
        <div className="flex flex-col w-full md:w-1/4 gap-2 md:mt-0 mt-2">
          {/* First Div */}
          <div className="h-[120px] rounded-lg bg-conical-green flex flex-col justify-center">
            <div className="rounded-full p-2">
              <FaBarsProgress className="text-conical-green text-xl bg-white rounded-sm text-[#0f8d65] p-1" />
            </div>
            <p className="text-white text-[12px] px-2">Query Response</p>
            <p className="text-white font-bold text-[16px] px-2">{queryResponse} MS</p>
          </div>

          {/* Second Div */}
          <div className="h-[120px] rounded-lg bg-conical-blue flex flex-col justify-center">
            <div className="rounded-full p-2">
              <IoTimerOutline className="text-conical-blue text-xl bg-white rounded-sm text-[#373cd5] p-1" />
            </div>
            <p className="text-white  text-[12px] px-2">CPU Load Time</p>
            <p className="text-white font-bold text-[16px] px-2">{cpuLoad} MS</p>
          </div>
        </div>
      </div>

      {/* Table Section */}
      {/* Pass data to TableComponent */}
      <TableComponent tableData={tableData}
        setStartDate={setStartDate}
        setEndDate={setEndDate}
        setSortType={setSortType}/>
    </div>
  );
};

export default Dashboard;
