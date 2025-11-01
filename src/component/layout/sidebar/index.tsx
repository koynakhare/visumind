"use client";

import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  ListItemIcon,
  Toolbar,
  Box,
  Typography,
  alpha,
} from "@mui/material";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { menuItems } from "./menuItem";
import { logout } from "@/component/utils/helper";
import theme from "@/theme";

import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LogoutIcon from "@mui/icons-material/Logout";
import HomeIcon from "@mui/icons-material/Home";
import DashboardIcon from "@mui/icons-material/Dashboard";
import SettingsIcon from "@mui/icons-material/Settings";
import { ROUTES } from "@/component/utils/contant";
import FactCheckOutlinedIcon from "@mui/icons-material/FactCheckOutlined";
import MarkUnreadChatAltOutlinedIcon from "@mui/icons-material/MarkUnreadChatAltOutlined";

const iconMap: { [key: string]: React.ReactNode } = {
  "/": <HomeIcon />,
  [ROUTES.PROJECTS.LIST]: <FactCheckOutlinedIcon fontSize="12px" />,
  [ROUTES.ASSISTANT]: <MarkUnreadChatAltOutlinedIcon fontSize="12px" />,
  "/profile": <AccountCircleIcon fontSize="16px" />,
  "/logout": <LogoutIcon fontSize="16px" />,
};

const drawerWidth = 240;

export default function Sidebar() {
  // Normalize pathname to avoid issues with query params etc.
  const pathname = usePathname()?.split("?")[0] || "/";

  const bottomItems = [
    { text: "Profile", href: "/profile" },
    { text: "Logout", href: "/logout" },
  ];

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          boxSizing: "border-box",
          borderRight: "1px solid #e0e0e0",
          backgroundColor: "#f9f9f9",
        },
      }}
    >
      <Toolbar />
      <Box sx={{ display: "flex", flexDirection: "column", height: "100%" }}>
        <List>
          {menuItems.map((item) => {
            const isActive = pathname === item.href;

            return (
              <ListItem key={item.href} disablePadding>
                <ListItemButton
                  component={Link}
                  href={item.href}
                  sx={{
                    backgroundColor: isActive
                      ? alpha(theme.palette.secondary.light, 0.15)
                      : "transparent",
                    color: isActive
                      ? theme.palette.secondary.main
                      : theme.palette.text.primary,
                    borderRadius: 1,
                    mx: 1,
                    my: 0.5,
                    py: 1,
                    "&:hover": {
                      backgroundColor: alpha(theme.palette.secondary.light, 0.25),
                    },
                  }}
                >
                  <ListItemIcon sx={{ minWidth: 36, color: "inherit" }}>
                    {iconMap[item.href] || <DashboardIcon />}
                  </ListItemIcon>
                  <ListItemText
                    primary={
                      <Typography variant="body2" fontWeight={500}>
                        {item.text}
                      </Typography>
                    }
                  />
                </ListItemButton>
              </ListItem>
            );
          })}
        </List>

        <Box sx={{ flexGrow: 1 }} />

        <List>
          {bottomItems.map((item) => {
            const isActive = pathname === item.href;
            const isLogout = item.text === "Logout";

            return (
              <ListItem key={item.href} disablePadding>
                <ListItemButton
                  {...(isLogout
                    ? { onClick: logout }
                    : { component: Link, href: item.href })}
                  sx={{
                    backgroundColor: isActive
                      ? alpha(theme.palette.secondary.light, 0.15)
                      : "transparent",
                    color: isActive
                      ? theme.palette.secondary.main
                      : theme.palette.text.primary,
                    borderRadius: 1,
                    mx: 1,
                    my: 0.5,
                    py: 1,
                    "&:hover": {
                      backgroundColor: alpha(theme.palette.secondary.light, 0.25),
                    },
                  }}
                >
                  <ListItemIcon sx={{ minWidth: 36, color: "inherit" }}>
                    {iconMap[item.href]}
                  </ListItemIcon>
                  <ListItemText
                    primary={
                      <Typography variant="body2" fontWeight={500}>
                        {item.text}
                      </Typography>
                    }
                  />
                </ListItemButton>
              </ListItem>
            );
          })}
        </List>
      </Box>
    </Drawer>
  );
}
