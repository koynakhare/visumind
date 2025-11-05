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
  Divider,
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
import FactCheckOutlinedIcon from "@mui/icons-material/FactCheckOutlined";
import MarkUnreadChatAltOutlinedIcon from "@mui/icons-material/MarkUnreadChatAltOutlined";
import { ROUTES } from "@/component/utils/contant";

const iconMap: { [key: string]: React.ReactNode } = {
  "/": <HomeIcon />,
  [ROUTES.PROJECTS.LIST]: <FactCheckOutlinedIcon />,
  [ROUTES.ASSISTANT]: <MarkUnreadChatAltOutlinedIcon />,
  [ROUTES.PROFILE]: <AccountCircleIcon />,
  "/logout": <LogoutIcon />,
};

const drawerWidth = 240;

export default function Sidebar() {
  const pathname = usePathname()?.split("?")[0] || "/";

  const bottomItems = [
    { text: "Profile", href:ROUTES.PROFILE },
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
          borderRight: "1px solid rgba(255,255,255,0.1)",
          background: `linear-gradient(180deg, ${alpha(
            theme.palette.background.paper,
            0.9
          )} 0%, ${alpha(theme.palette.background.default, 0.95)} 100%)`,
          backdropFilter: "blur(12px)",
          color: theme.palette.text.primary,
          transition: "all 0.3s ease",
          display: "flex",
          flexDirection: "column",
        },
      }}
    >
      {/* 🔹 Logo / Title Section */}
      <Toolbar
        sx={{
          px: 2,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          minHeight: 70,
          borderBottom: `1px solid ${alpha(theme.palette.divider, 0.2)}`,
        }}
      >
        <Typography
          variant="h6"
          fontWeight={700}
          sx={{
            background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            letterSpacing: "0.5px",
          }}
        >
          AssistPro
        </Typography>
      </Toolbar>

      {/* 🔹 Main Menu */}
      <Box sx={{ flexGrow: 1, mt: 2 }}>
        <List>
          {menuItems.map((item) => {
            const isActive = pathname === item.href;

            return (
              <ListItem key={item.href} disablePadding>
                <ListItemButton
                  component={Link}
                  href={item.href}
                  sx={{
                    mx: 1,
                    my: 0.5,
                    borderRadius: 2,
                    py: 1.2,
                    px: 2,
                    backgroundColor: isActive
                      ? alpha(theme.palette.secondary.main, 0.15)
                      : "transparent",
                    color: isActive
                      ? theme.palette.secondary.main
                      : theme.palette.text.primary,
                    boxShadow: isActive
                      ? `0 0 10px ${alpha(theme.palette.secondary.main, 0.3)}`
                      : "none",
                    "&:hover": {
                      backgroundColor: alpha(
                        theme.palette.secondary.main,
                        0.1
                      ),
                      transform: "translateX(3px)",
                      transition: "all 0.2s ease",
                    },
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 36,
                      color: "inherit",
                      transition: "transform 0.2s ease",
                      ...(isActive && { transform: "scale(1.1)" }),
                    }}
                  >
                    {iconMap[item.href] || <DashboardIcon />}
                  </ListItemIcon>
                  <ListItemText
                    primary={
                      <Typography
                        variant="body2"
                        fontWeight={isActive ? 600 : 500}
                      >
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

      <Divider sx={{ mx: 2, mb: 1 }} />

      {/* 🔹 Bottom Actions */}
      <List sx={{ mb: 1 }}>
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
                  mx: 1,
                  borderRadius: 2,
                  py: 1.1,
                  px: 2,
                  color: isActive
                    ? theme.palette.secondary.main
                    : theme.palette.text.primary,
                  "&:hover": {
                    backgroundColor: alpha(
                      theme.palette.secondary.main,
                      0.1
                    ),
                    transform: "translateX(3px)",
                    transition: "all 0.2s ease",
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
    </Drawer>
  );
}
