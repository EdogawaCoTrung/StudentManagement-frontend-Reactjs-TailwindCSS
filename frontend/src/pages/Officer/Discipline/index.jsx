import {
  flexRender,
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
} from "@tanstack/react-table"
import { createColumnHelper } from "@tanstack/react-table"
import Paper from "@mui/material/Paper"
import InputBase from "@mui/material/InputBase"
import SearchIcon from "@mui/icons-material/Search"
import SwapVertIcon from "@mui/icons-material/SwapVert"
import { Avatar, IconButton } from "@mui/material"
import EditIcon from "@mui/icons-material/Edit"
import DeleteIcon from "@mui/icons-material/Delete"
import FormatListBulletedRoundedIcon from "@mui/icons-material/FormatListBulletedRounded"
import InfoRoundedIcon from "@mui/icons-material/InfoRounded"
import React, { useEffect, useMemo, useState } from "react"
import PropTypes from "prop-types"
import { studentApi } from "../../../apis"
import { gradeApi } from "../../../apis"
import Dropdown from "../../../components/share/Dropdown"
import { toast } from "react-toastify"
import OnlyAddStudentModal from "../../../components/share/OnlyAddStudentModal"
import StudentProfileView from "../../../components/share/StudentProfileView"
import EditStudent from "../../../components/share/EditStudentModal"
import DeleteStudent from "../../../components/share/DeleteStudentModal"

