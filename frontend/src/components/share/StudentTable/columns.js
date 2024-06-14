import { createColumnHelper } from "@tanstack/react-table"
const columnHelper = createColumnHelper()
export const columnDef = [
  columnHelper.accessor("", {
    id: "S.No",
    cell: (info) => <span>{info.row.index + 1}</span>,
    header: "STT",
  }),
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "studentname",
    header: "Họ và tên",
  },
  {
    accessorKey: "gender",
    header: "Giới tính",
  },
]
