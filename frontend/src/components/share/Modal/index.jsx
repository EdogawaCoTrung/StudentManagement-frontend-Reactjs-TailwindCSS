import { Dialog, Transition } from "@headlessui/react"
import { Fragment, useEffect, useState } from "react"
import StudentTable from "../StudentTable"
import PropTypes from "prop-types"
import { classApi } from "../../../apis"
import { useNavigate } from "react-router"
import AddStudentModal from "../addStudentModal"
import { GrScorecard } from "react-icons/gr"
import { RiUserAddLine } from "react-icons/ri"

// import { Input } from "@mui/material"
export default function DialogView({ isOpen, closeModal, nameclass, classId, openModal, role }) {
  let [isOpenAddStudent, setIsOpenAddStudent] = useState(false)
  const [checkReloading, setCheckReloading] = useState(false)
  function closeAddStudentModal() {
    setIsOpenAddStudent(false)
    openModal()
  }
  function openAddStudentModal() {
    setIsOpenAddStudent(true)
  }
  const navigate = useNavigate()
  console.log("classId: ", classId)
  console.log("nameclass: ", nameclass)
  // const [columnFilters, setColumnFilters] = useState([])
  // const searchInput = columnFilters.find((f) => f.id === "student.studentname")?.value || ""
  // const onFilterChange = (id, value) =>
  //   setColumnFilters((prev) =>
  //     prev
  //       .filter((f) => f.id !== id)
  //       .concat({
  //         id,
  //         value,
  //       }),
  //   )
  let [data, setData] = useState("")
  const fetchAllStudentByClassId = async () => {
    let getData = await classApi.getAllStudentByClassId(classId)
    setData(getData.DT)
    console.log("HOCAINH", getData.DT)
  }
  useEffect(() => {
    console.log("CHAY VAO USEEFFECT")
    fetchAllStudentByClassId()
  }, [isOpenAddStudent, checkReloading])
  const HandleSummariesClick = () => {
    navigate(`/List-summaries/${classId}`)
  }
  const HandleAddStudent = () => {
    openAddStudentModal()
  }
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={closeModal}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/25" />
        </Transition.Child>

        <div className="fixed inset-0 flex items-center justify-center align-middle ">
          <div className="">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="flex h-modal w-modal transform flex-col rounded-2xl bg-white p-6 text-left font-Manrope shadow-xl transition-all">
                <div className="mb-4 flex flex-row justify-between bg-white">
                  <div className="flex">
                    <p className="mr-3 font-Manrope text-2xl font-normal">Lớp: {nameclass}</p>
                    <p className="font-Manrope text-2xl font-normal">ClassId: {classId}</p>
                  </div>
                  <div className="flex flex-row">
                    {/* <Input
                      placeholder="Search..."
                      value={searchInput}
                      onChange={(e) => onFilterChange("student.studentname", e.target.value)}
                    /> */}
                    {role == "admin" && (
                      <button
                        onClick={HandleSummariesClick}
                        className="mr-7 flex h-fit w-fit items-center rounded-md bg-gradeTitle px-6 py-[6px] font-bold text-white"
                      >
                        <GrScorecard className="mr-2" />
                        Bảng điểm
                      </button>
                    )}
                    {role == "admin" && (
                      <button
                        onClick={HandleAddStudent}
                        className="flex h-fit w-fit items-center rounded-md bg-greenBtn px-2 py-[6px] font-bold text-white"
                      >
                        <RiUserAddLine className="mr-2" />
                        Thêm học sinh
                      </button>
                    )}
                    <AddStudentModal
                      isOpenAddStudent={isOpenAddStudent}
                      closeAddStudentModal={closeAddStudentModal}
                      classId={classId}
                    ></AddStudentModal>
                  </div>
                </div>
                <div className="h-full w-full overflow-y-auto">
                  <StudentTable
                    checkReloading={checkReloading}
                    setCheckReloading={setCheckReloading}
                    role={role}
                    data={data}
                  ></StudentTable>
                </div>
                <div className="mt-4">
                  <button
                    type="button"
                    className="inline-flex justify-center rounded-md border border-transparent bg-red-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-red-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2"
                    onClick={closeModal}
                  >
                    Đóng
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
}
DialogView.propTypes = {
  isOpen: PropTypes.any,
  closeModal: PropTypes.any,
  nameclass: PropTypes.any,
  classId: PropTypes.any,
  openModal: PropTypes.any,
  role: PropTypes.any,
}
