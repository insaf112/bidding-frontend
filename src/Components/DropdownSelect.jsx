import * as React from "react";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import ListItemText from "@mui/material/ListItemText";
import Select from "@mui/material/Select";
import Checkbox from "@mui/material/Checkbox";
import { Autocomplete, TextField } from "@mui/material";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      // maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 300,
    },
  },
};

export default function DropdownSelect({ data, handleSelect }) {
  const [personName, setPersonName] = React.useState([]);

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    handleSelect(value);
    setPersonName(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  return (
    // <Autocomplete
    //   disablePortal
    //   id="combo-box-demo"
    //   options={data}
    //   getOptionLabel={(option) => option.name}
    //   sx={{
    //     width: "48.3%",
    //     "& .MuiInputBase-root": {
    //       backgroundColor: "#fff",
    //       borderColor: "#D6DDEB",
    //       outlineColor: "#D6DDEB",
    //       borderRadius: "6px",
    //       marginTop: "4px",
    //       paddingX: "16px",
    //       paddingY: "19px",
    //       maxHeight: 50, // Adjust the height as needed
    //     },
    //     "& #combo-box-demo": {
    //       padding: 5,
    //     },
    //   }}
    //   renderInput={(params) => (
    //     <TextField sx={{ padding: 0 }} {...params} label="Categories" />
    //   )}
    // />
    // <div className="w-[48.3%]">
    <FormControl
      sx={{ width: "48.3%", justifyContent: "end", borderRadius: "6px" }}
    >
      <InputLabel
        sx={{ marginTop: "1px", color: "#A8ADB7" }}
        id="demo-multiple-checkbox-label"
      >
        Categories
      </InputLabel>
      <Select
        labelId="demo-multiple-checkbox-label"
        id="demo-multiple-checkbox"
        multiple
        value={personName}
        onChange={handleChange}
        input={<OutlinedInput label="Categories" />}
        renderValue={(selected) => selected.join(", ")}
        MenuProps={MenuProps}
        sx={{
          borderRadius: "6px !important",
          borderColor: "#D6DDEB !important",
          outlineColor: "#D6DDEB",
          "& .MuiSelect-outlined": {
            padding: "13px 16px",
            backgroundColor: "#fff",
            borderRadius: "6px",
          },
        }}
      >
        {data.map((cat) => (
          <MenuItem key={cat.id} value={cat.name}>
            <Checkbox checked={personName.indexOf(cat.name) > -1} />
            <ListItemText primary={cat.name} />
          </MenuItem>
        ))}
      </Select>
    </FormControl>
    // </div>
  );
}
