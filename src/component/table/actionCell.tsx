import React from 'react';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Tooltip from '@mui/material/Tooltip';

export interface ActionItem<T> {
  label: string;       // For tooltip
  type: 'edit' | 'delete' | string;
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
        let color: "inherit" | "primary" | "error" = "inherit";

        switch (actionItem.type) {
          case "edit":
            icon = <EditIcon fontSize="small" />;
            color = "primary";
            break;
          case "delete":
            icon = <DeleteIcon fontSize="small" />;
            color = "error";
            break;
          default:
            icon = null;
            color = "inherit";
        }

        return (
          <Tooltip title={actionItem.label} key={index}>
            <IconButton
              size="small"
              color={color}
              onClick={() => actionItem.onClick(row)}
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
