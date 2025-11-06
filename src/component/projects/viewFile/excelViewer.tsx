"use client";

import React, { useEffect, useState } from "react";
import * as XLSX from "xlsx";
import {
  Box,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Typography,
} from "@mui/material";
import { isArray } from "lodash";

interface ExcelViewerProps {
  fileUrl: string;
}

const ExcelViewer: React.FC<ExcelViewerProps> = ({ fileUrl }) => {
  const [data, setData] = useState<any[][]>([]);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!fileUrl) return;

    fetch(fileUrl)
      .then((res) => res.arrayBuffer())
      .then((buffer) => {
        const workbook = XLSX.read(buffer, { type: "array" });
        const firstSheet = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[firstSheet];
  const jsonData = XLSX.utils.sheet_to_json<any[]>(worksheet, { header: 1 });
setData(jsonData);

      })
      .catch((err) => setError(err));
  }, [fileUrl]);

  if (error) {
    return (
      <Typography color="error">
        Failed to load Excel file: {error.message}
      </Typography>
    );
  }

  if (!data || data.length === 0) {
    return <Typography>Loading Excel data...</Typography>;
  }

  const headers = isArray(data[0]) ? data[0] : [];

  return (
    <Box className="csv-table-container" sx={{ overflowX: "auto" }}>
      <Box className="csv-table-wrapper" sx={{ width: "100%" }}>
        <Table className="csv-data-table">
          <TableHead>
            <TableRow>
              {headers.map((cell: string, index: number) => (
                <TableCell
                  key={index}
                  sx={{ fontWeight: 600, backgroundColor: "#f9f9f9" }}
                >
                  {cell}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {data.slice(1).map((row: any[], rowIndex: number) => (
              <TableRow key={rowIndex}>
                {row.map((cell: any, cellIndex: number) => (
                  <TableCell key={cellIndex}>{cell}</TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Box>
    </Box>
  );
};

export default ExcelViewer;
