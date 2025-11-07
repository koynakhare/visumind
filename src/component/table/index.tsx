"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
  Button,
  useTheme,
  TableSortLabel,
  TablePagination,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { Column } from "../types/table";
import AddIcon from "@mui/icons-material/Add";
import ThemeButton from "../customComponents/button";
import ActionCell from "./actionCell";
import { isEmpty } from "lodash";
import TableSkeleton from "./tableLoading";

type Order = "asc" | "desc";

interface GlobalTableProps<T> {
  data: T[];
  columns: Column<T>[];
  loading?: boolean;
  actionButton?: {
    label: string;
    onClick: () => void;
    icon?: React.ReactNode;
  };
}

export default function GlobalTable<T extends Record<string, any>>({
  data,
  columns,
  loading,
  actionButton,
}: GlobalTableProps<T>) {
  const theme = useTheme();

  // State for sorting
  const [order, setOrder] = useState<Order>("asc");
  const [orderBy, setOrderBy] = useState<keyof T | null>(null);

  // State for pagination
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  // Sorting logic
  const handleSort = (property: keyof T) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const sortedData = React.useMemo(() => {
    if (!orderBy) return data;
    return [...data]?.sort((a, b) => {
      if (a?.[orderBy] < b?.[orderBy]) return order === "asc" ? -1 : 1;
      if (a?.[orderBy] > b?.[orderBy]) return order === "asc" ? 1 : -1;
      return 0;
    });
  }, [data, order, orderBy]);

  // Paginated data
  const paginatedData = sortedData?.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  return (
    <Paper
      sx={{
        borderRadius: 4,
        overflow: "hidden",
        boxShadow: "none",
      }}
    >
      {actionButton && (
        <Box
          display="flex"
          justifyContent="flex-end"
          p={2}
        >

          <ThemeButton
            variant="contained"
            onClick={actionButton.onClick}
          >
            {actionButton.label}
          </ThemeButton>

        </Box>
      )}
      {loading ? (
        <TableSkeleton rows={5} columns={columns.length} />
      ) : (
        <TableContainer
          sx={{
            maxHeight: data.length > 5 ? 500 : "auto",
            overflowX: "auto",
            overflowY: data.length > 5 ? "auto" : "visible",
          }}
        >
          <Table
            stickyHeader
            sx={{
              width: "100%",
              minWidth: 0,
              borderCollapse: "collapse",
              tableLayout: "fixed",
            }}
          >
            <TableHead>
              <TableRow>
                {columns?.map((col) => (
                  <TableCell
                    key={String(col?.key)}
                    sortDirection={orderBy === col?.key ? order : false}
                    sx={{
                      fontWeight: 700,
                      width: '200px',
                      fontSize: 15,
                      padding: "8px 16px",
                      boxSizing: "border-box",
                      backgroundColor: theme.palette.background.default,
                      letterSpacing: 0.5,
                      borderRight: "1px solid rgba(255,255,255,0.2)",
                    }}
                  >
                    {col?.type !== "action" ? <TableSortLabel
                      active={orderBy === col.key}
                      direction={orderBy === col.key ? order : "asc"}
                      onClick={() => handleSort(col.key || "")}
                    >
                      {col.label}
                    </TableSortLabel> :

                      <Box width={"100%"} sx={{
                        display: col?.type === "action" ? "flex" : "",
                        justifyContent: col?.type === "action" ? 'flex-end' : 'flex-start',
                      }}>
                        {col.label}
                      </Box>}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>

            <TableBody>
              {!isEmpty(paginatedData) ? paginatedData?.map((row, index) => (
                <TableRow
                  key={index}
                  sx={{
                    backgroundColor: index % 2 === 0 ? "#fff" : "#fdf7ff",
                    "&:hover": {
                      backgroundColor: '#fff0f6',
                    },
                  }}
                >
                  {columns?.map((col, colIndex) => {
                    switch (col.type) {
                      case "action":
                        return (
                          <TableCell
                            key={`action-${colIndex}`}
                            align="right"
                            sx={{
                              padding: "4px 12px", // match compact size
                              verticalAlign: "middle",
                            }}
                          >
                            <ActionCell actions={col?.action || []} row={row} />
                          </TableCell>

                        );

                      default:
                        return (
                          <TableCell

                            key={String(col.key)}
                            sx={{
                              fontSize: 14,
                              padding: "8px 16px",
                              borderBottom: "1px solid",
                              borderColor: "rgba(0,0,0,0.05)",
                            }}
                          >
                            {row?.[col.key as keyof T] as React.ReactNode}
                          </TableCell>
                        );
                    }
                  })}
                </TableRow>
              )) : <TableRow style={{ height: '100px' }}>
                <TableCell colSpan={columns.length} style={{ padding: '16px' }}>
                  <Typography variant="body2" color="text.secondary" textAlign={'center'}>
                    No data found
                  </Typography>
                </TableCell>
              </TableRow>}
            </TableBody>

          </Table>
        </TableContainer>)}

      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={data.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={(_, newPage) => setPage(newPage)}
        onRowsPerPageChange={(e) => {
          setRowsPerPage(parseInt(e.target.value, 10));
          setPage(0);
        }}
      />
    </Paper>
  );
}
