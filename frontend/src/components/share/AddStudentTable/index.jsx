import {
  flexRender,
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
} from "@tanstack/react-table"
import { createColumnHelper } from "@tanstack/react-table"
import SwapVertIcon from "@mui/icons-material/SwapVert"
import { Checkbox, IconButton } from "@mui/material"
import InfoRoundedIcon from "@mui/icons-material/InfoRounded"
import React, { useMemo, useState } from "react"
import PropTypes from "prop-types"
import Paper from "@mui/material/Paper"
import InputBase from "@mui/material/InputBase"
import SearchIcon from "@mui/icons-material/Search"
import StudentProfileView from "../StudentProfileView"

const AddStudentTable = ({ HandleSetCheckValue, data }) => {

  let [id, setId] = useState(0)
  let [isOpenStudentProfileView, setOpenStudentProfileView] = useState(false)
  function openStudentProfileView() {
    setOpenStudentProfileView(true)
  }

  function closeStudentProfileView() {
    setOpenStudentProfileView(false)
  }

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
  console.log("columnFilter: ", columnFilters)
  const columnHelper = createColumnHelper()
  // eslint-disable-next-line
  const columnDef = useMemo(
    () => [
      columnHelper.accessor("id", {
        id: "S.No",
        cell: (info) => <Checkbox value={info.getValue()} onChange={HandleSetCheckValue}></Checkbox>,
        header: <Checkbox></Checkbox>,
      }),
      {
        accessorKey: "id",
        header: "Id",
      },
      //<span>{info.cell.getValue().studentname}</span>
      columnHelper.accessor((row) => `${row.studentname}`, {
        id: "studentname",
        header: "Họ và Tên",
      }),
      columnHelper.accessor((row) => `${row.gender}`, {
        id: "gender",
        header: "Giới tính",
        cell: (info) => <div>{info.getValue() === "1" ? <span>Nam</span> : <span>Nữ</span>}</div>,
      }),
      columnHelper.accessor("id", {
        id: "action",
        header: "Thao tác",
        cell: (info) => (
          <strong>
            <IconButton
              size="large"
              onClick={() => {
                console.log(`View clicked on row with id: ${info.getValue()}`)
                // Add your view logic here
                setId(info.getValue());
                openStudentProfileView();
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
    state: {
      columnFilters,
    },
    getSortedRowModel: getSortedRowModel(),
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    columnResizeMode: "onChange",
  })
  return (
    <div className="flex flex-col">
      <Paper
        component="form"
        sx={{ p: "2px 4px", display: "flex", alignItems: "center", width: 400, marginBottom: "8px" }}
      >
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
      <table className="h-full w-full border-collapse font-Manrope">
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
                      {column.id !== "action" && column.id !== "S.No" && column.column.getCanSort() && (
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
      {isOpenStudentProfileView && (
        <StudentProfileView
          isOpenStudentProfileView={isOpenStudentProfileView}
          closeStudentProfileView={closeStudentProfileView}
          id={id}
        />
      )}
    </div>
  )
}
AddStudentTable.propTypes = {
  data: PropTypes.any,
  HandleSetCheckValue: PropTypes.any,
}
export default AddStudentTable
