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
    header: "Id",
  },
  {
    accessorKey: "studentname",
    header: "Ho va ten",
  },
  {
    accessorKey: "gender",
    header: "Gioi tinh",
  },
]
