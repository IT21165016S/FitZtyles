import { Box, useMediaQuery } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import CustomFlex from "../components/CustomFlex";
import DeleteModal from "../components/DeleteModal";
import ProfileViewModal from "../components/ProfileViewModal";
import WidgetWrapper from "../components/WidgetWrapper";
import WorkoutModal from "../components/WorkoutModal";
import UserWidget from "../components/widgets/UserWidget";

const Workouts = () => {
  const user = useSelector((state) => state.user);
  const [apiData, setApiData] = useState(null);
  const [refresh, setRefresh] = useState(false);
  const [openModalId, setOpenModalId] = useState(null);
  const [openEditModalId, setOpenEditModalId] = useState(null);
  const [openDeleteModalId, setOpenDeleteModalId] = useState(null);
  const navigator = useNavigate();
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");


  const BACKEND_URL = process.env.REACT_APP_BACKEND_API_URL;

  useEffect(() => {
    axios
      .get(`${BACKEND_URL}/api/workouts/`)
      .then((result) => {
        setApiData(result.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [refresh]);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${BACKEND_URL}/api/workouts/${id}`);
      console.log("successfully removed");
      toast.success("Successfully Removed!");
      setRefresh(!refresh);
    } catch (error) {
      console.log(error);
      toast.error("Error while deleting!");
    }
  };

  const handleNavigation = () => {
    navigator("/workouts/create");
  };

  const makeRefresh = () => {
    setRefresh(!refresh);
  };

  const handleEditing = (postID) => {
    console.log("Handle Editing");
    setOpenModalId(null);
    setOpenEditModalId(postID);
  };

  const closeEditing = () => {
    console.log("Handle Editing");
    setOpenModalId(null);
    setOpenEditModalId(null);
  };

  const handleConfirmDelete = (postId) => {
    setOpenDeleteModalId(postId);
  };

  return (
    <Box>
      <Box
        padding="2rem"
        m="2rem auto"
        // display={isNonMobileScreens ? "flex" : "block"}
        gap="0.5rem"
        justifyContent="space-between"
        className="flex flex-row w-full max-[975px]:flex-col"
      >

        <Box flexBasis={isNonMobileScreens ? "26%" : undefined}
          className=""
        >
          <UserWidget user={user.user} />
        </Box>
        <Box
          flexBasis={isNonMobileScreens ? "42%" : undefined}
          mt={isNonMobileScreens ? undefined : "2rem"}
          className="flex-grow"
        >

          <div className="flex-grow w-full">
            <h1 className="text-4xl pb-3 pt-6 font-extrabold text-center text-gray-700 dark:text-black-200">

              Workout Plans{" "}
            </h1>

            <div className="flex flex-row items-center justify-end">
              <button
                type="button"
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                onClick={handleNavigation}
              >
                Create Workout
              </button>
            </div>

            <div className="grid min-[1900px]:grid-cols-4 2xl:grid-cols-3 md:grid-cols-2 max-md:grid-cols-1 m-auto justify-items-center align-items-center">

              {apiData &&
                apiData.map((post, index) => (
                  <div
                    key={index}
                    className="relative flex flex-col justify-between mt-8 bg-slate-400 text-gray-700 shadow-lg shadow-gray-400 bg-clip-border rounded-xl w-72"
                  >
                    <WorkoutModal
                      openModal={openEditModalId === post.id}
                      setOpenModal={() => setOpenEditModalId(null)}
                      data={post}
                      postId={post.id}
                      index={index}
                      makeRefresh={makeRefresh}
                      closeEditing={closeEditing}
                    />
                    <ProfileViewModal
                      openModal={openModalId === post.id}
                      setOpenModal={() => setOpenModalId(null)}
                      data={post}
                      index={index}
                      handleEdit={() => {
                        handleEditing(post.id);
                      }}
                    />
                    <DeleteModal
                      openModal={openDeleteModalId === post.id}
                      setOpenModal={() => setOpenDeleteModalId(null)}
                      data={post}
                      index={index}
                      handleDelete={() => {
                        handleDelete(post.id)
                          .then(() => {
                            console.log("Deleted successfully");
                          })
                          .catch(() => {
                            console.log("Deleted Failed");
                          });
                      }}
                    />

                    <div className="flex justify-between items-center p-4">
                      <img
                        className="w-10 h-10 rounded-full ring-2 ring-black/50 dark:ring-gray-500 object-cover object-top"
                        src={post.userPhoto}
                        alt="Bordered avatar"
                      />
                      <div className="flex space-x-2">
                        {user.user.id === post.userId && <button
                          className="inline-flex items-center justify-center w-8 h-8 text-pink-100 transition-colors duration-150 bg-pink-700 rounded-lg focus:shadow-outline hover:bg-pink-800"
                          onClick={(e) => {
                            e.preventDefault();
                            handleConfirmDelete(post.id);
                          }}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                            />
                          </svg>
                        </button>}
                      </div>
                    </div>
                    <div
                      className=" cursor-pointer hover:opacity-75 transition-all delay-300"
                      onClick={() => setOpenModalId(post.id)}
                    >
                      <div className="relative mx-4 mt-4 overflow-hidden text-gray-700 shadow-lg bg-clip-border rounded-xl h-40 transition-all duration-300">
                        <LazyLoadImage
                          src={post.postImage}
                          alt="profile-picture"
                        />
                      </div>
                      <div className="p-6 text-center">
                        <h4 className="block mb-2 font-sans text-2xl font-semibold leading-snug tracking-normal text-blue-50">
                          {post.workoutName}
                        </h4>
                      </div>
                    </div>
                    <div className="flex justify-start pr-1 pl-1 pb-1">
                      <button
                        type="button"
                        className="w-2/6 px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-s-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-blue-500 dark:focus:text-white"
                        onClick={(e) => {
                          e.preventDefault();
                          console.log("liked");
                        }}
                      >
                        Like
                      </button>
                      <button
                        type="button"
                        className="w-2/6 px-4 py-2 text-sm font-medium text-gray-900 bg-white border-t border-b border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-blue-500 dark:focus:text-white"
                      >
                        Comment
                      </button>
                      <button
                        type="button"
                        className="w-2/6 px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-e-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-blue-500 dark:focus:text-white"
                      >
                        Share
                      </button>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </Box>
        {/* {isNonMobileScreens && <Box flexBasis="26%"></Box>} */}
      </Box>
    </Box>
  );
};

export default Workouts;
