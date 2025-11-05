"use client";

import { Box, Typography } from "@mui/material";
import { useState, useEffect } from "react";
import Papa from "papaparse";
import "video.js/dist/video-js.css";
import Loading from "../../customComponents/loading";
import PageTitle from "../../pageTitle";
import ExcelViewer from "./excelViewer";
import CsvTable from "./csvFile";
import { capitalizeFirstLetter } from "@/utils/helper";

interface FileViewerProps {
  file: {
    name: string;
    url: string;
  };
  handleClose: () => void;
}

const FileViewer = ({ file, handleClose }: FileViewerProps) => {
  const [error, setError] = useState<Error | null>(null);
  const [loading, setLoading] = useState(false);
  const [csvData, setCsvData] = useState<any[]>([]);

  useEffect(() => {
    if (file && file.name?.endsWith(".csv")) {
      setLoading(true);
      fetch(file.url)
        .then((response) => response.text())
        .then((text) => {
          const parsedData = Papa.parse(text, { header: true });
          setCsvData(parsedData.data);
          setLoading(false);
        })
        .catch((err) => {
          setError(err);
          setLoading(false);
        });
    }
  }, [file]);

  const renderFile = () => {
    if (!file) return <Typography>No file selected.</Typography>;

    const fileExtension = file.name.split(".").pop()?.toLowerCase();
    const fileUrl = `${file.url}`;
    // PowerPoint
    if (["ppt", "pptx"].includes(fileExtension!))
      return (
        <iframe
          src={`https://view.officeapps.live.com/op/embed.aspx?src=${encodeURIComponent(fileUrl)}`}
          width="100%"
          height="100%"
          frameBorder="0"
          title="PowerPoint Viewer"
        />
      );

    // Audio
    if (["mp3", "wav", "ogg", "aac", "acc", "m4a"].includes(fileExtension!))
      return (
        <audio controls style={{ width: "100%" }}>
          <source src={fileUrl} type={`audio/${fileExtension}`} />
          Your browser does not support the audio element.
        </audio>
      );

    // Video
    if (["mp4", "webm", "ogg", "avi", "mov"].includes(fileExtension!))
      return (
        <video
          controls
          style={{ width: "100%", height: "100%" }}
          className="video-js"
        >
          <source src={fileUrl} type={`video/${fileExtension}`} />
          Your browser does not support the video element.
        </video>
      );

    // PDF
    console.log(fileUrl, 'fileUrl')
    if (fileExtension === "pdf")
      return (
        <iframe
          src={`https://docs.google.com/gview?url=${encodeURIComponent(file.url)}&embedded=true`}
          width="100%"
          height="100%"
          title="Google PDF Viewer"
        />

      );

    // Word
    if (["docx", "doc"].includes(fileExtension!))
      return (
        <iframe
          src={`https://docs.google.com/gview?url=${encodeURIComponent(
            file.url
          )}&embedded=true`}
          width="100%"
          height="100%"
          title="Google Doc Viewer"
        />
      );

    // Excel
    if (["xls", "xlsx"].includes(fileExtension!))
      return <ExcelViewer fileUrl={fileUrl} />;

    // CSV
    if (fileExtension === "csv") return <CsvTable csvData={csvData} />;

    // Image
    if (["jpg", "jpeg", "png", "gif", "svg", "webp"].includes(fileExtension!))
      return (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          height="100%"
        >
          <img
            src={fileUrl}
            alt="Preview"
            style={{ maxWidth: "100%", maxHeight: "100%" }}
          />
        </Box>
      );

    // Unsupported
    return (
      <Box textAlign="center" sx={{ backgroundColor: "white", padding: 4 }}>
        <Typography variant="h6" color="text.secondary">
          File type not supported.
        </Typography>
      </Box>
    );
  };

  return (
    <>
      {loading && <Loading />}
      <PageTitle
        title={capitalizeFirstLetter(file?.name)}
        showCrossIcon
        handleCancel={handleClose}
      />
      <Box
        mt={2}
        sx={{
          width: "100%",
          height: "calc(100vh - 130px)",
          backgroundColor: "background.default",
        }}
      >
        {error ? (
          <Typography variant="h6" color="error">
            Error loading file: {error.message}
          </Typography>
        ) : (
          renderFile()
        )}
      </Box>
    </>
  );
};

export default FileViewer;
