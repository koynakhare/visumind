"use client";

import { Box, Toolbar } from "@mui/material";
import Sidebar from "./sidebar/index";
import { usePathname } from "next/navigation";

interface LayoutProps {
  children: React.ReactNode;
}

const drawerWidth = 240;

export default function Layout({ children }: LayoutProps) {
  const pathname = usePathname();

  // Don't show sidebar on login page
  const showSidebar = pathname !== "/pages/login";

  return (
    <Box sx={{ display: "flex" ,ml:2,mr:2}}>
      {<Sidebar />}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          marginLeft: showSidebar ? `${drawerWidth}px` : 0,
          ml: showSidebar ? 0 : 0,
          width: "100%",
        }}
      >
        {/* <Toolbar /> */}
        <Box mt={4}>
        {children}
        </Box>
      </Box>
    </Box>
  );
}
