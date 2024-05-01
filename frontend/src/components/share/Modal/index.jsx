import { Dialog, Transition } from "@headlessui/react"
import { Fragment, useEffect, useState } from "react"
import StudentTable from "../StudentTable"
import PropTypes from "prop-types"
import { classApi } from "../../../apis"
// import { Input } from "@mui/material"
export default function DialogView({ isOpen, closeModal, nameclass, classId }) {
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
  }
  useEffect(() => {
    console.log("CHAY VAO USEEFFECT")
    fetchAllStudentByClassId()
  }, [])
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
              <Dialog.Panel className="flex h-modal w-modal transform flex-col rounded-2xl bg-white p-6 text-left font-Poppins shadow-xl transition-all">
                <div className="mb-4 flex flex-row justify-between bg-white">
                  <p className="font-Poppins text-2xl font-normal">Lớp {nameclass}</p>
                  <div className="flex flex-row">
                    {/* <Input
                      placeholder="Search..."
                      value={searchInput}
                      onChange={(e) => onFilterChange("student.studentname", e.target.value)}
                    /> */}
                    <button className="mr-7 h-fit w-fit rounded-full bg-gradeTitle px-2 font-bold text-white">
                      Bảng điểm
                    </button>
                    <button className="h-fit w-fit rounded-full bg-backgroundplus px-2 font-bold text-white">
                      Thêm học sinh
                    </button>
                  </div>
                </div>
                <div className="h-full w-full overflow-y-auto">
                  <StudentTable data={data}></StudentTable>
                </div>
                <div className="mt-4">
                  <button
                    type="button"
                    className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                    onClick={closeModal}
                  >
                    close
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
}
