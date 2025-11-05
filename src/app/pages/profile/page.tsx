"use client";

import { useEffect, useState } from "react";
import { getSession } from "next-auth/react";
import {
  Box,
  Avatar,
  Typography,
  Paper,
  Divider,
  CircularProgress,
  Button,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import LogoutIcon from "@mui/icons-material/Logout";
import { logout } from "@/component/utils/helper";
import theme from "@/theme";

export default function ProfilePage() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadSession() {
      const session = await getSession();
      if (session?.user) {
        setUser(session.user);
      }
      setLoading(false);
    }
    loadSession();
  }, []);

  if (loading) {
    return (
      <Box
        sx={{
          height: "80vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (!user) {
    return (
      <Box
        sx={{
          height: "80vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography variant="h6" color="text.secondary">
          No user data available.
        </Typography>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",

        p: 3,
      }}
    >
      <Paper
        elevation={8}
        sx={{
          width: 420,
          borderRadius: 4,
          p: 4,
          textAlign: "center",
          backdropFilter: "blur(10px)",
          background: "rgba(255,255,255,0.9)",
        }}
      >
        {/* Avatar Section */}
        <Avatar
          sx={{
            width: 80,
            height: 80,
            mx: "auto",
            mb: 2,
            bgcolor: theme.palette.primary.main,
            fontSize: 32,
            fontWeight: 600,
          }}
        >
          {user.name?.charAt(0).toUpperCase() || "U"}
        </Avatar>

        <Typography variant="h5" fontWeight={600}>
          {user.name}
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ mb: 3, wordBreak: "break-word" }}
        >
          {user.email}
        </Typography>

        <Divider sx={{ mb: 3 }} />

        {/* User ID Section */}
        <Box sx={{ mb: 3 }}>
          <Typography
            variant="caption"
            color="text.secondary"
            sx={{ letterSpacing: 0.5 }}
          >
            USER ID
          </Typography>
          <Typography
            variant="body2"
            sx={{
              mt: 0.5,
              px: 2,
              py: 0.5,
              borderRadius: 1,
              backgroundColor: "rgba(0,0,0,0.04)",
              fontFamily: "monospace",
              overflowWrap: "anywhere",
            }}
          >
            {user.id}
          </Typography>
        </Box>

        {/* Action Buttons */}
        <Box sx={{ display: "flex", gap: 2, justifyContent: "center" }}>
          <Button
            variant="outlined"
            startIcon={<LogoutIcon />}
            sx={{
              borderRadius: 2,
              textTransform: "none",
              borderColor: theme.palette.error.main,
              color: theme.palette.error.main,
              "&:hover": {
                backgroundColor: "rgba(255,0,0,0.08)",
                borderColor: theme.palette.error.main,
              },
            }}
            onClick={logout}
          >
            Logout
          </Button>
        </Box>
      </Paper>
    </Box>
  );
}
