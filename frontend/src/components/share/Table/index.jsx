import Box from "@mui/material/Box"
import { DataGrid } from "@mui/x-data-grid"
import { Button } from "@mui/material"
import EditIcon from "@mui/icons-material/Edit"
import DeleteIcon from "@mui/icons-material/Delete"
import VisibilityIcon from "@mui/icons-material/Visibility"

const columns = [
  {
    field: "firstName",
    headerName: "Tên",
    width: 150,
    editable: true,
  },
  {
    field: "lastName",
    headerName: "Họ",
    width: 150,
    editable: true,
  },
  {
    field: "fullName",
    headerName: "Họ và tên",
    description: "This column has a value getter and is not sortable.",
    sortable: false,
    width: 160,
    valueGetter: (value, row) => `${row.lastName || ""} ${row.firstName || ""}`,
  },
  {
    field: "class",
    headerName: "Lớp",
    width: 110,
    editable: false,
  },
  {
    field: "gender",
    headerName: "Giới tính",
    width: 110,
    editable: false,
  },
  {
    field: "actions",
    headerName: "Thao tác",
    width: 300,
    renderCell: (params) => (
      <strong>
        <Button
          variant="contained"
          color="grey"
          size="small"
          style={{ marginLeft: 10, boxShadow: "none", width: "30px" }} // Adjust the width here
          onClick={() => {
            console.log(`View clicked on row with id: ${params.id}`)
            // Add your view logic here
          }}
        >
          <VisibilityIcon />
        </Button>
        <Button
          variant="contained"
          color="grey"
          size="small"
          style={{ marginLeft: 10, boxShadow: "none", width: "30px" }} // Adjust the width here
          onClick={() => {
            console.log(`Edit clicked on row with id: ${params.id}`)
            // Add your edit logic here
          }}
        >
          <EditIcon />
        </Button>
        <Button
          variant="contained"
          color="grey"
          size="small"
          style={{ marginLeft: 10, boxShadow: "none", width: "30px" }} // Adjust the width here
          onClick={() => {
            console.log(`Delete clicked on row with id: ${params.id}`)
            // Add your delete logic here
          }}
        >
          <DeleteIcon />
        </Button>
      </strong>
    ),
  },
]

const rows = [
  { id: 1, lastName: "Nguyễn Văn", firstName: "Xuyên", gender: "nam", class: "10a1" },
  { id: 2, lastName: "Trần Thị", firstName: "Yến", gender: "nữ", class: "11a2" },
  { id: 3, lastName: "Lê Văn", firstName: "Chương", gender: "nữ", class: "10a2" },
  { id: 4, lastName: "Ngô", firstName: "Quyền", gender: "nam", class: "11a9" },
  { id: 5, lastName: "Nguyễn Văn", firstName: "C", gender: "nam", class: "10a5" },
  { id: 6, lastName: "Trần Thị", firstName: "Hồng", gender: "nữ", class: "12a1" },
  { id: 7, lastName: "Nguyễn Thị", firstName: "Trang", gender: "nữ", class: "10a2" },
  { id: 8, lastName: "Hoàng Văn", firstName: "Hà", gender: "nam", class: "12a2" },
]

export default function DataTable() {
  return (
    <Box sx={{ height: "100%", width: "100%" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 10,
            },
          },
        }}
        pageSizeOptions={[5, 10, 50]}
        checkboxSelection
        disableRowSelectionOnClick
      />
    </Box>
  )
}
