"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { Box, Button, TextField, Typography, Paper, Avatar } from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import ThemeButton from "@/component/customComponents/button";
import CustomTextField from "@/component/customComponents/inputField";
import toast from "react-hot-toast";
import { ROUTES } from "@/component/utils/contant";
import { CONFIG } from "@/config";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();

    const callbackUrl = `${process.env.NEXT_PUBLIC_APP_URL}${ROUTES.ASSISTANT}`;

    const res = await signIn("credentials", {
      redirect: false,
      email,
      password,
      callbackUrl,
    });

    if (res?.error) {
      toast.error("Login failed");
    } else if (res?.ok) {
      window.location.href = res.url || callbackUrl;
    }
  }
  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Paper
        elevation={8}
        sx={{
          p: 4,
          width: 400,
          borderRadius: 3,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "primary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography variant="h5" component="h1" gutterBottom>
          Sign in
        </Typography>
        <Box component="form" onSubmit={handleLogin} sx={{ mt: 1, width: "100%" }}>
          <CustomTextField
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}

          />
          <CustomTextField
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}

          />
          <ThemeButton fullWidth type="submit">
            Sign In
          </ThemeButton>
        </Box>
      </Paper>
    </Box>
  );
}
