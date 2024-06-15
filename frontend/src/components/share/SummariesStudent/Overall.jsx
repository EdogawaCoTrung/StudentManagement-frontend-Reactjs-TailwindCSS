import {
  flexRender,
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
} from "@tanstack/react-table"
import { createColumnHelper } from "@tanstack/react-table"
import PropTypes from "prop-types"
import React, { useMemo } from "react"
export default function Overall({ listSubjectResult }) {
  console.log("listSubjectResult", listSubjectResult)
  const columnHelper = createColumnHelper()
  const columnDef = useMemo(
    () => [
      columnHelper.accessor("id", {
        id: "S.No",
        cell: (info) => <span>{info.row.index + 1}</span>,
        header: "STT",
      }),
      //<span>{info.cell.getValue().studentname}</span>
      columnHelper.accessor((row) => `${row.subjectname}`, {
        id: "subjectname",
        header: "Môn học",
      }),
      {
        header: "Điểm trung bình các môn",
        columns: [
          columnHelper.accessor((row) => `${row.term1AverageScore}`, {
            id: "term1AverageScore",
            header: "HKI",
          }),
          columnHelper.accessor((row) => `${row.term2AverageScore}`, {
            id: "fifteenMinExam_2",
            header: "HKII",
          }),
          columnHelper.accessor((row) => `${row.annualAverageScore}`, {
            id: "annualAverageScore",
            header: "CN",
          }),
        ],
      },
    ],
    [],
  )
  const finalData = React.useMemo(() => listSubjectResult, [listSubjectResult])
  const tableInstance = useReactTable({
    columns: columnDef,
    data: finalData,
    getSortedRowModel: getSortedRowModel(),
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    columnResizeMode: "onChange",
  })
  return (
    <div className="relative mb-10 mt-10 flex flex-col overflow-hidden bg-white p-0">
      <div className="mt-10 flex items-center">
        <p className="animate-fade-up font-Manrope text-2xl font-semibold animate-delay-[500ms] ">Học bạ cả năm</p>
      </div>
      <div className="mt-3 overflow-auto">
        <table className="z-0 w-full border-collapse font-Manrope">
          <thead className="w-full">
            {tableInstance.getHeaderGroups().map((header) => {
              return (
                <tr className=" z-10 h-fit" key={header.id}>
                  {header.headers.map((column) => {
                    return (
                      <th
                        className="text-1xl sticky border-2 pb-2 text-center font-semibold tracking-wide"
                        key={column.id}
                        colSpan={column.colSpan}
                      >
                        {column.isPlaceholder ? null : flexRender(column.column.columnDef.header, column.getContext())}
                      </th>
                    )
                  })}
                </tr>
              )
            })}
          </thead>
          <tbody className="animate-fade-down">
            {tableInstance.getRowModel().rows.map((row) => {
              console.log("COLUMN", row)
              return (
                <tr key={row.id}>
                  {row.getVisibleCells().map((cell) => {
                    console.log("COLUMN1", cell.column.columnDef.cell)
                    return (
                      <td className="border-2 text-center font-normal" key={cell.id}>
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
Overall.propTypes = {
  listSubjectResult: PropTypes.any,
}
