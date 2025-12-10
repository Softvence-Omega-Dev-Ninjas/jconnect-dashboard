import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { ReactNode } from "react";

export interface Column<T> {
  header: string;
  accessor?: keyof T;
  render?: (item: T) => ReactNode;
  headerClassName?: string;
  cellClassName?: string;
}

interface DataTableProps<T> {
  title?: string;
  columns: Column<T>[];
  data: T[];
  emptyMessage?: string;
  onRowClick?: (item: T) => void;
  getRowKey: (item: T) => string;
  showPagination?: boolean;
  currentPage?: number;
  totalItems?: number;
  itemsPerPage?: number;
  onPageChange?: (page: number) => void;
}

export function DataTable<T>({
  title,
  columns,
  data,
  emptyMessage = "No data found",
  onRowClick,
  getRowKey,
  showPagination = false,
  currentPage = 1,
  totalItems = 0,
  itemsPerPage = 10,
  onPageChange,
}: DataTableProps<T>) {
  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const handlePrevious = () => {
    if (currentPage > 1 && onPageChange) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages && onPageChange) {
      onPageChange(currentPage + 1);
    }
  };

  return (
    <div className="w-full">
      {title && (
        <div className="px-4 md:px-6 py-4">
          <h2 className="text-xl md:text-2xl font-semibold text-gray-900">{title}</h2>
        </div>
      )}
      
      <div className="w-full bg-white shadow-sm rounded-lg">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="border-b-2">
                {columns.map((column, index) => (
                  <TableHead
                    key={index}
                    className={`font-medium text-gray-600 text-sm md:text-base px-2 md:px-4 ${
                      column.headerClassName || ""
                    }`}
                  >
                    {column.header}
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="text-center py-8 text-gray-500"
                  >
                    {emptyMessage}
                  </TableCell>
                </TableRow>
              ) : (
                data.map((item) => (
                  <TableRow
                    key={getRowKey(item)}
                    className="hover:bg-gray-50 cursor-pointer border-gray-200 transition-colors"
                    onClick={() => onRowClick?.(item)}
                  >
                    {columns.map((column, index) => (
                      <TableCell
                        key={index}
                        className={`py-3 md:py-4 px-2 md:px-4 text-xs md:text-sm text-gray-900 ${
                          column.cellClassName || ""
                        }`}
                      >
                        {column.render
                          ? column.render(item)
                          : column.accessor
                          ? String(item[column.accessor])
                          : null}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </div>

      {showPagination && totalItems > 0 && (
        <div className="w-full bg-white rounded-b-lg">
          <div className="px-3 md:px-6 py-3 md:py-4 border-t bg-gray-50 flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="text-xs md:text-sm text-gray-600">
              Showing {startItem}-{endItem} of {totalItems}
            </div>
            <div className="flex gap-2">
              <button
                onClick={handlePrevious}
                disabled={currentPage === 1}
                className="p-2 rounded border border-gray-300 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                aria-label="Previous page"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={handleNext}
                disabled={currentPage === totalPages}
                className="p-2 rounded border border-gray-300 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                aria-label="Next page"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}