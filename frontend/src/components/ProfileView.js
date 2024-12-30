import React from "react";

import { useSelector } from "react-redux";

const ProfileView = ({ data, switchEditing }) => {

  const user = useSelector((state) => state.user);

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 rounded-2xl">
      <div className="flex items-center justify-around mb-8">
        <h1 className="text-3xl font-bold text-gray-800">{data.workoutName}</h1>
        {user && data && user?.user?.id === data?.userId ? (
          <span
            className="text-gray-600 flex gap-1 items-center hover:cursor-pointer hover:text-blue-600"
            onClick={(e) => {
              e.preventDefault();
              switchEditing();
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
              />
            </svg>
            Edit
          </span>) : (<></>)
        }
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <img
            src={data.postImage}
            alt={data.workoutName}
            className="w-full rounded-lg shadow-lg"
          />
        </div>
        <div>
          <div className="bg-white rounded-lg shadow-lg p-4">
            <h2 className="text-xl font-bold mb-4">Details</h2>
            <div className="flex flex-col gap-4">
              <div className="flex justify-between">
                <p className="font-semibold">Days:</p>
                <p>{data.days}</p>
              </div>
              <div className="flex justify-between">
                <p className="font-semibold">Difficulty:</p>
                <p>{data.difficulty}</p>
              </div>
            </div>
          </div>
          <div className="mt-4 bg-white rounded-lg shadow-lg p-4">
            <h2 className="text-xl font-bold mb-4">Activity</h2>
            <div className="overflow-y-auto max-h-96">
              <ul>
                {data.activity.map((activity) => (
                  <li key={activity.id} className="border-b py-2">
                    <div className="flex justify-between items-start  mx-auto">
                      <div className="flex-col flex-grow items-start px-3 ">
                        <p className="font-semibold text-left   overflow-hidden overflow-ellipsis whitespace-nowrap">
                          {activity.name}
                        </p>
                        <p className="text-gray-600 text-left  overflow-hidden overflow-ellipsis whitespace-nowrap">
                          {activity.durations}
                        </p>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileView;
