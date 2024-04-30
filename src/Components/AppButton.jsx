import React from "react";

const AppButton = ({ text, bgColor, color, onClick }) => {
  const bg = bgColor ? bgColor : "transparent";
  const clr = bgColor ? "#fff" : "#4640DE";
  const styles = {
    backgroundColor: bg,
    color: clr,
  };
  return (
    <div
      style={styles}
      onClick={onClick}
      className={`font-epilogue rounded-md hover:brightness-125 cursor-pointer py-[10px] px-5`}
    >
      <p className={`font-semibold text-base hover:underline`}>{text}</p>
    </div>
  );
};

export default AppButton;
