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
import EditIcon from "@mui/icons-material/Edit"
import DeleteIcon from "@mui/icons-material/Delete"
import FormatListBulletedRoundedIcon from "@mui/icons-material/FormatListBulletedRounded"
import InfoRoundedIcon from "@mui/icons-material/InfoRounded"
import React, { useEffect, useMemo, useState } from "react"
import PropTypes from "prop-types"
import { Input } from "@mui/material"
import { studentApi } from "../../../apis"
import { gradeApi } from "../../../apis"
import Dropdown from "../../../components/share/Dropdown"
import { toast } from "react-toastify"
const Student = () => {
  const [classCount, setClassCount] = useState("")
  const [studentCount, setStudentCount] = useState("")
  const [data, setData] = useState("")
  function maxGradeYear(year) {
    console.log("goi maxGradeYear")
    let maxYear = year[0].year
    for (let i = 0; i < year.length; i++) {
      if (year[i].year > maxYear) maxYear = year[i].year
    }
    return maxYear
  }
  let [selectYear, setSelectYear] = useState("")
  let fetchAllStudent = async () => {
    let uniqueStudent = new Set()
    let uniqueClass = new Set()
    let res = await studentApi.getAllStudent()
    res.DT.map((student) => {
      uniqueStudent.add(student.studentId)
      uniqueClass.add(student.classId)
    })
    setClassCount(uniqueClass.size)
    setStudentCount(uniqueStudent.size)
    if (res.EC == 1) {
      toast.error(res.EM)
    }
    setData(res.DT)
  }
  const fetchAllYear = async () => {
    let year = await gradeApi.getAllYear()
    if (year.DT) {
      let maxYear = maxGradeYear(year.DT)
      setSelectYear(maxYear)
    }
  }
  useEffect(() => {
    if (selectYear != "") {
      console.log("VaoYear")
      setColumnFilters((prev) => {
        const yearSelect = prev.find((filter) => filter.id === "year")?.value
        if (!yearSelect) {
          return prev.concat({
            id: "year",
            value: selectYear,
          })
        }
        return prev.map((f) =>
          f.id === "year"
            ? {
                ...f,
                value: selectYear,
              }
            : f,
        )
      })
    }
  }, [selectYear])
  useEffect(() => {
    fetchAllStudent()
    fetchAllYear()
  }, [])
  const [columnFilters, setColumnFilters] = useState([])
  const searchInput = columnFilters.find((f) => f.id === "studentname")?.value || ""
  const filterGrade = columnFilters.find((f) => f.id === "gradename")?.value || []
  const filterYear = columnFilters.find((f) => f.id === "year")?.value || []
  console.log("FILTERGARA", filterGrade)
  const isActive = filterGrade.includes(10)
  const isActive2 = filterGrade.includes(11)
  const isActive3 = filterGrade.includes(12)
  console.log("ISACTIVE", filterYear)
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
  const columnDef = useMemo(
    () => [
      columnHelper.accessor("id", {
        id: "S.No",
        cell: (info) => <span>{info.row.index + 1}</span>,
        header: "STT",
      }),
      //<span>{info.cell.getValue().studentname}</span>
      columnHelper.accessor((row) => `${row.student.studentname}`, {
        id: "studentname",
        header: "Ho va Ten",
        enableColumnFilter: true,
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
          return filterGrades.includes(gradeNumber)
        },
      }),
      columnHelper.accessor((row) => `${row.class.classname}`, {
        id: "classname",
        header: "Lop",
      }),
      columnHelper.accessor((row) => `${row.student.gender}`, {
        id: "gender",
        header: "Gioi tinh",
        cell: (info) => <div>{info.getValue() === "1" ? <span>Nam</span> : <span>Nữ</span>}</div>,
      }),
      columnHelper.accessor((row) => `${row.class.grade.year}`, {
        id: "year",
        header: "Năm",
        enableColumnFilter: true,
        filterFn: (row, columnId, filterYear) => {
          const year = row.getValue(columnId)
          const yearNumber = parseInt(year, 10)
          console.log("filterYear", filterYear)
          console.log("GIATRIROW", year)
          console.log("YEARID: ", filterYear[0])
          // console.log("filterYear", filterYear.includes(yearNumber))
          return filterYear == yearNumber
        },
      }),
      columnHelper.accessor("id", {
        id: "action",
        header: "Thao tac",
        cell: (info) => (
          <strong>
            <IconButton
              size="large"
              onClick={() => {
                console.log(`View clicked on row with id: ${info.getValue()}`)
                // Add your view logic here
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
            <IconButton
              size="large"
              onClick={() => {
                console.log(`Edit clicked on row with id: ${info.getValue()}`)
                // Add your edit logic here
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
                console.log(`Delete clicked on row with id: ${info.getValue()}`)
                // Add your delete logic here
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
            className={`  ${isActive ? "bg-gradeTitle" : "bg-white"}  group mr-8 flex items-center justify-center rounded-full px-8 py-1 text-center align-middle shadow-md transition-all  `}
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
            className={`  ${isActive2 ? "bg-gradeTitle" : "bg-white"}  group mr-8 flex items-center justify-center rounded-full px-8 py-1 text-center align-middle shadow-md transition-all `}
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
            className={`  ${isActive3 ? "bg-gradeTitle" : "bg-white"}  group mr-8 flex items-center justify-center rounded-full px-8 py-1 text-center align-middle shadow-md transition-all `}
          >
            <p
              className={`text-center font-Manrope text-xl font-semibold text-gradeTitle ${isActive3 ? "text-white" : "text-gradeTitle"} `}
            >
              Khối 12
            </p>
          </button>
        </div>
        <div className="">
          <Input
            sx={{
              width: "200px",
            }}
            placeholder="Search..."
            value={searchInput}
            onChange={(e) => onFilterChange("studentname", e.target.value)}
          />
        </div>
      </div>
      <div className="mb-11 flex flex-row items-center justify-between align-middle">
        <div className="flex">
          <div className="mr-8 flex h-16 items-center justify-center rounded-lg bg-blurblue px-5 py-1 text-center align-middle shadow-md">
            <p className="text-center font-Manrope text-xl font-medium text-black">Số học sinh: {studentCount}</p>
          </div>
          <div className="flex h-16 items-center justify-center rounded-lg bg-blurblue px-5 py-1 text-center align-middle shadow-md">
            <p className="text-center font-Manrope text-xl font-medium text-black">Số lớp: {classCount}</p>
          </div>
        </div>
        <div className="flex">
          <Dropdown selectYear={selectYear} setSelectYear={setSelectYear}></Dropdown>
          <button className=" ml-8 flex items-center justify-center rounded-full bg-backgroundplus px-2 py-1 text-center align-middle shadow-md">
            <p className="text-center font-Manrope text-xl font-semibold text-white">Thêm học sinh</p>
          </button>
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
      </div>
    </div>
  )
}
Student.propTypes = {
  data: PropTypes.any,
  // columnFilters: PropTypes.any,
}
export default Student