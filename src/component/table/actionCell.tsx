import React from "react";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityIcon from "@mui/icons-material/Visibility";
import Tooltip from "@mui/material/Tooltip";

export interface ActionItem<T> {
  label: string; // Tooltip text
  type: "edit" | "delete" | "view" | string;
  name: string;
  onClick: (data: T) => void;
}

interface ActionCellProps<T> {
  actions: ActionItem<T>[];
  row: T;
}

const ActionCell = <T,>({ actions, row }: ActionCellProps<T>) => {
  return (
    <>
      {actions.map((actionItem, index) => {
        let icon = null;
        let color: "inherit" | "primary" | "error" | "info" = "inherit";

        switch (actionItem.type) {
          case "edit":
            icon = <EditIcon sx={{ fontSize: "15px" }} />;
            color = "primary";
            break;
          case "delete":
            icon = <DeleteIcon sx={{ fontSize: "15px" }} />;
            color = "error";
            break;
          case "view":
            icon = <VisibilityIcon sx={{ fontSize: "15px" }} />;
            color = "info";
            break;
          default:
            icon = null;
            color = "inherit";
        }
        return (
          <Tooltip title={actionItem.label} key={index} arrow>
            <IconButton
              size="small"
              color={color}
              onClick={() => actionItem.onClick(row)}
              sx={{
                padding: "6px",
                borderRadius: 2,
                transition: "all 0.2s ease",
                "&:hover": {
                  backgroundColor:
                    color === "error"
                      ? "rgba(244, 67, 54, 0.08)"
                      : color === "primary"
                        ? "rgba(33, 150, 243, 0.08)"
                        : color === "info"
                          ? "rgba(3, 169, 244, 0.08)"
                          : "rgba(0,0,0,0.04)",
                  transform: "scale(1.1)",
                },
              }}
            >
              {icon}
            </IconButton>
          </Tooltip>
        );
      })}
    </>
  );
};

export default ActionCell;
