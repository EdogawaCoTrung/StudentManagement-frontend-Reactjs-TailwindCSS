import { useEffect, useState } from "react"
import { teacherApi } from "../../../apis"
import { Button } from "@mui/material"
import AddCircleRoundedIcon from "@mui/icons-material/AddCircleRounded"
import TeacherTable from "../../../components/share/TeacherTable"
import OnlyAddTeacherModal from "../../../components/share/OnlyAddTeacherModal"
export default function Teacher() {
  let [data, setData] = useState("")
  let [checkReLoading, setCheckReLoading] = useState(false)
  let [isOpenOnlyAddTeacherModal, setIsOpenOnlyAddTeacherModal] = useState(false)
  const closeOnlyAddTeachertModal = () => {
    setIsOpenOnlyAddTeacherModal(false)
  }
  const openOnlyAddTeachertModal = () => {
    console.log("VAOOPEN")
    setIsOpenOnlyAddTeacherModal(true)
  }
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
          onClick={openOnlyAddTeachertModal}
          variant="contained"
          color="success"
          startIcon={<AddCircleRoundedIcon></AddCircleRoundedIcon>}
        >
          Add
        </Button>
        <OnlyAddTeacherModal
          isOpenOnlyAddTeacherModal={isOpenOnlyAddTeacherModal}
          closeOnlyAddTeachertModal={closeOnlyAddTeachertModal}
          setCheckReLoading={setCheckReLoading}
        ></OnlyAddTeacherModal>
      </div>
      <div className="mt-10 h-screen">
        <TeacherTable data={data}></TeacherTable>
      </div>
    </div>
  )
}
