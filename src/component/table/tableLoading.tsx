import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Skeleton,
} from "@mui/material";

interface TableSkeletonProps {
  rows?: number;
  columns?: number;
}

const TableSkeleton: React.FC<TableSkeletonProps> = ({
  rows = 6,
  columns = 5,
}) => {
  return (
    <div className="custom-table-skeleton">
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <Skeleton variant="rounded" width={24} height={24} />
              </TableCell>
              {Array.from({ length: columns - 1 }).map((_, index) => (
                <TableCell key={index}>
                  <Skeleton variant="text" />
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {Array.from({ length: rows }).map((_, rowIndex) => (
              <TableRow key={rowIndex}>
                <TableCell sx={{ minWidth: "80px" }}>
                  <Skeleton variant="rounded" width={24} height={24} />
                </TableCell>
                {Array.from({ length: columns - 1 }).map((_, colIndex) => (
                  <TableCell key={colIndex} sx={{ minWidth: "80px" }}>
                    <Skeleton variant="rounded" width="100%" height={30} />
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default TableSkeleton;
