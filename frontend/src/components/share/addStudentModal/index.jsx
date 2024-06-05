import { Dialog, Transition } from "@headlessui/react"
import { Fragment, useEffect, useState } from "react"
import PropTypes from "prop-types"
import { studentApi } from "../../../apis"
import { toast } from "react-toastify"
import AddStudentTable from "../AddStudentTable"
import { summaryApi } from "../../../apis"
// import { Input } from "@mui/material"
export default function AddStudentModal({ isOpenAddStudent, closeAddStudentModal, classId }) {
  console.log(classId)
  console.log("OPEN!!!")
  const [data, setData] = useState("")
  const [checkValue, setCheckValue] = useState([])
  function HandleSetCheckValue(event) {
    const { value, checked } = event.target
    console.log("CHECKVALUE", value)
    if (checked) {
      setCheckValue((pre) => [...pre, value])
    } else {
      setCheckValue((pre) => {
        return [...pre.filter((id) => id !== value)]
      })
    }
  }
  let HandleCreateList = async () => {
    let listStudent = {
      data: checkValue,
    }
    console.log("DSHOCSINH", listStudent)
    let res = await summaryApi.createSummaries(classId, listStudent)
    if (res.EC == 1) {
      toast.error(res.EM)
    } else if (res.EC != 1) {
      toast.success("Thêm thành công!")
    }
    setCheckValue([])
    closeAddStudentModal()
  }
  console.log("CHECKVALUEMANG", checkValue)
  let fetchAllStudentNotInClass = async () => {
    let res = await studentApi.getAllStudentNotInClass(classId)
    setData(res.DT)
  }
  useEffect(() => {
    fetchAllStudentNotInClass()
  }, [checkValue])
  return (
    <Transition appear show={isOpenAddStudent} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={closeAddStudentModal}>
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
                  <div className="flex flex-row">
                    {/* <Input
                      placeholder="Search..."
                      value={searchInput}
                      onChange={(e) => onFilterChange("student.studentname", e.target.value)}
                    /> */}
                  </div>
                </div>
                <div className="h-full w-full overflow-y-auto">
                  <AddStudentTable HandleSetCheckValue={HandleSetCheckValue} data={data}></AddStudentTable>
                </div>
                <div className="mt-4">
                  <button
                    type="button"
                    className="mr-4 inline-flex justify-center rounded-md border border-transparent bg-green-200 px-4 py-2 text-sm font-medium text-black hover:bg-green-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2"
                    onClick={HandleCreateList}
                  >
                    Thêm
                  </button>
                  <button
                    type="button"
                    className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                    onClick={closeAddStudentModal}
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
AddStudentModal.propTypes = {
  isOpenAddStudent: PropTypes.any,
  closeAddStudentModal: PropTypes.any,
  classId: PropTypes.any,
}
