"use client";

import {
  Box,
  Typography,
  Divider,
  Card,
  CardContent,
  Stack,
  Tooltip,
  Grid,
  Paper,
  Chip,
  Avatar,
} from "@mui/material";
import {
  Description as DescriptionIcon,
  CalendarToday as CalendarTodayIcon,
  InsertDriveFile as InsertDriveFileIcon,
  Folder as FolderIcon,
} from "@mui/icons-material";
import { useState, useMemo } from "react";
import { ProjectType } from "../types/project";
import FileViewer from "./viewFile/fileViewer";
import PageTitle from "../pageTitle";

const fileIcons = {
  audio: "/icons/AudioIcon.png",
  csv: "/icons/csv-file.png",
  doc: "/icons/doc.png",
  googleSheet: "/icons/google-sheets.png",
  pdf: "/icons/pdfIcon.png",
  photo: "/icons/photo.png",
  ppt: "/icons/PPTIcon.jpg",
  youtube: "/icons/youtube.png",
  default: "/icons/doc.png",
};

const getAttachmentIcon = (file: any): string => {
  const fileName = file?.filename || file?.name;
  if (!fileName) return fileIcons.default;
  const ext = fileName.split(".").pop()?.toLowerCase() || "";

  if (ext.includes("pdf")) return fileIcons.pdf;
  if (ext.includes("doc") || ext.includes("word")) return fileIcons.doc;
  if (ext.includes("ppt")) return fileIcons.ppt;
  if (ext.includes("csv")) return fileIcons.csv;
  if (ext.includes("xls") || ext.includes("spreadsheet"))
    return fileIcons.googleSheet;
  if (["jpg", "jpeg", "png", "gif", "bmp", "webp"].includes(ext))
    return fileIcons.photo;
  if (["mp3", "wav", "ogg"].includes(ext)) return fileIcons.audio;
  if (["mp4", "mov", "avi", "mkv"].includes(ext)) return fileIcons.youtube;

  return fileIcons.default;
};

const ViewProjectDetails = ({
  project,
  handleCancel,
}: {
  project: ProjectType;
  handleCancel: () => void;
}) => {
  const [selectedFile, setSelectedFile] = useState<any>(null);
  const files = useMemo(() => project?.files || [], [project]);

  if (!project) return null;

  if (selectedFile) {
    return (
      <Card
        elevation={4}
        sx={{
          borderRadius: 4,
          p: 2,
          background: "linear-gradient(145deg, #ffffff, #f6f8fc)",
        }}
      >
        <FileViewer
          file={{ ...selectedFile, name: selectedFile?.filename }}
          handleClose={() => setSelectedFile(null)}
        />
      </Card>
    );
  }

  return (
    <Card
      elevation={4}
      sx={{
        borderRadius: 4,
        p: 3,
        background: "linear-gradient(145deg, #ffffff, #f9fafc)",
        boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
        transition: "0.3s all ease-in-out",
      }}
    >
      <PageTitle
        title={project?.name}
        showCrossIcon
        handleCancel={handleCancel}
      />

      <CardContent sx={{ mt: 2 }}>
        {/* 🔹 Project Info Section */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 1.5,
            mb: 2,
            background: "rgba(0, 0, 0, 0.02)",
            p: 2,
            borderRadius: 3,
          }}
        >
          <InfoRow
            icon={<DescriptionIcon fontSize="small" color="primary" />}
            label="Description"
            content={
              <span
                dangerouslySetInnerHTML={{
                  __html: project?.description || "No description available.",
                }}
              />
            }
          />

          <InfoRow
            icon={<InsertDriveFileIcon fontSize="small" color="primary" />}
            label="Total Files"
            content={<Chip label={files.length} color="primary" size="small" />}
          />

          <InfoRow
            icon={<CalendarTodayIcon fontSize="small" color="primary" />}
            label="Created At"
            content={
              <Typography variant="body2">
                {new Date(project?.createdAt).toLocaleDateString()}
              </Typography>
            }
          />
        </Box>

        {/* 🔹 Files Section */}
        {files?.length > 0 ? (
          <>
            <Typography
              variant="subtitle1"
              fontWeight={600}
              sx={{ mb: 1.5, color: "text.primary" }}
            >
              Uploaded Files
            </Typography>
            <Grid container spacing={2}>
              {files?.map((file) => (
                <Grid size={{ xs: 12, sm: 6, md: 4 }} key={file?._id}>
                  <Tooltip title="Click to view file" arrow>
                    <Paper
                      onClick={() => setSelectedFile(file)}
                      elevation={2}
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 1.2,
                        p: 1.5,
                        borderRadius: 3,
                        cursor: "pointer",
                        backgroundColor: "background.paper",
                        boxShadow: "0 2px 6px rgba(0,0,0,0.06)",
                        transition: "all 0.25s ease",
                        "&:hover": {
                          transform: "translateY(-3px)",
                        },
                      }}
                    >
                      <Avatar
                        src={getAttachmentIcon(file)}
                        variant="rounded"
                        sx={{
                          width: 40,
                          height: 40,
                          bgcolor: "white",
                          border: "1px solid rgba(0,0,0,0.1)",
                        }}
                      />
                      <Box sx={{ flexGrow: 1, overflow: "hidden" }}>
                        <Typography
                          variant="body2"
                          noWrap
                          sx={{ fontWeight: 500 }}
                          title={file?.filename}
                        >
                          {file?.filename}
                        </Typography>
                        <Typography
                          variant="caption"
                          sx={{ color: "text.secondary" }}
                        >
                          {new Date(file?.createdAt).toLocaleDateString()}
                        </Typography>
                      </Box>
                    </Paper>
                  </Tooltip>
                </Grid>
              ))}
            </Grid>
          </>
        ) : (
          <Box
            sx={{
              textAlign: "center",
              p: 3,
              color: "text.secondary",
            }}
          >
            <FolderIcon sx={{ fontSize: 40, color: "action.disabled", mb: 1 }} />
            <Typography variant="body2">No files uploaded yet.</Typography>
          </Box>
        )}
      </CardContent>
    </Card>
  );
};

// 🔹 InfoRow: cleaner visual alignment
const InfoRow = ({
  icon,
  label,
  content,
}: {
  icon: React.ReactNode;
  label: string;
  content: React.ReactNode;
}) => (
  <Stack direction="row" spacing={1.5} alignItems="center">
    {icon}
    <Typography
      variant="body2"
      sx={{ color: "text.secondary", display: "flex", alignItems: "center" }}
    >
      <strong style={{ marginRight: 4 }}>{label}:</strong> {content}
    </Typography>
  </Stack>
);

export default ViewProjectDetails;
