import * as React from "react";
import PropTypes from "prop-types";
import { Select as BaseSelect, selectClasses } from "@mui/base/Select";
import { Option as BaseOption, optionClasses } from "@mui/base/Option";
import { styled } from "@mui/system";
import UnfoldMoreRoundedIcon from "@mui/icons-material/UnfoldMoreRounded";

const Select = React.forwardRef(function Select(props, ref) {
  const slots = {
    root: CustomButton,
    listbox: Listbox,
    popup: Popup,
    ...props.slots,
  };

  return <BaseSelect {...props} ref={ref} slots={slots} />;
});

export default function DropdownSelect({ data }) {
  return (
    <Select defaultValue={10}>
      {data.map((cat, i) => (
        <Option key={cat?.id || i} value={cat?.id}>
          {cat?.name}
        </Option>
      ))}
      {/* <Option value={20}>Twenty</Option>
      <Option value={30}>Thirty</Option> */}
    </Select>
  );
}

const blue = {
  100: "#DAECFF",
  200: "#99CCF3",
  400: "#3399FF",
  500: "#007FFF",
  600: "#0072E5",
  700: "#0059B2",
  900: "#003A75",
};

const grey = {
  50: "#F3F6F9",
  100: "#E5EAF2",
  200: "#DAE2ED",
  300: "#C7D0DD",
  400: "#B0B8C4",
  500: "#9DA8B7",
  600: "#6B7A90",
  700: "#434D5B",
  800: "#303740",
  900: "#1C2025",
};

const CustomButton = React.forwardRef(function CustomButton(props, ref) {
  const { ownerState, ...other } = props;
  return (
    <StyledButton type="button" {...other} ref={ref}>
      {other.children}
      <UnfoldMoreRoundedIcon />
    </StyledButton>
  );
});

CustomButton.propTypes = {
  children: PropTypes.node,
  ownerState: PropTypes.object.isRequired,
};

const StyledButton = styled("button", { shouldForwardProp: () => true })(
  ({ theme }) => `
  position: relative;
  font-family: sans-serif;
  font-size: 1rem;
  box-sizing: border-box;
  width: 48.3%;
    // max-height: 49.6px;
    margin-top: 0.25rem;
  padding: 12px 16px;
  border-radius: 6px;
  text-align: left;
  border: 1px solid #D6DDEB;
  background-color: #fff;
  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 120ms;

  &:hover {
    background: ${grey[50]};
    border-color: ${grey[300]};
  }

  &.${selectClasses.focusVisible} {
    outline: 0;
    border-color: ${blue[400]};
    box-shadow: 0 0 0 3px ${blue[200]};
  }

  & > svg {
    font-size: 1rem;
    position: absolute;
    height: 100%;
    top: 0;
    right: 10px;
  }
  `
);

const Listbox = styled("ul")(
  ({ theme }) => `
  font-family: 'IBM Plex Sans', sans-serif;
  font-size: 1rem;
  box-sizing: border-box;
  padding: 6px;
  margin: 12px 0;
  width: contain;
  border-radius: 12px;
  overflow: auto;
  max-height: 350px;
  outline: 0px;
  background: ${"#fff"};
  border: 1px solid ${grey[200]};
  color: ${grey[900]};
  box-shadow: 0px 2px 4px ${"rgba(0,0,0, 0.05)"};
  `
);

const Option = styled(BaseOption)(
  ({ theme }) => `
  list-style: none;
  padding: 8px;
  border-radius: 8px;
  cursor: default;
  &:last-of-type {
    border-bottom: none;
  }

  &.${optionClasses.selected} {
    background-color: ${blue[100]};
    color: ${blue[900]};
  }

  &.${optionClasses.highlighted} {
    background-color: ${grey[100]};
    color: ${grey[900]};
  }

  &:focus-visible {
    outline: 3px solid ${blue[200]};
  }

  &.${optionClasses.highlighted}.${optionClasses.selected} {
    background-color: ${blue[100]};
    color: ${blue[900]};
  }

  &.${optionClasses.disabled} {
    color: ${grey[400]};
  }

  &:hover:not(.${optionClasses.disabled}) {
    background-color: ${grey[100]};
    color: ${grey[900]};
  }
  `
);

const Popup = styled("div")`
  z-index: 1;
`;
