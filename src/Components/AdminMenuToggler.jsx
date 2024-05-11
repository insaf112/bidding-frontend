import React, { useRef, useState } from "react";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import { useNavigate } from "react-router-dom";
import ConfirmationModal from "./ConfirmationModal";
const AdminMenuToggler = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [openConfModal, setOpenConfModal] = useState(false);

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

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.reload();
  };
  return (
    <>
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
                AD
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
          <MenuItem onClick={() => handleMenuClick("/admin/admin-profile")}>
            <Avatar /> Profile
          </MenuItem>
          <Divider />
          <AppMenuItem
            onClick={() => handleMenuClick("/register-company")}
            title={"Register Company"}
          />
          <AppMenuItem
            onClick={() => handleMenuClick("/admin/approval-requests")}
            title={"Approval List"}
          />
          <AppMenuItem
            onClick={() => handleMenuClick("/admin/companies-list")}
            title={"Registered Companies"}
          />
          <AppMenuItem
            onClick={() => setOpenConfModal(true)}
            title={"Logout"}
          />
        </Menu>
      </Box>
      <ConfirmationModal
        open={openConfModal}
        onConfirm={handleLogout}
        handleClose={() => setOpenConfModal(false)}
        variant={"warning"}
        data={{
          title: "Confirm Logout",
          body: "By confirming, you'll be logged out of your account. And you have to login again if you want to use the platform",
        }}
      />
    </>
  );
};

const AppMenuItem = ({ title, onClick }) => {
  return (
    <MenuItem sx={{ pr: 2, pl: 2 }} onClick={onClick}>
      {title}
    </MenuItem>
  );
};
export default AdminMenuToggler;
