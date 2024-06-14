import {
  flexRender,
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
} from "@tanstack/react-table"
import { createColumnHelper } from "@tanstack/react-table"
import SwapVertIcon from "@mui/icons-material/SwapVert"
import { Avatar, IconButton } from "@mui/material"
import React, { useMemo, useState } from "react"
import PropTypes from "prop-types"
import Paper from "@mui/material/Paper"
import InputBase from "@mui/material/InputBase"
import SearchIcon from "@mui/icons-material/Search"
import InfoRoundedIcon from "@mui/icons-material/InfoRounded"
import EditIcon from "@mui/icons-material/Edit"
import DeleteIcon from "@mui/icons-material/Delete"
import DateCell from "../StudentTuitionTable/BillingDate"
import TeacherDelete from "../TeacherDelete"
import TeacherView from "../TeacherView"
import TeacherEdit from "../TeacherEdit"

const TeacherTable = ({ data }) => {
  let [isOpenTeacherView, setOpenTeacherView] = useState(false)
  let [isOpenTeacherEdit, setOpenTeacherEdit] = useState(false)
  let [isOpenTeacherDelete, setOpenTeacherDelete] = useState(false)
  let [id, setId] = useState(0)

  function openTeacherDelete() {
    setOpenTeacherDelete(true)
  }

  function closeTeacherDelete() {
    setOpenTeacherDelete(false)
  }
  function openTeacherView() {
    setOpenTeacherView(true)
  }

  function closeTeacherView() {
    setOpenTeacherView(false)
  }

  function openTeacherEdit() {
    setOpenTeacherEdit(true)
  }

  function closeTeacherEdit() {
    setOpenTeacherEdit(false)
  }

  const [columnFilters, setColumnFilters] = useState([])
  const searchInput = columnFilters.find((f) => f.id === "teachername")?.value || ""
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
      columnHelper.accessor((row) => `${row.id}`, {
        id: "id",
        header: "Id",
      }),
      columnHelper.accessor((row) => `${row.teachername}`, {
        id: "teachername",
        header: "Teacher",
        enableColumnFilter: true,
        cell: (info) => (
          <div className="flex items-center align-middle">
            {info.cell.row.original.User.image != null ? (
              <img
                className="mr-3 h-10 w-10 rounded-full object-cover"
                src={info.cell.row.original.User.image}
                alt="Teacher"
              />
            ) : (
              <Avatar src="/student.png" alt="Teacher" sx={{ height: 40, width: 40, marginRight: "12px" }} />
            )}
            <div className="flex flex-col">
              <span className="">{info.cell.row.original.teachername}</span>
              <span className="text-xs text-neutral-400">{info.cell.row.original.User.email}</span>
            </div>
          </div>
        ),
        filterFn: "includesString",
      }),
      columnHelper.accessor((row) => `${row.birthDate}`, {
        id: "birthDate",
        header: "Date of Birth",
        cell: DateCell,
      }),
      columnHelper.accessor((row) => `${row.startDate}`, {
        id: "startDate",
        header: "Date of Start",
        cell: DateCell,
      }),
      columnHelper.accessor((row) => `${row.gender}`, {
        id: "gender",
        header: "Gender",
        cell: (info) => <div>{info.getValue() === "1" ? <span>Nam</span> : <span>Nữ</span>}</div>,
      }),
      columnHelper.accessor((row) => `${row.subject.subjectname}`, {
        id: "subjectname",
        header: "Subject",
      }),
      columnHelper.accessor((row) => row.id, {
        // Update here to use row ID
        id: "action",
        header: "Thao tác",
        cell: (info) => (
          <strong>
            <IconButton
              size="large"
              onClick={() => {
                console.log(`View clicked on row with id: ${info.getValue()}`)
                openTeacherView()
                setId(info.getValue())
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
            <IconButton
              size="large"
              onClick={() => {
                console.log(`Edit clicked on row with id: ${info.getValue()}`)
                // Add your edit logic here
                openTeacherEdit()
                setId(info.getValue())
              }}
            >
              <EditIcon
                sx={{
                  background: "#7F8F98",
                  color: "white",
                  borderRadius: "50%",
                  fontSize: "30px",
                  padding: "4px",
                  fontWeight: "bold",
                  ":hover": {
                    color: "#3497f9",
                    background: "#8fdc88",
                    transition: "all",
                  },
                }}
              />
            </IconButton>
            <IconButton
              size="large"
              onClick={() => {
                openTeacherDelete()
                setId(info.getValue())
              }}
            >
              <DeleteIcon
                sx={{
                  background: "#7F8F98",
                  color: "white",
                  borderRadius: "50%",
                  fontSize: "30px",
                  padding: "4px",
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
            onChange={(e) => onFilterChange("teachername", e.target.value)}
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
        {isOpenTeacherView && (
          <TeacherView isOpenTeacherView={isOpenTeacherView} closeTeacherView={closeTeacherView} id={id} />
        )}
        {isOpenTeacherEdit && (
          <TeacherEdit isOpenTeacherEdit={isOpenTeacherEdit} closeTeacherEdit={closeTeacherEdit} id={id} />
        )}
        {isOpenTeacherDelete && (
          <TeacherDelete isOpenTeacherDelete={isOpenTeacherDelete} closeTeacherDelete={closeTeacherDelete} id={id} />
        )}
      </div>
    </div>
  )
}
TeacherTable.propTypes = {
  data: PropTypes.any,
  // columnFilters: PropTypes.any,
}
export default TeacherTable
