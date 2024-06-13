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
const StudentTable = ({ data, role }) => {
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
  const getUsersExport = (event, done) => {
    let result = []
    if (data && data.length > 0) {
      result.push(["Id", "Student Name", "Gender", "Email", "Date of birth", "classId", "subjectId"])
      data.map((item, index) => {
        let arr = []
        let genderFormat
        if (item.student.gender == 1) {
          genderFormat = "Nam"
        } else if (item.student.gender != 1) {
          genderFormat = "Nữ"
        }

        arr[0] = item.studentId
        arr[1] = item.student.studentname
        arr[2] = genderFormat
        arr[3] = item.student.User.email
        arr[4] = convertDate(item.student.birthDate)
        result.push(arr)
      })
      setDataExport(result)
      done()
    }
  }
  let HandleImport = (event) => {
    if (event.target && event.target.files && event.target.files[0]) {
      let file = event.target.files[0]
      if (file.type !== "text/csv") {
        toast.error("Only accept CSV files!")
        return
      }
      Papa.parse(file, {
        complete: function (results) {
          let rawCsv = results.data
          console.log("rawCSVFORMA", rawCsv.length, rawCsv[0])
          if (rawCsv.length > 0) {
            if (rawCsv[0] && rawCsv.length > 1) {
              if (
                rawCsv[0][0] !== "studentId" ||
                rawCsv[0][1] !== "classId" ||
                rawCsv[0][2] !== "subjectId" ||
                rawCsv[0][3] !== "fifteen_1" ||
                rawCsv[0][4] !== "fifteen_2" ||
                rawCsv[0][5] !== "fifteen_3" ||
                rawCsv[0][6] !== "fifteen_4" ||
                rawCsv[0][7] !== "fourtyFive_1" ||
                rawCsv[0][8] !== "fourtyFive_2" ||
                rawCsv[0][9] !== "finalExam" ||
                rawCsv[0][10] !== "teacherComment"
              ) {
                toast.error("Wrong format!")
              } else {
                console.log("rawCSV", rawCsv)
                let rawCSVFormat = rawCsv.slice(1)
                let result = []
                rawCSVFormat.map((item, index) => {
                  console.log("INDEXCHECK", item, item.length, item > 0)
                  if (item.length > 2) {
                    console.log("CHAYVOMAP")
                    let obj = {}
                    obj.studentId = item[0]
                    obj.classId = item[1]
                    obj.subjectId = item[2]
                    obj.fifteen_1 = item[3]
                    obj.fifteen_2 = item[4]
                    obj.fifteen_3 = item[5]
                    obj.fifteen_4 = item[6]
                    obj.fourtyFive_1 = item[7]
                    obj.fourtyFive_2 = item[8]
                    obj.finalExam = item[9]
                    obj.teacherComment = item[10]
                    result.push(obj)
                  }
                })
                console.log("IMPORT RESULT", result)
                let listScore = {
                  data: result,
                }
                importScoreByExcelFile(listScore)
                setDataImport(result)
              }
            } else toast.error("Wrong format!")
          } else toast.error("Not found data in file!")
        },
      })
    }
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
        header: "Id",
      }),
      //<span>{info.cell.getValue().studentname}</span>
      columnHelper.accessor((row) => `${row.student.studentname}`, {
        id: "studentname",
        header: "Ho va Ten",
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
        header: "Gioi tinh",
        cell: (info) => <div>{info.getValue() === "1" ? <span>Nam</span> : <span>Nữ</span>}</div>,
      }),
      columnHelper.accessor((row) => `${row.studentId}`, {
        id: "action",
        header: "Thao tac",
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
        <div className="flex items-center">
          <CSVLink
            className="flex w-fit items-center rounded-md bg-gradeTitle2 px-[12px] py-[6px] font-Manrope font-bold text-white decoration-0 transition-all visited:text-white hover:bg-green-950 hover:text-white"
            filename={"students.csv"}
            data={dataExport}
            asyncOnClick={true}
            onClick={getUsersExport}
          >
            <SiMicrosoftexcel className="mr-2"></SiMicrosoftexcel>Export
          </CSVLink>
          <label
            htmlFor="importcsv"
            className="mt-2 flex w-fit cursor-pointer items-center rounded-md bg-uploadBtn px-[12px] py-[6px] font-Manrope font-bold text-white decoration-0 transition-all visited:text-white hover:bg-blue-950 hover:text-white"
          >
            <FaFileImport />
            Import
          </label>
          <input type="file" id="importcsv" hidden onChange={(event) => HandleImport(event)}></input>
        </div>
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
        <EditStudent isOpenEditStudent={isOpenEditStudent} closeEditStudent={closeEditStudent} id={id} />
      )}
      {isOpenDeleteStudent && (
        <DeleteStudent isOpenDeleteStudent={isOpenDeleteStudent} closeDeleteStudent={closeDeleteStudent} id={id} />
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
