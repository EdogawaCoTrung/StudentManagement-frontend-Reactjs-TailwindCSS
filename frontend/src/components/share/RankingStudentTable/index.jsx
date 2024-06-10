import {
  flexRender,
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
} from "@tanstack/react-table"
import { createColumnHelper } from "@tanstack/react-table"
import SwapVertIcon from "@mui/icons-material/SwapVert"
import { IconButton } from "@mui/material"
import FormatListBulletedRoundedIcon from "@mui/icons-material/FormatListBulletedRounded"
import InfoRoundedIcon from "@mui/icons-material/InfoRounded"
import React, { useMemo } from "react"
import PropTypes from "prop-types"
import { useNavigate } from "react-router-dom"
const RankingStudentTable = ({ data }) => {
  const columnHelper = createColumnHelper()
  const navigate = useNavigate()
  const HandleClick = (id) => {
    navigate(`/summaries/my-transcript/${id}`)
  }
  // eslint-disable-next-line
  const columnDef = useMemo(
    () => [
      columnHelper.accessor("id", {
        id: "S.No",
        cell: (info) => <span>{info.row.index + 1}</span>,
        header: "STT",
      }),
      columnHelper.accessor((row) => `${row.id}`, {
        id: "id",
        header: "Id",
      }),
      //<span>{info.cell.getValue().studentname}</span>
      columnHelper.accessor((row) => `${row.studentname}`, {
        id: "studentname",
        header: "Ho va Ten",
      }),
      columnHelper.accessor((row) => `${row.concludecore}`, {
        id: "gpa",
        header: "GPA",
      }),
      columnHelper.accessor((row) => `${row.classname}`, {
        id: "classname",
        header: "Lớp",
      }),
      columnHelper.accessor("id", {
        id: "action",
        header: "Thao tac",
        cell: (info) => (
          <strong>
            <IconButton
              size="large"
              onClick={() => {
                HandleClick(info.getValue())
              }}
            >
              <FormatListBulletedRoundedIcon
                sx={{
                  background: "#7F8F98",
                  color: "white",
                  borderRadius: "50%",
                  fontSize: "30px",
                  padding: "3px",
                  fontWeight: "bold",
                  ":hover": {
                    color: "#3497f9",
                    background: "#8fdc88",
                    transition: "all",
                  },
                }}
                className="bg-black"
              />
            </IconButton>
            <IconButton
              size="large"
              onClick={() => {
                console.log(`View clicked on row with id: ${info.getValue()}`)
                // Add your view logic here
              }}
            >
              <InfoRoundedIcon
                sx={{
                  background: "#7F8F98",
                  color: "white",
                  borderRadius: "50%",
                  fontSize: "30px",
                  padding: "3px",
                  fontWeight: "bold",
                  ":hover": {
                    color: "#3497f9",
                    background: "#8fdc88",
                    transition: "all",
                  },
                }}
              />
            </IconButton>
          </strong>
        ),
      }),
    ],
    [],
  )
  const finalData = React.useMemo(() => data, [data])
  const tableInstance = useReactTable({
    columns: columnDef,
    data: finalData,
    getSortedRowModel: getSortedRowModel(),
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    columnResizeMode: "onChange",
  })
  return (
    <div className="mt-4 flex flex-col rounded-xl bg-white">
      <p className="p-4 font-Manrope text-base font-semibold text-black">Top 10 Students</p>
      <table className="mx-8 h-full border-collapse font-Manrope">
        <thead className="sticky z-10 h-fit">
          {tableInstance.getHeaderGroups().map((header) => {
            return (
              <tr key={header.id}>
                {header.headers.map((column) => {
                  return (
                    <th
                      className="text-1xl sticky bg-headerTable p-2 text-left font-semibold tracking-wide"
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
  )
}
RankingStudentTable.propTypes = {
  data: PropTypes.any,
  // columnFilters: PropTypes.any,
}
export default RankingStudentTable
