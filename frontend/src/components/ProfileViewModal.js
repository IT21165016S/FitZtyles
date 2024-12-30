import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import ProfileView from "./ProfileView";

export default function ProfileViewModal(props) {
  const { openModal, setOpenModal, data, index, handleEdit } = props;

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
                <Dialog.Panel className="w-full max-w-3xl transform overflow-hidden rounded-2xl bg-gray-200 text-left align-middle shadow-xl transition-all">
                  <div className="mt-2">
                    <ProfileView
                      data={data}
                      index={index}
                      switchEditing={() => {
                        handleEdit();
                      }}
                    />
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
