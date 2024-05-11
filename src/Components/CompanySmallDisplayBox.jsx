import { Button } from "@mui/material";
import React, { useState } from "react";

const CompanySmallDisplayBox = ({
  item,
  onClick,
  onAccept,
  onReject,
  type,
  onAddFriend,
}) => {
  return (
    <div
      onClick={onClick}
      className="bg-neutral5 min-h-[150px] max-w-[49%] mb-4 px-4 py-2 rounded-md"
    >
      <div className="flex items-center justify-between">
        <p className="text-[20px] text-[#4640DE] cursor-pointer font-medium">
          {item.companyName}
        </p>
        <div className="flex gap-x-2">
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
        </div>
      </div>
      <p className="text-[15px] mt-[6px] cursor-pointer text-neutral2">
        {item.categories.slice(" ").join(", ")}
      </p>
      <p className="text-[15px] cursor-pointer text-neutral2">
        {item.telephone1}
      </p>
      <p className="text-[16px] cursor-pointer mt-1">
        {item.description.substring(0, 120)}...
      </p>
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
export default CompanySmallDisplayBox;
