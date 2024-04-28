import { Dialog, Transition } from "@headlessui/react"
import { Fragment, useEffect, useState } from "react"
import StudentTable from "../StudentTable"
import PropTypes from "prop-types"
import { classApi } from "../../../apis"
export default function DialogView({ isOpen, closeModal, nameclass, classId }) {
  console.log("classId: ", classId)
  console.log("nameclass: ", nameclass)
  let [data, setData] = useState("")
  const fetchAllStudentByClassId = async () => {
    let getData = await classApi.getAllStudentByClassId(classId)
    setData(getData.DT)
  }
  useEffect(() => {
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
                    <button className="h-fit w-fit mr-7 rounded-full bg-gradeTitle px-2 font-bold text-white">
                      Bảng điểm
                    </button>
                    <button className="h-fit w-fit rounded-full bg-backgroundplus px-2 font-bold text-white">
                      Thêm học sinh
                    </button>
                  </div>
                </div>
                <div className="w-full h-full overflow-y-auto">
                  <StudentTable data={data}></StudentTable>
                </div>
                <div className="mt-4">
                  <button
                    type="button"
                    className="border-transparent bg-blue-100 text-blue-900 hover:bg-blue-200 focus-visible:ring-blue-500 inline-flex justify-center rounded-md border px-4 py-2 text-sm font-medium focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
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