import { useNavigate } from "react-router-dom"
const Disipline = () => {
  const navigate = useNavigate()
  const [classCount, setClassCount] = useState("")
  const [studentCount, setStudentCount] = useState([])
  const [data, setData] = useState("")
  const [id, setId] = useState(0)
  const [checkReload, setCheckReload] = useState(false)
  let [isOpenOnlyAddStudentModal, setOpenOnlyAddStudentModal] = useState(false)
  let [isOpenStudentProfileView, setOpenStudentProfileView] = useState(false)
  let [isOpenEditStudent, setOpenEditStudent] = useState(false)
  let [isOpenDeleteStudent, setOpenDeleteStudent] = useState(false)
  function openDeleteStudent() {
    setOpenDeleteStudent(true)
  }

  function closeDeleteStudent() {
    setOpenDeleteStudent(false)
  }

  function openOnlyAddStudentModal() {
    setOpenOnlyAddStudentModal(true)
  }

  function closeOnlyAddStudentModal() {
    setOpenOnlyAddStudentModal(false)
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
  const HandleStudentDisc = (id) => {
    navigate(`/officerStudentDiscipline/${id}`)
  }
  let fetchAllStudent = async () => {
    let res = await studentApi.getStudentInYear()
    if (res.EC == 1) {
      toast.error(res.EM)
    } else if (res.EC != 1) {
      setData(res.DT)
    }
  }
  const deleteStudent = async (id) => {
    await studentApi.deleteStudent(id)
    setCheckReload(!checkReload)
  }
  useEffect(() => {
    fetchAllStudent()
  }, [checkReload, isOpenOnlyAddStudentModal, isOpenEditStudent, isOpenDeleteStudent])
  const [columnFilters, setColumnFilters] = useState([])
  const searchInput = columnFilters.find((f) => f.id === "studentname")?.value || ""
  const filterGrade = columnFilters.find((f) => f.id === "gradename")?.value || []
  const filterYear = columnFilters.find((f) => f.id === "year")?.value || []
  console.log("FILTERGARA", filterGrade)
  const isActive = filterGrade.includes(10)
  const isActive2 = filterGrade.includes(11)
  const isActive3 = filterGrade.includes(12)
  console.log("ISACTIVE", filterGrade)
  const onFilterChange = (id, value) =>
    setColumnFilters((prev) =>
      prev
        .filter((f) => f.id !== id)
        .concat({
          id,
          value,
        }),
    )
  function convertYear(dateString) {
    const date = new Date(dateString)
    const year = date.getFullYear()
    return year
  }
  console.log("columnFilter: ", columnFilters)
  const columnHelper = createColumnHelper()
  const columnDef = useMemo(
    () => [
      columnHelper.accessor((row) => `${row.id}`, {
        id: "S.No",
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
              <Avatar
                src="/student.png"
                alt="Student"
                sx={{ height: 40, width: 40, marginRight: "12px", border: "solid" }}
              />
            )}
            <div className="flex flex-col">
              <span className="">{info.cell.row.original.student.studentname}</span>
              <span className="text-xs text-neutral-400">{info.cell.row.original.student.User.email}</span>
            </div>
          </div>
        ),
        filterFn: "includesString",
      }),
      columnHelper.accessor((row) => `${row.class.grade.gradename}`, {
        id: "gradename",
        header: "Khối",
        enableColumnFilter: true,
        filterFn: (row, columnId, filterGrades) => {
          const grade = row.getValue(columnId)
          const gradeNumber = parseInt(grade, 10)
          console.log("GRADEID: ", typeof gradeNumber)
          console.log("filterGrades", filterGrades)
          console.log("filterGradesInClude", filterGrades.includes(gradeNumber))
          if (filterGrades.length == 0) {
            return true
          }
          return filterGrades.includes(gradeNumber)
        },
      }),
      columnHelper.accessor((row) => `${row.class.classname}`, {
        id: "classname",
        header: "Lớp",
      }),
      columnHelper.accessor((row) => `${row.student.gender}`, {
        id: "gender",
        header: "Giới tính",
        cell: (info) => <div>{info.getValue() === "1" ? <span>Nam</span> : <span>Nữ</span>}</div>,
      }),
      columnHelper.accessor((row) => `${row}`, {
        id: "action",
        header: "Thao tác",
        cell: (info) => (
          <strong>
            <IconButton
              size="large"
              onClick={() => {
                HandleStudentDisc(info.cell.row.original.id)
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
                openStudentProfileView()
                setId(info.cell.row.original.studentId)
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
    [isOpenOnlyAddStudentModal, isOpenEditStudent, isOpenDeleteStudent],
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
    <div className="mx-14 mb-0 flex h-screen flex-col overflow-hidden p-0">
      <div className="mb-11 mt-10 flex flex-row items-center justify-between align-middle">
        <div className="flex flex-row">
          <button
            onClick={() =>
              setColumnFilters((prev) => {
                const gradeSelect = prev.find((filter) => filter.id === "gradename")?.value
                if (!gradeSelect) {
                  return prev.concat({
                    id: "gradename",
                    value: [10],
                  })
                }
                return prev.map((f) =>
                  f.id === "gradename"
                    ? {
                        ...f,
                        value: isActive ? gradeSelect.filter((s) => s !== 10) : gradeSelect.concat(10),
                      }
                    : f,
                )
              })
            }
            className={`  ${isActive ? "bg-gradeTitle" : "bg-white"} group mr-8 flex animate-jump-in items-center justify-center rounded-full px-8 py-1 text-center align-middle shadow-md transition-all animate-delay-[200ms]  `}
          >
            <p
              className={`text-center font-Manrope text-xl font-semibold text-gradeTitle ${isActive ? "text-white" : "text-gradeTitle"} `}
            >
              Khối 10
            </p>
          </button>
          <button
            onClick={() =>
              setColumnFilters((prev) => {
                const gradeSelect = prev.find((filter) => filter.id === "gradename")?.value
                if (!gradeSelect) {
                  return prev.concat({
                    id: "gradename",
                    value: [11],
                  })
                }
                return prev.map((f) =>
                  f.id === "gradename"
                    ? {
                        ...f,
                        value: isActive2 ? gradeSelect.filter((s) => s !== 11) : gradeSelect.concat(11),
                      }
                    : f,
                )
              })
            }
            className={`  ${isActive2 ? "bg-gradeTitle" : "bg-white"} group mr-8  flex animate-jump-in items-center justify-center rounded-full px-8 py-1 text-center align-middle shadow-md transition-all animate-delay-[350ms] `}
          >
            <p
              className={`text-center font-Manrope text-xl font-semibold text-gradeTitle ${isActive2 ? "text-white" : "text-gradeTitle"} `}
            >
              Khối 11
            </p>
          </button>
          <button
            onClick={() =>
              setColumnFilters((prev) => {
                const gradeSelect = prev.find((filter) => filter.id === "gradename")?.value
                if (!gradeSelect) {
                  return prev.concat({
                    id: "gradename",
                    value: [12],
                  })
                }
                return prev.map((f) =>
                  f.id === "gradename"
                    ? {
                        ...f,
                        value: isActive3 ? gradeSelect.filter((s) => s !== 12) : gradeSelect.concat(12),
                      }
                    : f,
                )
              })
            }
            className={`  ${isActive3 ? "bg-gradeTitle" : "bg-white"} group mr-8 flex animate-jump-in items-center justify-center rounded-full px-8 py-1 text-center align-middle shadow-md transition-all animate-delay-[450ms] `}
          >
            <p
              className={`text-center font-Manrope text-xl font-semibold text-gradeTitle ${isActive3 ? "text-white" : "text-gradeTitle"} `}
            >
              Khối 12
            </p>
          </button>
        </div>
        <div className="">
          <Paper
            component="form"
            sx={{
              p: "2px 4px",
              display: "flex",
              alignItems: "center",
              width: 320,
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
      </div>
      <div className="h-96 overflow-auto">
        <table className="z-0 w-full border-collapse font-Manrope">
          <thead className="w-full">
            {tableInstance.getHeaderGroups().map((header) => {
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
        {isOpenStudentProfileView && (
          <StudentProfileView
            isOpenStudentProfileView={isOpenStudentProfileView}
            closeStudentProfileView={closeStudentProfileView}
            id={id}
          />
        )}
        {isOpenEditStudent && (
          <EditStudent isOpenEditStudent={isOpenEditStudent} closeEditStudent={closeEditStudent} id={id} />
        )}
        {isOpenDeleteStudent && (
          <DeleteStudent isOpenDeleteStudent={isOpenDeleteStudent} closeDeleteStudent={closeDeleteStudent} id={id} />
        )}
      </div>
    </div>
  )
}
Disipline.propTypes = {
  data: PropTypes.any,
  // columnFilters: PropTypes.any,
}
export default Disipline
