import { Dialog, Transition } from "@headlessui/react"
import { Fragment, useState } from "react"
import PropTypes from "prop-types"
import { TextField } from "@mui/material"
import { assignmentApi } from "../../../apis"
import { toast } from "react-toastify"
import TeacherComboBox from "../TeacherComboBox"
export default function AddAssignmentModal({
  isOpenAddTuitionModal,
  closeAddTuitionModal,
  checkReLoading,
  setCheckReLoading,
  subjectId,
  classId,
  subjectName,
  className,
  teacher,
  teacherId,
}) {
  console.log("VAOASSIGNMENTMODAL", isOpenAddTuitionModal)
  const [assignmentInfo, setAssignmentInfo] = useState({
    subjectId: subjectId,
    classId: classId,
    teacherId: teacherId || "",
  })
  // eslint-disable-next-line
  const handleChange = (name, value) => {
    setAssignmentInfo((prevTuitionInfo) => ({
      ...prevTuitionInfo,
      [name]: value,
    }))
  }
  const handleSubmit = async (e) => {
    let res
    try {
      e.preventDefault() // Xóa sau
      const data = {
        subjectId: assignmentInfo.subjectId,
        classId: assignmentInfo.classId,
        teacherId: assignmentInfo.teacherId,
      }
      res = await assignmentApi.createAssignment(data)
      if (res.EC != 1) {
        toast.success("Phân công thành công")
        setCheckReLoading(!checkReLoading)
      } else if (res.EC == 1) {
        toast.error(res.EM)
      }
    } catch (error) {
      console.log(error)
      toast.error(error)
    }
    closeAddTuitionModal()
  }
  return (
    <Transition appear show={isOpenAddTuitionModal} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={closeAddTuitionModal}>
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
              <Dialog.Panel className="flex h-fit w-fit transform flex-col rounded-2xl bg-white p-6 text-left font-Manrope shadow-xl transition-all">
                <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900">
                  Phân công giảng dạy
                </Dialog.Title>
                <div className="mt-8 flex flex-row">
                  <TextField
                    sx={{ marginRight: "12px" }}
                    disabled
                    id="className"
                    name="Lớp"
                    label="Lớp"
                    variant="outlined"
                    value={className}
                  ></TextField>
                  <TextField
                    sx={{ width: "259px" }}
                    disabled
                    id="subjectName"
                    name="Môn học"
                    label="Môn học"
                    variant="outlined"
                    value={subjectName}
                  ></TextField>
                </div>
                <div className="mt-8 flex flex-row">
                  <TeacherComboBox
                    handleChange={handleChange}
                    teacher={teacher}
                    teacherId={teacherId}
                    subjectId={subjectId}
                  ></TeacherComboBox>
                </div>
                <div className="mt-4 flex justify-end">
                  <button
                    type="button"
                    className="mr-10 inline-flex justify-center rounded-md border border-transparent bg-addBtn px-4 py-2 text-sm font-medium text-white hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                    onClick={handleSubmit}
                  >
                    Thêm
                  </button>
                  <button
                    type="button"
                    className="inline-flex justify-center rounded-md border border-transparent bg-cancelBtn px-4 py-2 text-sm font-medium text-white hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                    onClick={closeAddTuitionModal}
                  >
                    Hủy
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
AddAssignmentModal.propTypes = {
  isOpenAddTuitionModal: PropTypes.any,
  closeAddTuitionModal: PropTypes.any,
  checkReLoading: PropTypes.any,
  setCheckReLoading: PropTypes.any,
  subjectId: PropTypes.any,
  subjectName: PropTypes.any,
  classId: PropTypes.any,
  className: PropTypes.any,
  teacher: PropTypes.any,
  teacherId: PropTypes.any,
}
