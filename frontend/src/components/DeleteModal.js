import { Dialog, Transition } from "@headlessui/react";
import React, { Fragment, useState } from "react";
import WorkoutPage from "../pages/WorkoutPage";
import UpdateWorkoutPage from "../pages/UpdateWorkoutPage";

export default function DeleteModal(props) {
  const { openModal, setOpenModal, data, handleDelete } = props;

  function closeModal() {
    console.log("CLose");
    setOpenModal(false);
  }

  return (
    <>
      <Transition appear show={openModal} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-fit max-w-3xl transform overflow-hidden rounded-2xl bg-slate-400 shadow-slate-500 text-left align-middle shadow-xl transition-all">
                  <div className="">
                    {
                      <div className="flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
                        <div className="bg-white p-6 rounded-lg">
                          <p className="mb-4">
                            Are you sure you want to delete this{" "}
                            <span className="font-bold text-red-500">
                              {data.workoutName}
                            </span>{" "}
                            post?
                          </p>
                          <div className="flex justify-end">
                            <button
                              className="mr-2 px-4 py-2 bg-red-500 text-white rounded"
                              onClick={(e) => {
                                e.preventDefault();
                                handleDelete();
                                closeModal();
                              }}
                            >
                              Delete
                            </button>
                            <button
                              className="px-4 py-2 bg-gray-300 text-gray-800 rounded"
                              onClick={(e) => {
                                e.preventDefault();
                                closeModal();
                              }}
                            >
                              Cancel
                            </button>
                          </div>
                        </div>
                      </div>
                    }
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
