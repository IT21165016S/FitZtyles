import { useState } from "react";

const ActivityModel = ({ addActivity, handleClose }) => {
  const [inputData, setInputData] = useState({
    activity: "",
    sets: "",
  });
  const [error, setError] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInputData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (inputData.activity.length <= 0) {
      setError("Activity Field required");
      return;
    } else if (inputData.sets.length <= 0) {
      setError("Sets Field required");
      return;
    } else {
      setError("");

      addActivity(inputData.activity, inputData.sets);
      console.log("Input data:", inputData);
      handleClose();
    }
  };

  return (
    <div className="">
      <div className="z-50 h-96 w-80 items-center justify-center overflow-y-auto overflow-x-hidden md:inset-0">
        <div className="relative max-h-full w-full max-w-md p-4">
          <div className="relative rounded-lg bg-white shadow dark:bg-gray-700">
            <div className="flex items-center justify-between rounded-t border-b p-4 md:p-5 dark:border-gray-600">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                Workout Details
              </h3>
              <button
                type="button"
                onClick={handleClose}
                className="end-2.5 ms-auto inline-flex h-8 w-8 items-center justify-center rounded-lg bg-transparent text-sm text-gray-400 hover:bg-gray-200 hover:text-gray-900 dark:hover:bg-gray-600 dark:hover:text-white"
                data-modal-hide="authentication-modal"
              >
                <svg
                  className="h-3 w-3"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 14"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                  />
                </svg>
                <span className="sr-only">Close modal</span>
              </button>
            </div>

            <div className="p-4 md:p-5">
              <div className="space-y-4">
                <div>
                  <label
                    htmlFor="activity"
                    className="mb-2 pl-2 block text-sm text-left font-medium text-gray-900 dark:text-white"
                  >
                    Activity Name
                  </label>
                  <input
                    type="text"
                    name="activity"
                    id="activity"
                    className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-500 dark:bg-gray-600 dark:text-white dark:placeholder-gray-400"
                    value={inputData.activity}
                    placeholder="Squars"
                    required
                    onChange={handleInputChange}
                  />
                </div>

                <div className={`mb-2`}>
                  <label
                    htmlFor="sets"
                    className="mb-2 pl-2 block text-sm text-left font-medium text-gray-900 dark:text-white"
                  >
                    Count
                  </label>
                  <input
                    type="text"
                    name="sets"
                    id="sets"
                    className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-500 dark:bg-gray-600 dark:text-white dark:placeholder-gray-400"
                    placeholder="5 sets"
                    value={inputData.sets}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                {error && (
                  <span className="text-red-700 text-xs font-bold font-sans">
                    {error}
                  </span>
                )}
                <button
                  type="button"
                  className="w-full mt-4 rounded-lg bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  onClick={handleSubmit}
                >
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ActivityModel;
