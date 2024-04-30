import React, { useState } from "react";

const CompanyDisplayBox = ({ item, onClick }) => {
  return (
    <div className="bg-neutral5 min-h-44 mb-4 px-4 py-2 rounded-md">
      <div className="flex items-center justify-between">
        <p className="text-[20px] text-[#4640DE] font-medium">
          {item.companyName}
        </p>
        <div
          onClick={onClick}
          className={`font-epilogue text-white bg-[#4640DE] rounded-md hover:brightness-125 cursor-pointer py-1 px-2 h-fit`}
        >
          <p className={` text-base`}>View</p>
        </div>
      </div>
      <p className="text-[15px]">{item?.categories?.slice("").join(", ")}</p>
      <p className="text-[15px]">
        {item.telephone1} {item.telephone2} {item.telephone3}
      </p>
      <p className="text-[16px] mt-1">
        {item.description.substring(0, 400)}...
      </p>
    </div>
  );
};

export default CompanyDisplayBox;
