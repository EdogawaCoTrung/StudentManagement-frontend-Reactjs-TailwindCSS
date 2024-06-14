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
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs"
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider"
import { DatePicker } from "@mui/x-date-pickers/DatePicker"
import React, { useMemo, useState } from "react"
import PropTypes from "prop-types"
import DateCell from "../StudentTuitionTable/BillingDate"
import dayjs from "dayjs"
import { tuitionApi } from "../../../apis"
import Scanner from "./Scanner"
const OneStudentTuitionTable = ({ data, checkReLoading, setCheckReLoading }) => {
  const [valueMonth, setValueMonth] = useState(dayjs())
  const [columnFilters, setColumnFilters] = useState([])
  function convertMonth(dateString) {
    const date = new Date(dateString)
    const month = String(date.getMonth() + 1).padStart(2, "0")
    return month
  }
  const handlePayTuition = async (id) => {
    let res = await tuitionApi.updateTuiTionFee(id)
    if (res.EC != 1) {
      console.log("RELOADING", checkReLoading)
      setCheckReLoading(!checkReLoading)
    }
  }
  console.log("COLUMNFILTER", columnFilters)
  const columnHelper = createColumnHelper()
  const columnDef1 = useMemo(
    () => [
      // columnHelper.accessor("id", {
      //   id: "S.No",
      //   cell: (info) => <Checkbox value={info.getValue()}></Checkbox>,
      //   header: <Checkbox></Checkbox>,
      // }),
      //<span>{info.cell.getValue().studentname}</span>
      columnHelper.accessor((row) => `${row.id}`, {
        id: "id",
        header: "ID",
        enableColumnFilter: true,
      }),
      columnHelper.accessor((row) => `${row.month}`, {
        id: "month",
        header: "Tháng",
        enableColumnFilter: true,
        filterFn: (row, columnId, filterDate) => {
          const date = row.getValue(columnId)
          const month = convertMonth(filterDate)
          console.log("filterDateType", typeof month)
          console.log("filterDate", month)
          console.log("ROWDATE", typeof date)
          console.log("filterGradesInClude", date == month)
          return date == month
        },
      }),
      columnHelper.accessor((row) => `${row.year}`, {
        id: "year",
        header: "Năm",
        enableColumnFilter: true,
        filterFn: (row, columnId, filterDate) => {
          const date = row.getValue(columnId)
          console.log("filterDateType", typeof filterDate)
          console.log("filterDate", filterDate)
          console.log("ROWDATE", date)
          // console.log("filterGradesInClude", filterGrades.includes(gradeNumber))
          return true
        },
      }),
      columnHelper.accessor((row) => `${row.closingdate}`, {
        id: "BillingDate",
        header: "Hạn nộp",
        cell: DateCell,
      }),
      columnHelper.accessor((row) => `${row.status}`, {
        id: "status",
        header: "Trạng thái",
        cell: (info) => (
          <div className="flex w-fit flex-col">
            {info.row.original.status == 1 ? (
              <div className="gap-2 rounded-lg bg-paidBg px-2 py-1 font-Manrope font-semibold text-paidFontColor">
                Paid
              </div>
            ) : (
              <div className="gap-2 rounded-lg bg-unpaidBg px-2 py-1 font-Manrope font-semibold text-unpaidFontColor">
                UnPaid
              </div>
            )}
          </div>
        ),
      }),
      columnHelper.accessor((row) => `${row.price}`, {
        id: "total",
        header: "Tổng tiền",
      }),
      columnHelper.accessor((row) => `${row.id}`, {
        id: "QR",
        header: "QR-Code",
        cell: Scanner,
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
    <div className="relative z-10 mt-12 flex flex-col">
      <div className="flex justify-between bg-bgSearch mt-5 mb-5">
        <div className="animate-fade-left">
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              name="month"
              value={valueMonth}
              onChange={(newValue) => {
                setValueMonth(newValue)
                console.log("NEWVALUE", newValue)
                setColumnFilters((prev) => {
                  const dateSelect = prev.find((filter) => filter.id === "month")?.value
                  console.log("DATESELECT", dateSelect)
                  if (!dateSelect) {
                    console.log("VAOIF")
                    return prev.concat({
                      id: "month",
                      value: newValue.format(),
                    })
                  }
                  return prev.map((f) =>
                    f.id === "month"
                      ? {
                          ...f,
                          value: newValue.format(),
                        }
                      : f,
                  )
                })
              }}
              sx={{ background: "white" }}
              label={'Month'}
              views={["month"]}
            />
          </LocalizationProvider>
        </div>
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
                        {column.id != "studentId" && column.column.getCanSort() && (
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
OneStudentTuitionTable.propTypes = {
  data: PropTypes.any,
  checkReLoading: PropTypes.any,
  setCheckReLoading: PropTypes.any,
  // columnFilters: PropTypes.any,
}
export default OneStudentTuitionTable
