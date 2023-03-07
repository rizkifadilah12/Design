import { useState } from "react";
import { ProSidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { Link } from "react-router-dom";
import "react-pro-sidebar/dist/css/styles.css";
import { tokens } from "../../theme";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import ContactsOutlinedIcon from "@mui/icons-material/ContactsOutlined";
import ReceiptOutlinedIcon from "@mui/icons-material/ReceiptOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import {  IoLogOut } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import {  useNavigate } from "react-router-dom";
import { LogOut, reset } from "../../features/authSlice";

const Item = ({ title, to, icon, selected, setSelected }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <MenuItem
      active={selected === title}
      style={{
        color: colors.grey[100],
      }}
      onClick={() => setSelected(title)}
      icon={icon}
    >
      <Typography>{title}</Typography>
      <Link to={to} />
    </MenuItem>
  );
};
const Sidebar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selected, setSelected] = useState("Dashboard");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  const logout = () => {
    dispatch(LogOut());
    dispatch(reset());
    navigate("/backend");
  };

  return (
    <Box
      sx={{
        "& .pro-sidebar-inner": {
          background: `${colors.primary[400]} !important`,
        },
        "& .pro-icon-wrapper": {
          backgroundColor: "transparent !important",
        },
        "& .pro-inner-item": {
          padding: "5px 35px 5px 20px !important",
        },
        "& .pro-inner-item:hover": {
          color: "#868dfb !important",
        },
        "& .pro-menu-item.active": {
          color: "#6870fa !important",
        },
      }}
    >
      <ProSidebar collapsed={isCollapsed}>
        <Menu iconShape="square">
          {/* LOGO AND MENU ICON */}
          <MenuItem
            onClick={() => setIsCollapsed(!isCollapsed)}
            icon={isCollapsed ? <MenuOutlinedIcon /> : undefined}
            style={{
              margin: "10px 0 20px 0",
              color: colors.grey[100],
            }}
          >
            {!isCollapsed && (
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                ml="15px"
              >
                {user && user.role === "admin" && (
                  <div>
                    <Typography variant="h5" color={colors.grey[100]}>
                      ADMINIS
                    </Typography>
                  </div>
                )}
                {user && user.role === "petugas" && (
                  <div>
                    <Typography variant="h5" color={colors.grey[100]}>
                      Petugas
                    </Typography>
                  </div>
                )}
                <IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
                  <MenuOutlinedIcon />
                </IconButton>
              </Box>
            )}
          </MenuItem>

          {!isCollapsed && (
            <Box mb="25px">
              <Box textAlign="center">
                <Typography
                  variant="h4"
                  color={colors.grey[100]}
                  fontWeight="bold"
                  sx={{ m: "10px 0 0 0" }}
                ></Typography>
              </Box>
            </Box>
          )}

          <Box paddingLeft={isCollapsed ? undefined : "10%"}>
            <Item
              title="Dashboard"
              to="/backend/dashboard"
              icon={<HomeOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />

            <Typography
              variant="h6"
              color={colors.grey[300]}
              sx={{ m: "15px 0 5px 20px" }}
            >
              Data
            </Typography>
            {user && user.role === "admin" && (
              <div>
                <Item
                  title="Masyarakat"
                  to="/backend/masyarakat"
                  icon={<PeopleOutlinedIcon />}
                  selected={selected}
                  setSelected={setSelected}
                />
                <Item
                  title="Users"
                  to="/backend/users"
                  icon={<ContactsOutlinedIcon />}
                  selected={selected}
                  setSelected={setSelected}
                />
                <Item title="&nbsp;" to="#" />
                <Item title="&nbsp;" to="#" />
                <Item title="&nbsp;" to="#" />
                <Item title="&nbsp;" to="#" />
                <Item title="&nbsp;" to="#" />
                <Item title="&nbsp;" to="#" />
                <Item title="&nbsp;" to="#" />
                <Item title="&nbsp;" to="#" />
                <Item title="&nbsp;" to="#" />
                <Item title="&nbsp;" to="#" />
                <Item title="&nbsp;" to="#" />
                <Item title="&nbsp;" to="#" />
                <Item title="&nbsp;" to="#" />
                <Item title="&nbsp;" to="#" />
                <Item title="&nbsp;" to="#" />
              </div>
            )}
            {user && user.role === "petugas" && (
              <div>
                <Item
                  title="Barang"
                  to="/backend/barang"
                  icon={<ReceiptOutlinedIcon />}
                  selected={selected}
                  setSelected={setSelected}
                />
                <Item
                  title="Lelang"
                  to="/backend/lelang"
                  icon={<ReceiptOutlinedIcon />}
                  selected={selected}
                  setSelected={setSelected}
                />
                <Item
                  title="Penawaran"
                  to="/backend/penawaran"
                  icon={<ReceiptOutlinedIcon />}
                  selected={selected}
                  setSelected={setSelected}
                />
                <Item
                  title="Pemenang"
                  to="/backend/pemenang"
                  icon={<ReceiptOutlinedIcon />}
                  selected={selected}
                  setSelected={setSelected}
                />
                <Item title="&nbsp;" to="#" />
                <Item title="&nbsp;" to="#" />
                <Item title="&nbsp;" to="#" />
                <Item title="&nbsp;" to="#" />
                <Item title="&nbsp;" to="#" />
                <Item title="&nbsp;" to="#" />
                <Item title="&nbsp;" to="#" />
                <Item title="&nbsp;" to="#" />
                <Item title="&nbsp;" to="#" />
                <Item title="&nbsp;" to="#" />
                <Item title="&nbsp;" to="#" />
                <Item title="&nbsp;" to="#" />
              </div>
            )}
            <Typography
              variant="h6"
              color={colors.grey[300]}
              sx={{ m: "15px 0 5px 20px" }}
            >
              Sistem
            </Typography>
            <button onClick={logout} className="button">
              <IoLogOut /> Logout
            </button>
          </Box>
        </Menu>
      </ProSidebar>
    </Box>
  );
};

export default Sidebar;
