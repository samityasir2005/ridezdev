// src/Sidebar.jsx
import React from "react";
import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import PostAddOutlinedIcon from "@mui/icons-material/PostAddOutlined";
import "../styles/Sidebar.css";

const CustomSidebar = ({ setActivePanel }) => {
  return (
    <Sidebar>
      <Menu>
        <MenuItem
          icon={<HomeOutlinedIcon />}
          onClick={() => setActivePanel("userSettings")}
        >
          User Settings
        </MenuItem>
        <MenuItem
          icon={<SettingsOutlinedIcon />}
          onClick={() => setActivePanel("preferences")}
        >
          Preferences
        </MenuItem>
        <MenuItem
          icon={<PostAddOutlinedIcon />}
          onClick={() => setActivePanel("postSettings")}
        >
          Post Settings
        </MenuItem>
      </Menu>
    </Sidebar>
  );
};

export default CustomSidebar;
