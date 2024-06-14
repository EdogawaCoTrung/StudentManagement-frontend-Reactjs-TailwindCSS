import CardClass from "../../../components/share/CardClass"
import { styled } from "@mui/material/styles"
import Box from "@mui/material/Box"
import Paper from "@mui/material/Paper"
import { useEffect, useState } from "react"
import { studentApi } from "../../../apis"
import DialogView from "../../../components/share/Modal"
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

export default function StudentClass() {
  // eslint-disable-next-line
  const { isLoggedIn } = useAuth()
  const role = "student"
  let [checkId, setCheckId] = useState()
  let [dataClassGrade10, setGrade10] = useState("")
  let [dataClassGrade11, setGrade11] = useState("")
  let [dataClassGrade12, setGrade12] = useState("")
  let [isOpen, setIsOpen] = useState(false)
  function closeModal() {
    setIsOpen(false)
  }

  function openModal() {
    setIsOpen(true)
  }
  const fetchAllClassByStudentId = async () => {
    let studentId = localStorage.getItem("studentId")
    let res = await studentApi.getAllClassByStudentId(studentId)
    if (res.EC != 1) {
      const class10 = res.DT.filter((item) => item.class.classname.startsWith("10"))
      const class11 = res.DT.filter((item) => item.class.classname.startsWith("11"))
      const class12 = res.DT.filter((item) => item.class.classname.startsWith("12"))
      console.log("CLASS10", class10.class)
      setGrade10(class10)
      setGrade11(class11)
      setGrade12(class12)
    }
  }
  // eslint-disable-next-line
  useEffect(() => {
    try {
      fetchAllClassByStudentId()
    } catch (error) {
      toast.error(error)
    }
  }, [])
  return (
    <Box className="z-0 mx-14 mt-10 flex flex-col justify-center" sx={{ flexGrow: 1 }}>
      <div className="flex flex-row items-center justify-between">
        <div className="flex flex-row items-center">
          <div className="flex animate-fade-right items-center justify-center rounded-full bg-gradeTitle2 px-7 py-2 text-center align-middle shadow-md animate-duration-[625ms]">
            <p className="text-center text-base font-semibold text-white">Khối 10</p>
          </div>
        </div>
      </div>
      <div className="flex flex-row flex-wrap">
        {dataClassGrade10 &&
          dataClassGrade10.map((item) => (
            <div key={item.classId}>
              <CardClass
                key={item.classId}
                checkId={item.classId}
                setCheckId={setCheckId}
                openModal={openModal}
                nameclass={item.class.classname}
                total={item.class.total}
              ></CardClass>{" "}
              {checkId === item.classId && (
                <DialogView
                  key={item.classId}
                  classId={item.classId}
                  isOpen={isOpen}
                  closeModal={closeModal}
                  nameclass={item.class.classname}
                  openModal={openModal}
                  role={role}
                ></DialogView>
              )}
            </div>
          ))}
      </div>
      <div className="flex flex-row items-center">
        <div className="flex animate-fade-right items-center justify-center rounded-full bg-gradeTitle2 px-7 py-2 text-center align-middle shadow-md animate-duration-[625ms]">
          <p className="text-center text-base font-semibold text-white">Khối 11</p>
        </div>
      </div>
      <div className="flex flex-row flex-wrap">
        {dataClassGrade11 &&
          dataClassGrade11.map((item) => (
            <div key={item.classId}>
              <CardClass
                key={item.classId}
                checkId={item.classId}
                setCheckId={setCheckId}
                openModal={openModal}
                nameclass={item.class.classname}
                total={item.class.total}
              ></CardClass>{" "}
              {checkId === item.classId && (
                <DialogView
                  key={item.classId}
                  classId={item.classId}
                  isOpen={isOpen}
                  closeModal={closeModal}
                  nameclass={item.class.classname}
                  openModal={openModal}
                  role={role}
                ></DialogView>
              )}
            </div>
          ))}
      </div>
      <div className="flex flex-row items-center">
        <div className="flex animate-fade-right items-center justify-center rounded-full bg-gradeTitle2 px-7 py-2 text-center align-middle shadow-md animate-duration-[625ms]">
          <p className="text-center text-base font-semibold text-white">Khối 12</p>
        </div>
      </div>
      <div className="flex flex-row flex-wrap">
        {dataClassGrade12 &&
          dataClassGrade12.map((item) => (
            <div key={item.classId}>
              <CardClass
                key={item.classId}
                checkId={item.classId}
                setCheckId={setCheckId}
                openModal={openModal}
                nameclass={item.class.classname}
                total={item.class.total}
              ></CardClass>
              {checkId === item.classId && (
                <DialogView
                  key={item.classId}
                  classId={item.classId}
                  isOpen={isOpen}
                  closeModal={closeModal}
                  nameclass={item.class.classname}
                  openModal={openModal}
                  role={role}
                ></DialogView>
              )}
            </div>
          ))}
      </div>
    </Box>
  )
}
