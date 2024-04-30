import React, { useEffect, useMemo, useState } from "react";
import { companies, projects } from "../../assets/data/dummyData";
import AppButton from "../../Components/AppButton";
import ConfirmationModal from "../../Components/ConfirmationModal";
import AppInput from "../../Components/AppInput";
import { ComponentButton } from "../../Components/ProjectDisplayBox";
import { Input, InputLabel, OutlinedInput } from "@mui/material";

const ProjectDetailsPage = () => {
  const [project, setProject] = useState(projects[1]);
  const [openConfModal, setOpenConfModal] = useState(false);
  const [minuteChange, setMinuteChange] = useState(false);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setMinuteChange((prevValue) => !prevValue);
    }, 60000); // Update every minute (60000 milliseconds)

    // Clear interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  const remainingTime = useMemo(() => {
    const bidStartTime = new Date(project.bidStartTime);
    const bidEndTime = new Date(project.bidEndTime);
    const currentTime = new Date();

    const timeRemainingMs = bidEndTime - currentTime;
    const timeToStartMs = bidStartTime - currentTime;

    // Convert milliseconds to hours and minutes
    const hoursRemaining = Math.floor(timeRemainingMs / (1000 * 60 * 60));
    const minutesRemaining = Math.floor(
      (timeRemainingMs % (1000 * 60 * 60)) / (1000 * 60)
    );
    const hoursToStart = Math.floor(timeToStartMs / (1000 * 60 * 60));
    const minutesToStart = Math.floor(
      (timeToStartMs % (1000 * 60 * 60)) / (1000 * 60)
    );
    const isStarted = currentTime >= bidStartTime;
    return {
      toStartHours: hoursToStart,
      toStartMinutes: minutesToStart,
      toEndHours: hoursRemaining,
      toEndMinutes: minutesRemaining,
      isStarted,
    };
  }, [minuteChange]);

  return (
    <div className="w-full bg-neutral7 flex justify-center overflow-y-scroll min-h-full">
      <div className="maxW py-3 gap-x-2 flex">
        <div className="w-[50%]">
          <div className="">
            <p className="text-3xl font-medium">{project.title}</p>
            <p className="text-[18px] text-neutral2 mt-3 ">
              {project.description}
            </p>
          </div>
          <div className="mt-4">
            <p className="text-xl font-medium">Categories</p>
            <div className="flex mt-2 gap-x-5 items-center">
              <p className="text-[18px] text-neutral2">
                {project.categories.slice(" ").join(", ")}
              </p>
            </div>
          </div>
          <div className="mt-4">
            <p className="text-xl font-medium">Project Deadlines</p>
            <div className="flex mt-2 gap-x-5 gap-y-1 flex-wrap">
              <p className="text-[18px] text-neutral2">
                Work Starting on :{" "}
                <span className="text-primary hover:underline">
                  {project.workStartDate}
                </span>
              </p>
              <p className="text-[18px] text-neutral2">
                Work Ending on :{" "}
                <span className="text-primary hover:underline">
                  {project.workEndDate}
                </span>
              </p>
            </div>
          </div>
          <div className="mt-4">
            <p className="text-xl font-medium">
              Bid Base Price :{" "}
              <span className="text-primary">{project.bidBasePrice} AED</span>
            </p>
            {remainingTime.isStarted ? (
              <p className="text-xl mt-4 font-medium">
                Bid Expires In :{" "}
                <span className="text-red">
                  {remainingTime.toEndHours} hours, {remainingTime.toEndMinutes}{" "}
                  minutes
                </span>
              </p>
            ) : (
              <p className="text-xl mt-4 font-medium">
                Bid Starts In :{" "}
                <span className="text-primary">
                  {remainingTime.toStartHours} hours,{" "}
                  {remainingTime.toStartMinutes} minutes
                </span>
              </p>
            )}
            <div className="mt-4">
              <ComponentButton
                title={"Place Your Bid"}
                color={"primary"}
                onClick={() => setOpenConfModal(true)}
              />
            </div>
          </div>
          <div className="flex gap-x-5 justify-end mt-5">
            {/* <AppButton onClick={declineClick} bgColor={"red"} text={"Decline"} />
          <AppButton onClick={acceptClick} bgColor={"green"} text={"Approve"} /> */}
          </div>

          {/* <PdfComponent
          open={openPdfModal}
          file={PdfFile}
          handleClose={() => setOpenPdfModal(false)}
        /> */}
        </div>
        {/* Bidding Details */}
        <div className="px-10 flex-1">
          <div className="">
            <p className="text-3xl font-medium">Bidding History</p>
            <div className="mt-5 rounded-xl overflow-scroll">
              {[1, 2, 3, 4, 5, 6, 7].map((it, ind) => (
                <div
                  className={`${ind % 2 == 0 && "bg-neutral5"} p-3 w-full`}
                  key={it}
                >
                  <p className="text-xl font-medium">Anonymous User</p>
                  <p className="text-xl font-medium">
                    Bid Amount :{" "}
                    <span className="text-primary">{8000} AED</span>
                  </p>
                  <p className=" ">{ind} hours ago</p>
                </div>
              ))}
            </div>
          </div>
        </div>
        <ConfirmationModal
          open={openConfModal}
          onConfirm={() => console.log("Bid placed Confirmed")}
          handleClose={() => setOpenConfModal(false)}
          data={{
            title: "Place Your Bid",
            body: (
              <ComponentInput
                onChange={(e) => console.log("HELLoooo", e.target.value)}
              />
            ),
          }}
        />
      </div>
    </div>
  );
};

const ComponentInput = ({ value, onChange }) => {
  return (
    <>
      <input
        value={value}
        onChange={onChange}
        type={"number"}
        className="px-4 w-[300px] my-2 mr-4 py-3 text-black rounded-md outline-none text-base font-normal placeholder-neutral4 border border-[#D6DDEB] border-solid"
        placeholder={`Enter Bid Amount`}
      />
    </>
  );
};
export default ProjectDetailsPage;
