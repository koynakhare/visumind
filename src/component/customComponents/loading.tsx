// src/component/common/TopLinearLoading.tsx
"use client";

import React from "react";
import { LinearProgress, Box } from "@mui/material";

const Loading: React.FC = () => {
  return (
    <Box
      position="fixed"
      top={0}
      left={0}
      width="100%"
      zIndex={2000} // above most elements
    >
      <LinearProgress color="primary" />
    </Box>
  );
};

export default Loading;
