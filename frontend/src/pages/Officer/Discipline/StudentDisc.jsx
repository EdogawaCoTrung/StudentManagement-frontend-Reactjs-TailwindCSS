import { useEffect, useState } from "react"
import { summaryApi, teacherApi } from "../../../apis"
import { Button } from "@mui/material"
import AddCircleRoundedIcon from "@mui/icons-material/AddCircleRounded"
import TeacherTable from "../../../components/share/TeacherTable"
import OnlyAddTeacherModal from "../../../components/share/OnlyAddTeacherModal"
import { useParams } from "react-router"
import AddDisciplineModal from "../../../components/share/AddDisciplineModal"
import DisciplineTable from "../../../components/share/DisciplineTable"
export default function StudentDisc() {
  let [data, setData] = useState("")
  const { id } = useParams()
  let [checkReLoading, setCheckReLoading] = useState(false)
  let [isOpenDisciplineModal, setIsOpenDisciplineModal] = useState(false)
  const closeDisciplineModal = () => {
    setIsOpenDisciplineModal(false)
  }
  const openDisciplineModal = () => {
    console.log("VAOOPEN")
    setIsOpenDisciplineModal(true)
  }
  const fetchAllDiscipline = async () => {
    let res = await summaryApi.getDiscipineById(id)
    if (res.EC != 1) {
      setData(res.DT)
    }
  }
  useEffect(() => {
    fetchAllDiscipline()
  }, [checkReLoading])
  return (
    <div className="mx-14 mb-0 flex h-screen flex-col overflow-hidden p-0">
      <div className="mt-10 flex items-center justify-between">
        <p className="animate-fade-up font-Manrope text-2xl font-bold">Discipline</p>
        <div className="animate-fade-right">
          <Button
            onClick={openDisciplineModal}
            variant="contained"
            color="success"
            startIcon={<AddCircleRoundedIcon></AddCircleRoundedIcon>}
          >
            Add
          </Button>
          {isOpenDisciplineModal && (
            <AddDisciplineModal
              isOpenDisciplineModal={isOpenDisciplineModal}
              closeDisciplineModal={closeDisciplineModal}
              checkReLoading={checkReLoading}
              setCheckReLoading={setCheckReLoading}
              schoolreportId={id}
            ></AddDisciplineModal>
          )}
        </div>
      </div>
      <div className="mt-10 h-screen">
        <DisciplineTable
          checkReLoading={checkReLoading}
          setCheckReLoading={setCheckReLoading}
          data={data}
        ></DisciplineTable>
      </div>
    </div>
  )
}
