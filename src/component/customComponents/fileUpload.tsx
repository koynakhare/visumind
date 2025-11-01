import React, { useRef } from "react";
import { Box, Chip, Stack, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import fileImportPlaceholder from "@/assets/fileImportPlaceholder.png"; // your placeholder image
import theme from "@/theme";


interface SelectedFile {
  id: string;
  file: File;
}

interface FileUploaderProps {
  multiple?: boolean;
  accept?: string;
  onFilesSelected: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleRemoveFile: (id: string) => void;
  selectedFiles: SelectedFile[] | SelectedFile | null;
  buttonLabel?: string;
  disabled?: boolean;
}

const FileUploader: React.FC<FileUploaderProps> = ({
  multiple = false,
  accept,
  onFilesSelected,
  handleRemoveFile,
  selectedFiles,
  buttonLabel = "Select Files",
  disabled = false,
}) => {
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleBoxClick = () => {
    if (!disabled) {
      inputRef.current?.click();
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onFilesSelected(event);
    event.target.value = "";
  };

  const renderSelectedFiles = () => {
    if (!selectedFiles) return null;

    const filesArray = Array.isArray(selectedFiles)
      ? selectedFiles
      : [selectedFiles];

    return (
      <Stack direction="row" spacing={1} mt={2} flexWrap="wrap">
        {filesArray.map(({ id, file }) => (
          <Chip
            key={id}
            label={`${file.name} (${(file.size / 1024).toFixed(1)} KB)`}
            onDelete={() => handleRemoveFile(id)}
            deleteIcon={
              <Box
                sx={{
                  bgcolor: theme.palette.error.main,
                  borderRadius: '50%',
                  width: 15,
                  height: 15,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                }}
              >
                <CloseIcon sx={{ fontSize: 14, color: 'white', fontWeight: 600 }} />
              </Box>
            }
            sx={{ maxWidth: 300, backgroundColor: theme.palette.chipColor.contrastText, color: 'white',height:'22px' }}
          />
        ))}
      </Stack>
    );
  };

  return (
    <>
      <input
        type="file"
        ref={inputRef}
        style={{ display: "none" }}
        multiple={multiple}
        accept={accept}
        onChange={handleFileChange}
      />

      {/* Dashed Border Box with Centered Image + Label */}
      <Box
        onClick={handleBoxClick}
        sx={{
          border: "2px dashed #aaa",
          borderRadius: 2,
          p: 4,
          textAlign: "center",
          cursor: disabled ? "not-allowed" : "pointer",
          backgroundColor: disabled ? "#f5f5f5" : "#ffffffff",
          transition: "background-color 0.3s",
          "&:hover": {
            backgroundColor: disabled ? "#f5f5f5" : "#f0f0f0",
          },
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Box
          component="img"
          src="/assets/fileImportPlaceholder.png"
          alt="Upload"
          sx={{
            width: 80,
            height: 80,
            mb: 1,
            opacity: 0.7,
          }}
        />

        <Typography variant="subtitle1" color="textSecondary">
          {buttonLabel}
        </Typography>
      </Box>

      {renderSelectedFiles()}
    </>
  );
};

export default FileUploader;
