import { Button } from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const ProjectDisplayBox = ({ item, onClick, type }) => {
  const navigate = useNavigate();

  const startTime = new Date(item.bidStartTime).getTime();
  const endTime = new Date(item.bidEndTime).getTime();
  const total = new Date(new Date(endTime - startTime));
  const expiryTime = new Date(startTime + (endTime - startTime));
  console.log(total, startTime, ":", endTime);
  //   I want to get the hours and minutes of time which is left from when the start time is deducted from the end time

  return (
    <div
      onClick={onClick}
      className="bg-neutral5 max-w-[49%] mb-4 px-4 py-2 rounded-md"
    >
      <div className="flex items-center justify-between">
        <p className="text-[20px] hover:brightness-125 text-[#4640DE] cursor-pointer font-medium">
          {item.title}
        </p>
        {/* <div className="flex gap-x-2">
          {type == "AddFriend" ? (
            <ComponentButton
              title={"Add Friend"}
              color={"primary"}
              onClick={onAddFriend}
            />
          ) : (
            <>
              <ComponentButton
                title={"Reject"}
                color={"error"}
                onClick={onReject}
              />
              <ComponentButton
                title={"Accept"}
                color={"success"}
                onClick={onAccept}
              />
            </>
          )}
        </div> */}
      </div>
      <p className="text-[15px] cursor-pointer text-neutral2">
        {item.categories.slice(",").join(", ")}
      </p>
      <p className="text-[15px] cursor-pointer text-neutral2">
        {item.telephone1}
      </p>
      <p className="text-[16px] cursor-pointer mt-1">
        {item.description.substring(0, 180)}...
      </p>
      <div className="flex justify-between">
        <p className="text-[16px] cursor-pointer mt-1">
          {/* {item.description.substring(0, 180)}... */}
        </p>
        <ComponentButton
          title={"Start Bidding"}
          color="primary"
          onClick={() => navigate("/project-details")}
        />
      </div>
    </div>
  );
};

const ComponentButton = ({ title, color, onClick }) => {
  return (
    <Button
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }}
      color={color}
      size="small"
      variant="contained"
      // className={`font-epilogue text-white bg-[#4640DE] rounded-md hover:brightness-125 cursor-pointer py-1 px-2 h-fit`}
    >
      <p className={` text-[13px]`}>{title}</p>
    </Button>
  );
};
export default ProjectDisplayBox;
export { ComponentButton };
