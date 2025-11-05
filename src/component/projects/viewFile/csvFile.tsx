"use client";

import React from "react";
import { Box } from "@mui/material";
import { capitalizeFirstLetter } from "@/utils/helper";

interface CsvTableProps {
  csvData: Record<string, string | number | null>[]; // Array of objects
}

const CsvTable: React.FC<CsvTableProps> = ({ csvData }) => {
  if (!csvData || csvData.length === 0) {
    return <Box textAlign="center">No CSV data found.</Box>;
  }

  const headers = Object.keys(csvData[0] || {});

  return (
    <Box className="csv-table-container" sx={{ overflowX: "auto" }}>
      <Box className="csv-table-wrapper" sx={{ width: "100%" }}>
        <table className="csv-data-table" style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr>
              {headers.map((key) => (
                <th
                  key={key}
                  style={{
                    padding: "8px 12px",
                    borderBottom: "2px solid #ccc",
                    textAlign: "left",
                    backgroundColor: "#f9f9f9",
                  }}
                >
                  {capitalizeFirstLetter(key)}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {csvData.map((row, rowIndex) => (
              <tr key={rowIndex}>
                {headers.map((header, cellIndex) => (
                  <td
                    key={cellIndex}
                    style={{
                      padding: "6px 12px",
                      borderBottom: "1px solid #eee",
                      fontSize: "0.9rem",
                    }}
                  >
                    {row[header] ?? ""}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </Box>
    </Box>
  );
};

export default CsvTable;
