"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import {
  Box,
  Button,
  Typography,
  Paper,
  Avatar,
  Divider,
  Fade,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import ThemeButton from "@/component/customComponents/button";
import CustomTextField from "@/component/customComponents/inputField";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { ROUTES } from "@/component/utils/contant";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    const callbackUrl = `${process.env.NEXT_PUBLIC_APP_URL}${ROUTES.ASSISTANT}`;

    const res = await signIn("credentials", {
      redirect: false,
      email,
      password,
      callbackUrl,
    });

    if (res?.error) {
      toast.error("Invalid email or password");
      setLoading(false);
    } else if (res?.ok) {
      window.location.href = res.url || callbackUrl;
    }
  }

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "linear-gradient(135deg, #eef2f3 0%, #8e9eab 100%)",
      }}
    >
      <Fade in timeout={700}>
        <Paper
          elevation={10}
          sx={{
            p: 5,
            width: 400,
            borderRadius: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            backdropFilter: "blur(10px)",
            backgroundColor: "rgba(255,255,255,0.95)",
          }}
        >
          <Avatar
            sx={{
              bgcolor: "primary.main",
              mb: 2,
              width: 56,
              height: 56,
              boxShadow: 3,
            }}
          >
            <LockOutlinedIcon fontSize="medium" />
          </Avatar>

          <Typography variant="h5" fontWeight={600} gutterBottom>
            Welcome Back
          </Typography>
          <Typography
            variant="body2"
            sx={{ color: "text.secondary", mb: 3, textAlign: "center" }}
          >
            Please sign in to continue to your account
          </Typography>

          <Box component="form" onSubmit={handleLogin} sx={{ width: "100%" }}>
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

            <ThemeButton
              fullWidth
              type="submit"
              sx={{
                mt: 3,
                py: 1.3,
                fontSize: "1rem",
                fontWeight: 600,
                letterSpacing: 0.3,
              }}
              disabled={loading}
            >
              {loading ? "Signing in..." : "Sign In"}
            </ThemeButton>
          </Box>

          <Divider sx={{ width: "100%", my: 3 }} />

          <Typography variant="body2" sx={{ textAlign: "center" }}>
            Don’t have an account?{" "}
            <Button
              variant="text"
              onClick={() => router.push(ROUTES.AUTH.SIGNUP)}
              sx={{
                textTransform: "none",
                fontWeight: 600,
                color: "primary.main",
                "&:hover": { textDecoration: "underline" },
              }}
            >
              Sign Up
            </Button>
          </Typography>
        </Paper>
      </Fade>
    </Box>
  );
}
