import React, { useState } from "react";
import ComboboxUi from "../components/Combobox";
import axios from "axios";
import { useSelector } from "react-redux";
import useStorage from "../hooks/useStorage";
import ActivityModel from "../components/ActivityModel";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function UpdateWorkoutPage({
  data,
  postId,
  makeRefresh,
  closeEditing,
}) {
  const user = useSelector((state) => state.user);
  const navigator = useNavigate();

  const [selectedFile, setSelectedFile] = useState(
    data?.postImage ? true : null
  );
  const [progress, setProgress] = useState(null);
  const [error, setError] = useState(null);
  const [url, setUrl] = useState(data.postImage);
  const [preview, setPreview] = useState(data.postImage);
  const [isSubmitting, setIsSubmitting] = useState(false);

  console.log({ "Progress is : ": progress });

  const { startUpload } = useStorage(setProgress, setError, setUrl);
  const [selectedActivities, setSelectedActivities] = useState([]);

  const people = [
    { id: 1, name: "Beginner" },
    { id: 2, name: "Intermediate" },
    { id: 3, name: "Advanced" },
    {
      id: 4,
      name: "Elite",
    },
    { id: 5, name: "Specialized" },
  ];
  const [selected, setSelected] = useState(
    data?.difficulty
      ? people.find((person) => person.name === data.difficulty)
      : people[0]
  );
  const [validationError, setValidationError] = useState("");

  const [activities, setActivities] = useState(data.activity);

  function initDate(diff) {
    let arr = [];

    for (let i = 0; i < parseInt(diff); i++) {
      arr.push({
        id: i + 1,
        name: `Day ${i + 1}`,
      });
    }
    return arr;
  }

  const [dates, setDates] = useState(initDate(data.days));
  const [workoutName, setWorkoutName] = useState(data?.workoutName);
  const [toggleModel, setToggleModel] = useState(false);

  const addActivity = (name, duration) => {
    const newActivity = {
      id: activities.length + 1,
      name: name,
      durations: duration,
    };
    setActivities([...activities, newActivity]);
  };
  const addDate = () => {
    const newDate = {
      id: dates.length + 1,
      name: `Day ${dates.length + 1}`,
    };
    setDates([...dates, newDate]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      if (!workoutName.trim()) {
        setValidationError("Workout name is required.");
        toast.error("Workout name is required.");
        return;
      }

      if (!selectedFile) {
        setValidationError("Please select workout image");
        toast.error("Please select workout image");
        return;
      }
      if (!url) {
        setValidationError("Error while uploading image");
        toast.error("Error while uploading image");
        return;
      }
      if (dates.length <= 0) {
        setValidationError("Add at least one day");
        toast.error("Add at least one day");
      } else if (activities.length <= 0) {
        setValidationError("Add at least one activity");
        toast.error("Add at least one activity");
      } else {
        const data = {
          userId: user.user.id,
          workoutName: workoutName,
          difficulty: selected.name,
          days: dates.length,
          postImage: url,
          activity: activities,
        };
        console.log(data);

        const response = await axios.put(
          `http://localhost:8081/api/workouts/edit/${postId}`,
          {
            ...data,
          }
        );

        console.log(response);

        toast.success("Successfully added new Workout.");

        setValidationError("");
        setPreview(null);
        setError(null);
        setProgress(null);
        setSelectedFile(null);
        setActivities([]);
        setDates([]);
        setWorkoutName("");

        makeRefresh();
        closeEditing();
      }
    } catch (error) {
      setValidationError(error?.response?.data);
      console.log(error);
      toast.error("Error while submitting Workout");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e) => {
    e.preventDefault();
    setWorkoutName(e.target.value);
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);

      startUpload(e.target.files[0]);
      const selectedImageFile = new FileReader();

      selectedImageFile.onload = function () {
        setPreview(selectedImageFile.result);
      };

      selectedImageFile.readAsDataURL(e.target.files[0]);
    }
  };
  const handleImageRemove = () => {
    setSelectedFile(null);
    setPreview(null);
    setUrl("");
  };
  const closeActivityModel = (e) => {
    e.preventDefault();
    setToggleModel(!toggleModel);
  };

  const handleActivitySelect = (id) => {
    if (selectedActivities.includes(id)) {
      setSelectedActivities(
        selectedActivities.filter((activityId) => activityId !== id)
      );
    } else {
      setSelectedActivities([...selectedActivities, id]);
    }
  };

  const handleActivityRemove = () => {
    const updatedActivities = activities.filter(
      (activity) => !selectedActivities.includes(activity.id)
    );
    setSelectedActivities([]);
    setActivities(updatedActivities);
  };

  const handleDateRemove = () => {
    const updatedDates = dates.slice(0, -1);
    setDates(updatedDates);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className=" relative flex flex-col justify-center place-content-center w-fit m-auto px-10 pt-2 pb-6 rounded-2xl"
    >
      {toggleModel && (
        <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50">
          <ActivityModel
            addActivity={addActivity}
            handleClose={() => {
              setToggleModel(!toggleModel);
            }}
          />
        </div>
      )}
      {toggleModel && (
        <div
          className="fixed top-0 left-0 w-full h-full bg-black opacity-50 z-40"
          onClick={closeActivityModel} // Close the activity model when clicking on the backdrop
        ></div>
      )}
      <h1 className="text-3xl pb-2 font-extrabold text-center text-black dark:text-gray-200">
        Update Workout
      </h1>

      <div className="flex flex-row items-center  justify-end pt-10 pb-10">
        <span className="mx-auto  text-xs text-red-700 font-bold text-center">
          {validationError}
        </span>
        <button
          className="absolute flex flex-row disabled:cursor-not-allowed items-center gap-2 cursor-pointer text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
          type="submit"
          disabled={isSubmitting}
        >
          Save changes
          <span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 16.5V9.75m0 0 3 3m-3-3-3 3M6.75 19.5a4.5 4.5 0 0 1-1.41-8.775 5.25 5.25 0 0 1 10.233-2.33 3 3 0 0 1 3.758 3.848A3.752 3.752 0 0 1 18 19.5H6.75Z"
              />
            </svg>
          </span>
        </button>
      </div>

      <div className="grid grid-cols-2 max-md:grid-cols-1 gap-y-10 gap-x-20">
        <div className="flex items-center justify-center w-72 h-72 rounded-lg relative z-10">
          {selectedFile ? (
            <div>
              <div
                className="absolute top-1 right-1 rounded-full p-1 bg-slate-100/90 hover:bg-slate-100 transition-all duration-1000 cursor-pointer z-50"
                onClick={handleImageRemove}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-5 h-5 text-red-700"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                  />
                </svg>
              </div>
              {parseInt(progress) < 100 && (
                <div className="absolute w-full h-full transition-all duration-1000  rounded-lg  z-40">
                  <div
                    className={`bg-blue-600 h-full text-xs flex flex-col  font-medium text-blue-100 text-center p-0.5 leading-none rounded-lg opacity-75 transition-all duration-1000 items-center justify-center `}
                    style={{ width: `${Math.round(parseFloat(progress))}%` }}
                  >
                    {" "}
                    <span className="transition-all duration-1000 font-bold">
                      {progress && `${Math.round(parseFloat(progress))}%`}
                    </span>
                  </div>
                </div>
              )}
              <img
                className="rounded-lg w-72 h-72 object-cover transition-all duration-1000"
                src={preview}
                style={{ opacity: `${parseFloat(progress) < 100 ? 0.5 : 1}` }}
              />
            </div>
          ) : (
            <label
              htmlFor="dropzone-file"
              className={`flex flex-col items-center justify-center z-10 w-full h-full border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600`}
            >
              <div className="flex flex-col items-center justify-center pt-5 pb-6 z-10">
                <svg
                  className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 16"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                  />
                </svg>
                <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                  <span className="font-semibold">Click to upload</span>
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  PNG, JPG (MAX. 800x400px)
                </p>
              </div>

              <input
                id="dropzone-file"
                type="file"
                accept="image/jpeg, image/png, image/gif, image/bmp, image/webp"
                onChange={handleFileChange}
                className="hidden"
              />
            </label>
          )}
        </div>

        <div className="max-w-xs rounded-lg border border-gray-200 bg-gray-100 p-6 shadow dark:border-gray-700 dark:bg-gray-800">
          <div className="mb-3">
            <h5 className="mb-2 text-lg font-bold tracking-tight text-gray-900 dark:text-white">
              Workout name
            </h5>
            <input
              type="text"
              id="default-input"
              onChange={handleChange}
              value={workoutName}
              required
              className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
            />
          </div>
          <div className="flex flex-col relative">
            <h5 className="mb-2 text-lg font-bold tracking-tight text-gray-900 dark:text-white">
              Difficulty
            </h5>
            <div className="">
              <ComboboxUi
                selected={selected}
                setSelected={setSelected}
                people={people}
              />
            </div>
          </div>
        </div>

        <div className="max-w-xs h-fit rounded-lg border border-gray-200 bg-gray-100 p-6 shadow dark:border-gray-700 dark:bg-gray-800">
          <div className="mb-4 flex flex-row justify-between">
            <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white">
              Days
            </h5>
            <div
              className="h-fit w-fit cursor-pointer rounded-full bg-blue-500 p-2"
              onClick={addDate}
            >
              <span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                  stroke="currentColor"
                  className="h-6 w-6 text-white"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 4.5v15m7.5-7.5h-15"
                  />
                </svg>
              </span>
            </div>
          </div>
          <div className="flex flex-col gap-2 h-72 pr-4 overflow-y-scroll">
            {dates.map((date) => {
              return (
                <div
                  key={date.id}
                  className="flex items-center justify-between max-w-sm text-left rounded-lg border border-gray-200 bg-white p-2 shadow dark:border-gray-700"
                >
                  <div>{date.name}</div>

                  {dates?.length === date.id && (
                    <span
                      onClick={(e) => {
                        e.preventDefault();
                        handleDateRemove();
                      }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="w-[20px] h-[20px] text-black hover:text-red-700 hover:cursor-pointer"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M6 18 18 6M6 6l12 12"
                        />
                      </svg>
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        <div className="max-w-xs h-fit rounded-lg border border-gray-200 bg-gray-100 p-6 shadow dark:border-gray-700 dark:bg-gray-800">
          <div className="mb-4 flex flex-row justify-between">
            <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white">
              Activities
            </h5>

            <div className="flex gap-3">
              <div
                className="h-fit w-fit cursor-pointer rounded-full bg-red-500 hover:bg-red-400 delay-300 transition-all p-2"
                onClick={(e) => {
                  e.preventDefault();
                  handleActivityRemove();
                }}
              >
                <span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-[18px] h-[18px] text-white"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                    />
                  </svg>
                </span>
              </div>
              <div
                className="h-fit w-fit cursor-pointer rounded-full bg-blue-500 hover:bg-blue-400 delay-300 transition-all p-2"
                onClick={(e) => {
                  e.preventDefault();
                  setToggleModel(!toggleModel);
                }}
              >
                <span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="2"
                    stroke="currentColor"
                    className="w-[18px] h-[18px] text-white"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 4.5v15m7.5-7.5h-15"
                    />
                  </svg>
                </span>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-2 h-72 pr-4 overflow-y-scroll">
            {activities.map((activity) => {
              return (
                <div
                  key={activity.id}
                  className="max-w-sm cursor-pointer rounded-lg border border-gray-200 bg-white p-2 shadow dark:border-gray-700"
                >
                  <div className="flex flex-row items-center gap-5">
                    <img
                      className="h-16 w-16 rounded-full object-cover"
                      src="https://images.unsplash.com/photo-1536922246289-88c42f957773?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8Z3ltJTIwZ2lybCUyMHNxdWF0fGVufDB8fDB8fHww"
                      alt=""
                    />
                    <div className="pla flex grow flex-row items-center justify-between gap-2">
                      <div className="flex flex-col items-start">
                        <span className="font-bold">{activity.name}</span>
                        <span className="text-sm">{activity.durations}</span>
                      </div>
                      <div className="pr-4">
                        <input
                          type="checkbox"
                          className="cursor-pointer"
                          checked={selectedActivities.includes(activity.id)}
                          onChange={() => handleActivitySelect(activity.id)}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </form>
  );
}
