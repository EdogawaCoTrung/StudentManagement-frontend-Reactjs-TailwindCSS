import {
  flexRender,
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
} from "@tanstack/react-table"
import { createColumnHelper } from "@tanstack/react-table"
import SwapVertIcon from "@mui/icons-material/SwapVert"
import { Button, IconButton } from "@mui/material"
import React, { useMemo, useState } from "react"
import PropTypes from "prop-types"
import Paper from "@mui/material/Paper"
import InputBase from "@mui/material/InputBase"
import SearchIcon from "@mui/icons-material/Search"
import AddAssignmentModal from "../AddAssignmentModal"
const AssignmentTable = ({ data }) => {
  const [columnFilters, setColumnFilters] = useState([])
  const [checkReLoading, setCheckReLoading] = useState(false)
  let [checkId, setCheckId] = useState()
  let [isOpenAddTuitionModal, setIsOpenAddTuitionModal] = useState(false)
  function closeAddTuitionModal() {
    setIsOpenAddTuitionModal(false)
  }
  function openAddTuitionModal(id) {
    console.log("MO", id)
    setCheckId(id)
    setIsOpenAddTuitionModal(true)
  }
  console.log("isOpenAddTuitionModal", isOpenAddTuitionModal)
  const searchInput = columnFilters.find((f) => f.id === "classname")?.value || ""
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
      columnHelper.accessor((row) => `${row.class?.classname}`, {
        id: "classname",
        header: "Lớp",
      }),
      //<span>{info.cell.getValue().studentname}</span>
      columnHelper.accessor((row) => `${row.subject.subjectname}`, {
        id: "subjectname",
        header: "Môn học",
      }),
      columnHelper.accessor((row) => `${row.teacher}`, {
        id: "teacherName",
        header: "Giáo viên",
        cell: (info) => (
          <div>
            {info.getValue() == "null" ? <span>Null</span> : <span>{info.cell.row.original.teacher.teacherName}</span>}
          </div>
        ),
      }),
      columnHelper.accessor((row) => `${row}`, {
        id: "action",
        header: "Thao tác",
        cell: (info) => (
          <div key={info.cell.row.original.id} className="flex justify-between">
            <Button
              key={info.cell.row.original.id}
              onClick={() => openAddTuitionModal(info.cell.row.original.id)}
              variant="contained"
              color="success"
            >
              Add / Edit
            </Button>
            {checkId == info.cell.row.original.id && (
              <AddAssignmentModal
                key={info.cell.row.original.id}
                teacher={info.cell.row.original.teacher}
                teacherId={info.cell.row.original.teacherId}
                isOpenAddTuitionModal={isOpenAddTuitionModal}
                closeAddTuitionModal={closeAddTuitionModal}
                checkReLoading={checkReLoading}
                setCheckReLoading={setCheckReLoading}
                subjectId={info.cell.row.original.subjectId}
                classId={info.cell.row.original.classId}
                subjectName={info.cell.row.original.subject.subjectname}
                className={info.cell.row.original.class.classname}
              ></AddAssignmentModal>
            )}
          </div>
        ),
      }),
    ],
    [isOpenAddTuitionModal],
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
    <div className=" flex h-fit flex-col">
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
            onChange={(e) => onFilterChange("classname", e.target.value)}
            placeholder="Search..."
          />
        </Paper>
      </div>
      <div className="">
        <table className=" w-full border-collapse overflow-auto font-Manrope">
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
      </div>
    </div>
  )
}
AssignmentTable.propTypes = {
  data: PropTypes.any,
  // columnFilters: PropTypes.any,
}
export default AssignmentTable
