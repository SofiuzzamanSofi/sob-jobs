"use client";

import React from "react";
import modalEmoji from "../../assets/modalEmoji.png"
import Image from "next/image";

interface AlertModalProps {
  isOpenModal: boolean;
  setIsOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
  submitIsOpenJobs: () => void;
  isOpen: boolean | undefined;
}

const AlertModal: React.FC<AlertModalProps> = ({
  isOpenModal,
  setIsOpenModal,
  submitIsOpenJobs,
  isOpen,
}) => {
  return (
    <div
      className={`transition-all duration-300 ${isOpenModal ? "scale-100" : "scale-0"
        } fixed top-0 left-0 right-0 bottom-0 w-full h-full bg-black/70 flex items-center justify-center z-[100]`}
      onClick={(e) => {
        if (e.target !== e.currentTarget) {
          return;
        }
        setIsOpenModal((prev) => !prev);
      }}
    >
      <div className="bg-white w-[500px] py-10 px-4 rounded-xl dark:text-slate-700">
        <div className="flex items-center justify-center gap-3">
          <h2 className="text-3xl font-semibold">
            Almost Done!
          </h2>
          <Image
            className="w-7"
            src={modalEmoji}
            alt="flower"
          />
        </div>
        <div className="text-center mt-3">
          <p>Present Status: {isOpen ? "Open" : "Closed"}</p>
          <p>Do you want to {!isOpen ? "Open" : "Closed"} your Job.</p>
        </div>
        <div className="text-center">
          <button className="inline-block py-2 bg-primary/10 p-5 text-primary px-8 rounded-full mt-3"
            onClick={submitIsOpenJobs}
          >
            Submit For {!isOpen ? "Open" : "Closed"} Job
          </button>
        </div>
      </div>
    </div>
  );
};

export default AlertModal;