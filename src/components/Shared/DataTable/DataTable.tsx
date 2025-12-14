import { ChevronLeft, ChevronRight } from "lucide-react";
import { ReactNode } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export interface Column<T> {
  header: string;
  accessor?: keyof T;
  render?: (item: T) => ReactNode;
  headerClassName?: string;
  cellClassName?: string;
  hideOnMobile?: boolean;
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
  setItemsPerPage?: (itemsPerPage: number) => void;
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
  setItemsPerPage,
}: DataTableProps<T>) {
  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const handlePrevious = () => {
    if (currentPage > 1 && onPageChange) onPageChange(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages && onPageChange) onPageChange(currentPage + 1);
  };

  return (
    <div className="w-full space-y-4">
      {title && (
        <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-900">
          {title}
        </h2>
      )}

      <div className="rounded-md border bg-white overflow-x-auto">
        <Table className="min-w-full">
          <TableHeader>
            <TableRow>
              {columns.map((column, index) => (
                <TableHead
                  key={index}
                  className={`px-2 sm:px-4 py-3 text-xs sm:text-sm font-medium whitespace-nowrap ${
                    column.hideOnMobile ? "hidden sm:table-cell" : ""
                  } ${column.headerClassName || ""}`}
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
                  className="h-24 text-center text-muted-foreground"
                >
                  {emptyMessage}
                </TableCell>
              </TableRow>
            ) : (
              data.map((item) => (
                <TableRow
                  key={getRowKey(item)}
                  className={
                    onRowClick
                      ? "cursor-pointer hover:bg-gray-50"
                      : "hover:bg-gray-50"
                  }
                  onClick={() => onRowClick?.(item)}
                >
                  {columns.map((column, index) => (
                    <TableCell
                      key={index}
                      className={`px-2 sm:px-4 py-3 text-xs sm:text-sm whitespace-nowrap ${
                        column.hideOnMobile ? "hidden sm:table-cell" : ""
                      } ${column.cellClassName || ""}`}
                    >
                      {column.render
                        ? column.render(item)
                        : column.accessor
                        ? String(item[column.accessor as keyof T])
                        : null}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {showPagination && totalItems > 0 && (
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 px-2">
          <div className="text-xs sm:text-sm text-muted-foreground flex items-center gap-2">
            Showing {startItem}-{endItem} of {totalItems}
            <div>
              <Select
                onValueChange={(value) => {
                  if (setItemsPerPage) setItemsPerPage(Number(value));
                }}
              >
                <SelectTrigger className="w-[100px]">
                  <SelectValue placeholder="Show per page" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Items per page</SelectLabel>
                    <SelectItem value="4">4 Items</SelectItem>
                    <SelectItem value="10">10 Items</SelectItem>
                    <SelectItem value="20">20 Items</SelectItem>
                    <SelectItem value="30">30 Items</SelectItem>
                    <SelectItem value="40">40 Items</SelectItem>
                    <SelectItem value="50">50 Items</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="flex gap-2">
            <button
              onClick={handlePrevious}
              disabled={currentPage === 1}
              className="p-1.5 sm:p-2 rounded border border-gray-300 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              aria-label="Previous page"
            >
              <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
            <button
              onClick={handleNext}
              disabled={currentPage === totalPages}
              className="p-1.5 sm:p-2 rounded border border-gray-300 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              aria-label="Next page"
            >
              <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
