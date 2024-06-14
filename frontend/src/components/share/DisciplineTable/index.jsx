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
import Paper from "@mui/material/Paper"
import InputBase from "@mui/material/InputBase"
import SearchIcon from "@mui/icons-material/Search"
import AddAssignmentModal from "../AddAssignmentModal"
import DateCell from "../StudentTuitionTable/BillingDate"
import { summaryApi } from "../../../apis"
import { toast } from "react-toastify"
const DisciplineTable = ({ data, checkReLoading, setCheckReLoading }) => {
  const [columnFilters, setColumnFilters] = useState([])
  const handleDelete = async (id) => {
    let res = await summaryApi.deleteDisciplines(id)
    if (res.EC != 1) {
      toast.success("Xóa thành công!")
      setCheckReLoading(!checkReLoading)
    }
  }
  const searchInput = columnFilters.find((f) => f.id === "classname")?.value || ""
  const onFilterChange = (id, value) =>
    setColumnFilters((prev) =>
      prev
        .filter((f) => f.id !== id)
        .concat({
          id,
          value,
        }),
    )
  console.log("columnFilter: ", columnFilters)
  const columnHelper = createColumnHelper()
  // eslint-disable-next-line
  const columnDef = useMemo(
    () => [
      columnHelper.accessor("id", {
        id: "S.No",
        cell: (info) => <span>{info.row.index + 1}</span>,
        header: "STT",
      }),
      columnHelper.accessor((row) => `${row.typeinfringe.typename}`, {
        id: "violaterule",
        header: "Violaterule",
      }),
      //<span>{info.cell.getValue().studentname}</span>
      columnHelper.accessor((row) => `${row.reason}`, {
        id: "reason",
        header: "Reason",
      }),
      columnHelper.accessor((row) => `${row.violateruledate}`, {
        id: "violateruledate",
        header: "Violateruledate",
        cell: DateCell,
      }),
      columnHelper.accessor((row) => `${row.typeinfringe.minuspoint}`, {
        id: "minuspoint",
        header: "minuspoint",
      }),
      columnHelper.accessor((row) => `${row.id}`, {
        id: "action",
        header: "Thao tác",
        cell: (info) => (
          <div key={info.cell.row.original.id} className="flex justify-between">
            <Button
              key={info.cell.row.original.id}
              onClick={() => handleDelete(info.cell.row.original.id)}
              variant="contained"
              color="error"
            >
              delete
            </Button>
          </div>
        ),
      }),
    ],
    [],
  )
  const finalData = React.useMemo(() => data, [data])
  const tableInstance = useReactTable({
    columns: columnDef,
    data: finalData,
    state: {
      columnFilters,
    },
    getSortedRowModel: getSortedRowModel(),
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    columnResizeMode: "onChange",
  })
  return (
    <div className=" flex h-screen flex-col">
      <div className="animate-fade-right">
        <Paper
          component="form"
          sx={{
            p: "2px 4px",
            display: "flex",
            alignItems: "center",
            width: 400,
            marginBottom: "8px",
          }}
        >
          <IconButton sx={{ p: "10px", background: "#13313D", color: "white" }} aria-label="menu">
            <SearchIcon />
          </IconButton>
          <InputBase
            sx={{
              ml: 2,
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
            onChange={(e) => onFilterChange("classname", e.target.value)}
            placeholder="Search..."
          />
        </Paper>
      </div>
      <div className="h-[400px] overflow-auto">
        <table className="h-full w-full border-collapse overflow-auto font-Manrope">
          <thead>
            {tableInstance.getHeaderGroups().map((header) => {
              return (
                <tr className="sticky z-10 h-fit" key={header.id}>
                  {header.headers.map((column) => {
                    return (
                      <th
                        className="text-1xl sticky border-b-2 pb-2 text-left font-semibold tracking-wide"
                        key={column.id}
                        colSpan={column.colSpan}
                      >
                        {flexRender(column.column.columnDef.header, column.getContext())}
                        {column.id !== "action" && column.column.getCanSort() && (
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
          <tbody className="animate-fade-down">
            {tableInstance.getRowModel().rows.map((row) => {
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
DisciplineTable.propTypes = {
  data: PropTypes.any,
  checkReLoadingc: PropTypes.any,
  setCheckReLoading: PropTypes.any,
}
export default DisciplineTable
