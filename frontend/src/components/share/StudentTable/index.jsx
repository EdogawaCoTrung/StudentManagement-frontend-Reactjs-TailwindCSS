import {
  flexRender,
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
} from "@tanstack/react-table"
import { CSVLink } from "react-csv"
import { createColumnHelper } from "@tanstack/react-table"
import SwapVertIcon from "@mui/icons-material/SwapVert"
import { Avatar, IconButton } from "@mui/material"
import EditIcon from "@mui/icons-material/Edit"
import DeleteIcon from "@mui/icons-material/Delete"
import FormatListBulletedRoundedIcon from "@mui/icons-material/FormatListBulletedRounded"
import InfoRoundedIcon from "@mui/icons-material/InfoRounded"
import React, { useMemo, useState } from "react"
import PropTypes from "prop-types"
import Paper from "@mui/material/Paper"
import InputBase from "@mui/material/InputBase"
import SearchIcon from "@mui/icons-material/Search"
import { SiMicrosoftexcel } from "react-icons/si"
import { useNavigate } from "react-router-dom"
import StudentProfileView from "../StudentProfileView"
import EditStudent from "../EditStudentModal"
import DeleteStudent from "../DeleteStudentModal"
import { FaFileImport } from "react-icons/fa6"
import Papa from "papaparse"
import { toast } from "react-toastify"
import { subjectApi } from "../../../apis"
const StudentTable = ({ data, role, checkReloading, setCheckReloading }) => {
  const navigate = useNavigate()
  const [columnFilters, setColumnFilters] = useState([])
  const [dataExport, setDataExport] = useState([])
  const [dataImport, setDataImport] = useState([])
  const importScoreByExcelFile = async (data) => {
    let res = await subjectApi.createScoreByExcel(data)
    toast.success("NHAP DIEM!")
  }
  function convertDate(dateString) {
    const date = new Date(dateString)
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, "0")
    const day = String(date.getDate()).padStart(2, "0")
    const formattedDate = `${day}-${month}-${year}`
    return formattedDate
  }
  let [isOpenStudentProfileView, setOpenStudentProfileView] = useState(false)
  let [isOpenEditStudent, setOpenEditStudent] = useState(false)
  let [isOpenDeleteStudent, setOpenDeleteStudent] = useState(false)
  let [id, setId] = useState(0)

  function openDeleteStudent() {
    setOpenDeleteStudent(true)
  }

  function closeDeleteStudent() {
    setOpenDeleteStudent(false)
  }

  function openStudentProfileView() {
    setOpenStudentProfileView(true)
  }

  function closeStudentProfileView() {
    setOpenStudentProfileView(false)
  }

  function openEditStudent() {
    setOpenEditStudent(true)
  }

  function closeEditStudent() {
    setOpenEditStudent(false)
  }
  const HandleClick = (id) => {
    navigate(`/summaries/my-transcript/${id}`)
  }
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
        cell: (info) => <span>{info.row.index + 1}</span>,
        header: "STT",
      }),
      columnHelper.accessor((row) => `${row.studentId}`, {
        id: "id",
        header: "ID",
      }),
      //<span>{info.cell.getValue().studentname}</span>
      columnHelper.accessor((row) => `${row.student.studentname}`, {
        id: "studentname",
        header: "Họ và Tên",
        enableColumnFilter: true,
        cell: (info) => (
          <div className="flex items-center align-middle">
            {info.cell.row.original.student.User.image != null ? (
              <img
                className="mr-3 h-10 w-10 rounded-full object-cover"
                src={info.cell.row.original.student.User.image}
              ></img>
            ) : (
              <Avatar src="/student.png" alt="Student" sx={{ height: 40, width: 40, marginRight: "12px" }} />
            )}
            <div className="flex flex-col">
              <span className="">{info.cell.row.original.student.studentname}</span>
              <span className="text-xs text-neutral-400">{info.cell.row.original.student.User.email}</span>
            </div>
          </div>
        ),
        filterFn: "includesString",
      }),
      columnHelper.accessor((row) => `${row.student.gender}`, {
        id: "gender",
        header: "Giới tính",
        cell: (info) => <div>{info.getValue() === "1" ? <span>Nam</span> : <span>Nữ</span>}</div>,
      }),
      columnHelper.accessor((row) => `${row.studentId}`, {
        id: "action",
        header: "Thao tác",
        cell: (info) => (
          <strong>
            {role == "admin" && (
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
            )}
            {role == "teacher" && (
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
            )}
            <IconButton
              size="large"
              onClick={() => {
                console.log(`View clicked on row with id: ${info.getValue()}`)
                // Add your view logic here
                setId(info.getValue())
                openStudentProfileView()
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
            {role == "admin" && (
              <IconButton
                size="large"
                onClick={() => {
                  console.log(`Edit clicked on row with id: ${info.getValue()}`)
                  // Add your edit logic here
                  setId(info.getValue())
                  openEditStudent()
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
            )}
            {role == "teacher" && (
              <IconButton
                size="large"
                onClick={() => {
                  console.log(`Edit clicked on row with id: ${info.getValue()}`)
                  // Add your edit logic here
                  setId(info.getValue())
                  openEditStudent()
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
            )}
            {role == "admin" && (
              <IconButton
                size="large"
                onClick={() => {
                  console.log(`Delete clicked on row with id: ${info.getValue()}`)
                  // Add your delete logic here
                  setId(info.getValue())
                  openDeleteStudent()
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
            )}
          </strong>
        ),
      }),
    ],
    [checkReloading],
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
      <div className="flex items-center justify-between">
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
            onChange={(e) => onFilterChange("studentname", e.target.value)}
            placeholder="Search..."
          />
        </Paper>
      </div>
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
      {isOpenEditStudent && (
        <EditStudent
          checkReloading={checkReloading}
          setCheckReloading={setCheckReloading}
          isOpenEditStudent={isOpenEditStudent}
          closeEditStudent={closeEditStudent}
          id={id}
        />
      )}
      {isOpenDeleteStudent && (
        <DeleteStudent
          setCheckReloading={setCheckReloading}
          checkReloading={checkReloading}
          isOpenDeleteStudent={isOpenDeleteStudent}
          closeDeleteStudent={closeDeleteStudent}
          id={id}
        />
      )}
    </div>
  )
}
StudentTable.propTypes = {
  data: PropTypes.any,
  role: PropTypes.any,
  // columnFilters: PropTypes.any,
}
export default StudentTable
