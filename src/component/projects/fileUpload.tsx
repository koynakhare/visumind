"use client";

import { useState } from "react";
import { Button } from "@mui/material";
import axios from "axios";

interface FileUploadProps {
  projectId: string;
  onUploadSuccess: (files: any[]) => void;
}

export default function FileUpload({ projectId, onUploadSuccess }: FileUploadProps) {
  const [files, setFiles] = useState<FileList | null>(null);
  const [loading, setLoading] = useState(false);

  const handleUpload = async () => {
    if (!files) return;
    setLoading(true);
    const formData = new FormData();
    Array.from(files).forEach(file => formData.append("files", file));
    formData.append("projectId", projectId);

    try {
      const res = await axios.post("/api/files/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      onUploadSuccess(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <input type="file" multiple onChange={e => setFiles(e.target.files)} />
      <Button onClick={handleUpload} disabled={loading} variant="contained" sx={{ ml: 1 }}>
        {loading ? "Uploading..." : "Upload"}
      </Button>
    </div>
  );
}
