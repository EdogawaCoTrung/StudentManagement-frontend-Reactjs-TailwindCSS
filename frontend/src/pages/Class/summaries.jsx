import {
  flexRender,
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
} from "@tanstack/react-table"
import { toast } from "react-toastify"
import { createColumnHelper } from "@tanstack/react-table"
import { useParams } from "react-router"
import SwapVertIcon from "@mui/icons-material/SwapVert"
import { IconButton } from "@mui/material"
import { GrLinkPrevious } from "react-icons/gr"
import React, { useEffect, useMemo, useState } from "react"
import { useNavigate } from "react-router"
import { classApi } from "../../apis"
export default function Summaries() {
  const [data, setData] = useState("")
  const [classname, setClassName] = useState("")
  const navigate = useNavigate()
  const HandlePrevious = () => {
    navigate("/Class")
  }
  const { classId } = useParams()
  const fetchAllSummariesByClassId = async () => {
    console.log("ChayvaoFetch")
    console.log("CLASSID", classId)
    let res = await classApi.getAllSummariesByClassId(classId)
    if (res.EC == 1) {
      toast.error(res.EM)
    } else if (res.EC == 0) {
      toast.success("Lấy danh sách thành công!!!")
    }
    console.log("CLASSNAME", res.DT[0].class.classname)
    setData(res.DT)
    setClassName(res.DT[0].class.classname)
  }
  useEffect(() => {
    fetchAllSummariesByClassId()
  }, [])
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
      }),
      columnHelper.accessor((row) => `${row.class.classname}`, {
        id: "classname",
        header: "Lop",
      }),
      columnHelper.accessor((row) => `${row.behaviorpoint}`, {
        id: "behaviorpoint",
        header: "behaviorpoint",
      }),
      columnHelper.accessor((row) => `${row.discipline}`, {
        id: "discipline",
        header: "discipline",
      }),
      columnHelper.accessor((row) => `${row.title}`, {
        id: "title",
        header: "title",
      }),
      columnHelper.accessor((row) => `${row.gpa}`, {
        id: "GPA",
        header: "GPA",
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
    <div className="mx-14 mb-0 flex h-screen flex-col overflow-hidden p-0">
      <div className="mt-10 flex items-center">
        <button
          onClick={HandlePrevious}
          className="flex h-9 w-9 content-center items-center justify-center rounded-full bg-gradeTitle"
        >
          <GrLinkPrevious className="text-2xl text-white" />
        </button>
        <p className="ml-6 font-Manrope text-2xl font-bold text-gradeTitle">Điểm số</p>
      </div>
      <div className="mt-10 flex items-center">
        <p className="ml-6 font-Manrope text-2xl font-semibold ">Lớp: {classname}</p>
        <p className="ml-6 font-Manrope text-2xl font-semibold ">Học bạ</p>
      </div>
      <div className="mt-10 h-96 overflow-auto">
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
