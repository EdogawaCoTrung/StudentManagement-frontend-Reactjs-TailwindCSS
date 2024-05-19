import CardClass from "../../../components/share/CardClass"
import { styled } from "@mui/material/styles"
import Box from "@mui/material/Box"
import Paper from "@mui/material/Paper"
import AddCircleRoundedIcon from "@mui/icons-material/AddCircleRounded"
import IconButton from "@mui/material/IconButton"
import Dropdown from "../../../components/share/Dropdown"
import { useEffect, useState } from "react"
import { classApi } from "../../../apis"
import { gradeApi } from "../../../apis"
import DialogView from "../../../components/share/Modal"
import AddClassModal from "../../../components/share/AddClassModal"
import { toast } from "react-toastify"
import { useAuth } from "../../../hooks"
// eslint-disable-next-line
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}))

export default function Class() {
  // eslint-disable-next-line
  const { isLoggedIn } = useAuth()
  let [checkId, setCheckId] = useState()
  let [checkGrade, setCheckGrade] = useState()
  let [checkReRender, setCheckReRender] = useState(false)
  let [isOpen, setIsOpen] = useState(false)
  let [isOpen2, setIsOpen2] = useState(false)
  let [isOpen3, setIsOpen3] = useState(false)
  let [isOpenAddClassModal, setOpenAddClassModal] = useState(false)
  function closeAddClassModal() {
    setOpenAddClassModal(false)
  }
  function openAddClassModal(gradename) {
    setOpenAddClassModal(true)
    setCheckGrade(gradename)
  }
  function closeModal() {
    setIsOpen(false)
  }

  function openModal() {
    setIsOpen(true)
  }
  function closeModal2() {
    setIsOpen2(false)
  }

  function openModal2() {
    setIsOpen2(true)
  }
  function closeModal3() {
    setIsOpen3(false)
  }

  function openModal3() {
    setIsOpen3(true)
  }

  function maxGradeYear(year) {
    let maxYear = year[0].year
    for (let i = 0; i < year.length; i++) {
      if (year[i].year > maxYear) maxYear = year[i].year
    }
    return maxYear
  }
  let [selectYear, setSelectYear] = useState("")
  let [dataClassGrade10, setDataClassGrade10] = useState("")
  let [dataClassGrade11, setDataClassGrade11] = useState("")
  let [dataClassGrade12, setDataClassGrade12] = useState("")
  const fetchAllClassByGrade10AndYear = async () => {
    console.log("NAMFETCHAPI", selectYear)
    let getData = await classApi.getAllClassByGradeAndYear(10, selectYear)
    setDataClassGrade10(getData.DT)
  }
  const fetchAllClassByGrade11AndYear = async () => {
    let getData = await classApi.getAllClassByGradeAndYear(11, selectYear)
    setDataClassGrade11(getData.DT)
  }
  const fetchAllClassByGrade12AndYear = async () => {
    let getData = await classApi.getAllClassByGradeAndYear(12, selectYear)
    setDataClassGrade12(getData.DT)
  }
  const fetchAllYear = async () => {
    let year = await gradeApi.getAllYear()
    if (year.DT) {
      let maxYear = maxGradeYear(year.DT)
      setSelectYear(maxYear)
    }
  }
  // eslint-disable-next-line
  useEffect(() => {
    fetchAllYear()
  }, [])
  // eslint-disable-next-line
  useEffect(() => {
    console.log("Chay useEffect")
    console.log("Doi selectyear: " + selectYear)
    try {
      if (selectYear != "") {
        fetchAllClassByGrade10AndYear()
        fetchAllClassByGrade11AndYear()
        fetchAllClassByGrade12AndYear()
        toast.success("Lấy danh sách lớp thành công!!!")
      }
    } catch (error) {
      toast.error(error)
    }
  }, [selectYear, checkReRender])
  console.log(dataClassGrade10)
  console.log(dataClassGrade11)
  console.log(dataClassGrade12)
  return (
    <Box className="z-0 mx-14 mt-10 flex flex-col justify-center" sx={{ flexGrow: 1 }}>
      <div className="flex flex-row items-center justify-between">
        <div className="flex flex-row items-center">
          <div className="flex items-center justify-center rounded-full px-8 py-1 text-center align-middle shadow-md">
            <p className="text-center text-2xl font-semibold text-gradeTitle">Khối 10</p>
          </div>
          <IconButton onClick={() => openAddClassModal(10)} size="large">
            <AddCircleRoundedIcon className="text-backgroundplus" fontSize="large" />
          </IconButton>
          {isOpenAddClassModal && checkGrade === 10 && (
            <AddClassModal
              isOpenAddClassModal={isOpenAddClassModal}
              closeAddClassModal={closeAddClassModal}
              year={selectYear}
              gradename={10}
              setCheckReRender={setCheckReRender}
              checkReRender={checkReRender}
            ></AddClassModal>
          )}
        </div>
        <Dropdown selectYear={selectYear} setSelectYear={setSelectYear}></Dropdown>
      </div>
      <div className="flex flex-row flex-wrap">
        {dataClassGrade10 &&
          dataClassGrade10.map(({ id, classname }) => (
            <div key={id}>
              <CardClass
                key={id}
                checkId={id}
                setCheckId={setCheckId}
                openModal={openModal}
                nameclass={classname}
              ></CardClass>
              {checkId === id && (
                <DialogView
                  key={id}
                  classId={id}
                  isOpen={isOpen}
                  closeModal={closeModal}
                  nameclass={classname}
                  openModal={openModal}
                ></DialogView>
              )}
            </div>
          ))}
      </div>
      <div className="flex flex-row items-center">
        <div className="flex items-center justify-center rounded-full px-8 py-1 text-center align-middle shadow-md">
          <p className="text-center text-2xl font-semibold text-gradeTitle">Khối 11</p>
        </div>
        <IconButton onClick={() => openAddClassModal(11)} size="large">
          <AddCircleRoundedIcon className="text-backgroundplus" fontSize="large" />
        </IconButton>
        {isOpenAddClassModal && checkGrade === 11 && (
          <AddClassModal
            isOpenAddClassModal={isOpenAddClassModal}
            closeAddClassModal={closeAddClassModal}
            year={selectYear}
            gradename={11}
            setCheckReRender={setCheckReRender}
            checkReRender={checkReRender}
          ></AddClassModal>
        )}
      </div>
      <div className="flex flex-row flex-wrap">
        {dataClassGrade11 &&
          dataClassGrade11.map(({ id, classname }) => (
            <div key={id}>
              <CardClass
                key={id}
                checkId={id}
                setCheckId={setCheckId}
                openModal={openModal2}
                nameclass={classname}
              ></CardClass>
              {checkId === id && (
                <DialogView
                  key={id}
                  classId={id}
                  isOpen={isOpen2}
                  closeModal={closeModal2}
                  nameclass={classname}
                  openModal={openModal2}
                ></DialogView>
              )}
            </div>
          ))}{" "}
      </div>
      <div className="flex flex-row items-center">
        <div className="flex items-center justify-center rounded-full px-8 py-1 text-center align-middle shadow-md">
          <p className="text-center text-2xl font-semibold text-gradeTitle">Khối 12</p>
        </div>
        <IconButton onClick={() => openAddClassModal(12)} size="large">
          <AddCircleRoundedIcon className="text-backgroundplus" fontSize="large" />
        </IconButton>
        {isOpenAddClassModal && checkGrade === 12 && (
          <AddClassModal
            isOpenAddClassModal={isOpenAddClassModal}
            closeAddClassModal={closeAddClassModal}
            year={selectYear}
            gradename={12}
            setCheckReRender={setCheckReRender}
            checkReRender={checkReRender}
          ></AddClassModal>
        )}
      </div>
      <div className="flex flex-row flex-wrap">
        {dataClassGrade12 &&
          dataClassGrade12.map(({ id, classname }) => (
            <div key={id}>
              <CardClass
                key={id}
                checkId={id}
                setCheckId={setCheckId}
                openModal={openModal3}
                nameclass={classname}
              ></CardClass>
              {checkId === id && (
                <DialogView
                  key={id}
                  classId={id}
                  isOpen={isOpen3}
                  closeModal={closeModal3}
                  nameclass={classname}
                  openModal={openModal3}
                ></DialogView>
              )}
            </div>
          ))}
      </div>
    </Box>
  )
}
