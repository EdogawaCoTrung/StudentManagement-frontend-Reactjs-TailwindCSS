import { useEffect, useState } from "react"
import { assignmentApi, gradeApi, teacherApi } from "../../../apis"
import { Button } from "@mui/material"
import AddCircleRoundedIcon from "@mui/icons-material/AddCircleRounded"
import TeacherTable from "../../../components/share/TeacherTable"
export default function Teacher() {
  let [data, setData] = useState("")
  let [checkReLoading, setCheckReLoading] = useState(false)
  const fetchAllTeacher = async () => {
    let res = await teacherApi.getAllTeacher()
    if (res.EC != 1) {
      setData(res.DT)
    }
  }
  useEffect(() => {
    fetchAllTeacher()
  }, [checkReLoading])
  return (
    <div className="mx-14 mb-0 flex h-screen flex-col overflow-hidden p-0">
      <div className="mt-10 flex items-center justify-between">
        <p className="animate-fade-up font-Manrope text-2xl font-bold">Teacher</p>
        <Button
          //   onClick={openAddTuitionModal}
          variant="contained"
          color="success"
          startIcon={<AddCircleRoundedIcon></AddCircleRoundedIcon>}
        >
          Add
        </Button>
      </div>
      <div className="mt-10 h-screen">
        <TeacherTable data={data}></TeacherTable>
      </div>
    </div>
  )
}
