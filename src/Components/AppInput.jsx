import React, { useState } from "react";

const AppInput = ({ label, name, onChange, value, type = "text" }) => {
  const styles = {
    width: label == "Company Name" ? "100%" : 400,
  };
  return (
    <div className="grid gap-y-1" style={styles}>
      <p className="text-base font-bold text-neutral2">{label}</p>
      <input
        name={name}
        style={{ width: label == "Company Name" ? "100%" : 400 }}
        value={value}
        onChange={onChange}
        accept={type == "file" && "application/pdf"}
        type={type}
        className="px-4 py-3 rounded-md outline-none text-base font-normal placeholder-neutral4 border border-[#D6DDEB] border-solid"
        placeholder={`Enter ${label}`}
      />
    </div>
  );
};
const AppInputCompany = ({
  label,
  name,
  onChange,
  value,
  type = "text",
  ...others
}) => {
  const fileType = type == "file";
  const showLabel =
    type == "date" || type == "file" || type == "datetime-local";
  const styles = {
    width: label == "Company Name" || label == "Title" ? "100%" : "48.3%",
  };
  return (
    <div className="grid gap-y-1" style={styles}>
      <p className="text-base font-bold text-neutral2">{showLabel && label}</p>
      <input
        style={{
          padding: fileType ? 1 : "12px 16px",
          width: fileType ? "fit-content" : "100%",
          border: fileType && "none",
        }}
        {...others}
        name={name}
        value={value}
        onChange={onChange}
        accept={fileType && "application/pdf"}
        type={type}
        className="px-4 py-3 rounded-md outline-none w-[100%] text-base font-normal placeholder-neutral4 border border-[#D6DDEB] border-solid"
        placeholder={`Enter ${label}`}
      />
    </div>
  );
};
const AppSelectOptions = ({ data, label }) => {
  return (
    <div className="grid gap-y-1 w-[48.3%] mt-1 ">
      <select
        id="countries"
        className="px-4 py-3 rounded-md outline-none w-[100%] text-base font-normal placeholder-neutral4 border border-[#D6DDEB] border-solid"
      >
        <option selected>{label}</option>
        {data.map((it, ind) => (
          <option key={ind} value={it.value}>
            {it.title}
          </option>
        ))}
      </select>
    </div>
  );
};
export default AppInput;
export { AppInputCompany, AppSelectOptions };
