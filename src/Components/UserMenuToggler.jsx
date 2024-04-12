import React, { useRef, useState } from "react";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import { useNavigate } from "react-router-dom";
const UserMenuToggler = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const avatarRef = useRef(null);
  const navigate = useNavigate();

  const handleClick = () => {
    setAnchorEl(anchorEl ? null : avatarRef.current);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleMenuClick = (to) => {
    setAnchorEl(null);
    navigate(to);
  };

  return (
    <Box sx={{ position: "relative" }}>
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <Tooltip title="Account settings">
          <IconButton
            ref={avatarRef}
            onClick={handleClick}
            size="small"
            sx={{}}
            aria-controls={anchorEl ? "account-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={anchorEl ? "true" : undefined}
          >
            <Avatar
              sx={{
                width: 52,
                height: 52,
                backgroundColor: "#4640de",
                ":hover": { filter: "brightness(1.5)" },
              }}
            >
              US
            </Avatar>
          </IconButton>
        </Tooltip>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={Boolean(anchorEl)}
        onClose={handleClose}
        onClick={handleClose}
        slotProps={{
          paper: {
            elevation: 0,
            sx: {
              overflow: "visible",
              filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
              mt: 1,
              // pr: "20px",
              "& .MuiAvatar-root": {
                width: 32,
                height: 32,
                ml: -0.5,
                mr: 1,
              },
              "&::before": {
                content: '""',
                display: "block",
                position: "absolute",
                top: 50,
                right: 14,
                width: 10,
                height: 10,
                bgcolor: "background.paper",
                transform: "translateY(-50%) rotate(45deg)",
                zIndex: 0,
              },
            },
          },
        }}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
      >
        <MenuItem onClick={() => handleMenuClick("/user/user-profile")}>
          <Avatar /> Profile
        </MenuItem>
        <Divider />
        <AppMenuItem
          onClick={() => handleMenuClick("/user/register-company")}
          title={"Register Company"}
        />
        <AppMenuItem
          onClick={() => handleMenuClick("/user/friend-requests")}
          title={"Friend Requests"}
        />
        <AppMenuItem
          onClick={() => handleMenuClick("/user/create-project")}
          title={"Post Project"}
        />
        {/* <AppMenuItem
          onClick={() => handleMenuClick("/user/apply-to-project")}
          title={"Registered Companies"}
        /> */}
        <AppMenuItem
          onClick={() => handleMenuClick("/login")}
          title={"Logout"}
        />
      </Menu>
    </Box>
  );
};

const AppMenuItem = ({ title, onClick }) => {
  return (
    <MenuItem sx={{ pr: 2, pl: 2 }} onClick={onClick}>
      {title}
    </MenuItem>
  );
};
export default UserMenuToggler;
