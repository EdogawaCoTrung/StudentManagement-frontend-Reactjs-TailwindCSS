import { flexRender, useReactTable, getCoreRowModel } from "@tanstack/react-table"
import { createColumnHelper } from "@tanstack/react-table"
import { IconButton } from "@mui/material"
import EditIcon from "@mui/icons-material/Edit"
import DeleteIcon from "@mui/icons-material/Delete"
import FormatListBulletedRoundedIcon from "@mui/icons-material/FormatListBulletedRounded"
import InfoRoundedIcon from "@mui/icons-material/InfoRounded"
import React, { useMemo } from "react"
import PropTypes from "prop-types"
const StudentTable = ({ data }) => {
  const columnHelper = createColumnHelper()
  const columnDef = useMemo(
    () => [
      columnHelper.accessor("", {
        id: "S.No",
        cell: (info) => <span>{info.row.index + 1}</span>,
        header: "STT",
      }),
      {
        accessorKey: "id",
        header: "Id",
      },
      columnHelper.accessor("student", {
        id: "studentname",
        header: "Ho va Ten",
        cell: (info) => <span>{info.cell.getValue().studentname}</span>,
      }),
      columnHelper.accessor("student", {
        id: "gender",
        header: "Gioi tinh",
        cell: (info) => <div>{info.cell.getValue().gender === "1" ? <span>Nam</span> : <span>Nữ</span>}</div>,
      }),
      columnHelper.accessor("id", {
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
    getCoreRowModel: getCoreRowModel(),
  })
  return (
    <table className="w-full h-full border-collapse font-Poppins">
      <thead>
        {tableInstance.getHeaderGroups().map((header) => {
          return (
            <tr className="h-fit sticky z-10" key={header.id}>
              {header.headers.map((column) => {
                return (
                  <th
                    className="text-1xl sticky border-b-2 pb-2 text-left font-semibold tracking-wide"
                    key={column.id}
                    colSpan={column.colSpan}
                  >
                    {flexRender(column.column.columnDef.header, column.getContext())}
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
  )
}
StudentTable.propTypes = {
  data: PropTypes.any,
}
export default StudentTable
