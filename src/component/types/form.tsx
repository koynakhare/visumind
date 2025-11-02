import { GridSize } from "@mui/material";

export interface Field {
  name: string;
  label: string;
  type: string;
   xs?: GridSize; // e.g. 12, 6, etc.
  md?: GridSize; // optional
  sm?: GridSize; // optional
  lg?: GridSize;
  xl?: GridSize;
  isSendIcon?: boolean;
  options?: { label: string; value: string }[];
}
