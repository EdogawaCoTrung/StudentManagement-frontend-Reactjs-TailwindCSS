import {
  flexRender,
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
} from "@tanstack/react-table"
import { createColumnHelper } from "@tanstack/react-table"
import SwapVertIcon from "@mui/icons-material/SwapVert"
import { Button, IconButton } from "@mui/material"
import React, { useMemo, useState } from "react"
import PropTypes from "prop-types"
import { Checkbox } from "@mui/material"
import Paper from "@mui/material/Paper"
import InputBase from "@mui/material/InputBase"
import SearchIcon from "@mui/icons-material/Search"
import { info } from "autoprefixer"
const StudentTuitionTable = ({ data }) => {
  const [columnFilters, setColumnFilters] = useState([])
  const searchInput = columnFilters.find((f) => f.id === "studentname")?.value || ""
  const onFilterChange = (id, value) =>
    setColumnFilters((prev) =>
      prev
        .filter((f) => f.id !== id)
        .concat({
          id,
          value,
        }),
    )
  const columnHelper = createColumnHelper()
  const columnDef1 = useMemo(
    () => [
      columnHelper.accessor("id", {
        id: "S.No",
        cell: (info) => <Checkbox value={info.getValue()}></Checkbox>,
        header: <Checkbox></Checkbox>,
      }),
      //<span>{info.cell.getValue().studentname}</span>
      columnHelper.accessor((row) => `${row.studentname}`, {
        id: "studentname",
        header: "Ho va Ten",
      }),
      columnHelper.accessor((row) => `${row.classname}`, {
        id: "classname",
        header: "Lop",
      }),
      columnHelper.accessor((row) => `${row.date}`, {
        id: "BillingDate",
        header: "BillingDate",
      }),
      columnHelper.accessor((row) => `${row.status}`, {
        id: "status",
        header: "status",
        cell: (info) => (
          <div className="flex w-fit flex-col">
            {info.row.original.status == 1 ? (
              <div className="gap-2 rounded-lg bg-paidBg px-2 py-1 font-Manrope font-semibold text-paidFontColor">
                Paid
              </div>
            ) : (
              <div className="bg-unpaidBg text-unpaidFontColor gap-2 rounded-lg px-2 py-1 font-Manrope font-semibold">
                UnPaid
              </div>
            )}
          </div>
        ),
      }),
      columnHelper.accessor((row) => `${row.total}`, {
        id: "total",
        header: "Tổng tiền",
      }),
      columnHelper.accessor((row) => `${row}`, {
        id: "status",
        cell: (info) => (
          <div className="flex w-fit flex-col">
            {info.row.original.status == 0 ? (
              <button
                onClick={() => console.log("GOPAY", info.getValue())}
                className="bg-bgPay gap-2 rounded-lg px-2 py-1 font-Manrope font-normal text-white"
              >
                Pay
              </button>
            ) : (
              <button
                disabled
                className="gap-2 rounded-lg bg-neutral-200 px-2 py-1 font-Manrope font-normal text-neutral-500"
              >
                Pay
              </button>
            )}
          </div>
        ),
      }),
    ],
    [],
  )
  const finalData1 = React.useMemo(() => data, [data])
  const tableInstance1 = useReactTable({
    columns: columnDef1,
    data: finalData1,
    state: {
      columnFilters,
    },
    getSortedRowModel: getSortedRowModel(),
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    columnResizeMode: "onChange",
  })
  return (
    <div className="relative z-10 mt-10 flex flex-col">
      <div className="bg-bgSearch p-3">
        <Paper component="form" sx={{ p: "2px 4px", display: "flex", alignItems: "center", width: 400 }}>
          <IconButton sx={{ p: "10px" }} aria-label="menu">
            <SearchIcon />
          </IconButton>
          <InputBase
            sx={{
              ml: 1,
              flex: 1,
              borderWidth: 0,
              border: "none",
              borderRadius: 0,
              ":active": {
                border: "none",
                borderWidth: 0,
              },
              ":focus": {
                border: "none",
                borderWidth: 0,
              },
              appearance: "none",
            }}
            value={searchInput}
            onChange={(e) => onFilterChange("studentname", e.target.value)}
            placeholder="Search..."
          />
        </Paper>
      </div>
      <div className="relative z-10 h-96 overflow-auto bg-white">
        <table className="z-0 w-full border-collapse font-Manrope">
          <thead className="w-full">
            {tableInstance1.getHeaderGroups().map((header) => {
              return (
                <tr className=" z-10 h-fit" key={header.id}>
                  {header.headers.map((column) => {
                    return (
                      <th
                        className="text-1xl sticky border-b-2 pb-2 text-left font-semibold tracking-wide"
                        key={column.id}
                        colSpan={column.colSpan}
                      >
                        {flexRender(column.column.columnDef.header, column.getContext())}
                        {column.column.getCanSort() && (
                          <IconButton
                            sx={{ marginLeft: "5px", borderWidth: "0px" }}
                            onClick={column.column.getToggleSortingHandler()}
                          >
                            <SwapVertIcon sx={{ fontSize: "20px" }}></SwapVertIcon>
                          </IconButton>
                        )}
                      </th>
                    )
                  })}
                </tr>
              )
            })}
          </thead>
          <tbody>
            {tableInstance1.getRowModel().rows.map((row) => {
              return (
                <tr key={row.id}>
                  {row.getVisibleCells().map((cell) => {
                    return (
                      <td className="p-5 pl-0 font-normal" key={cell.id}>
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </td>
                    )
                  })}
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}
StudentTuitionTable.propTypes = {
  data: PropTypes.any,
  // columnFilters: PropTypes.any,
}
export default StudentTuitionTable
