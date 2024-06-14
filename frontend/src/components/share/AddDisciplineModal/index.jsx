import { Dialog, Transition } from "@headlessui/react"
import { Fragment, useState } from "react"
import PropTypes from "prop-types"
import { TextField } from "@mui/material"
import { assignmentApi, summaryApi } from "../../../apis"
import { toast } from "react-toastify"
import TeacherComboBox from "../TeacherComboBox"
import dayjs from "dayjs"
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider"
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs"
import DisciplineCombobox from "../DisciplineCombobox"
import { DatePicker } from "@mui/x-date-pickers/DatePicker"
export default function AddDisciplineModal({
  isOpenDisciplineModal,
  closeDisciplineModal,
  checkReLoading,
  setCheckReLoading,
  schoolreportId,
}) {
  const [value, setValue] = useState(dayjs())
  const [assignmentInfo, setAssignmentInfo] = useState({
    schoolreportId: schoolreportId,
    reason: "",
    violateruledate: value,
    typeinfringeId: "",
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
        schoolreportId: assignmentInfo.schoolreportId,
        reason: assignmentInfo.reason,
        violateruledate: assignmentInfo.violateruledate,
        typeinfringeId: assignmentInfo.typeinfringeId,
      }
      res = await summaryApi.createDisciplines(data)
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
    <Transition appear show={isOpenDisciplineModal} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={closeDisciplineModal}>
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
                  Trừ hạnh kiểm
                </Dialog.Title>
                <div className="mt-8 flex flex-row">
                  <TextField
                    sx={{ marginRight: "12px" }}
                    disabled
                    id="schoolreportId"
                    name="schoolreportId"
                    label="schoolreportId"
                    variant="outlined"
                    value={assignmentInfo.schoolreportId}
                  ></TextField>
                  <TextField
                    sx={{ width: "259px" }}
                    id="reason"
                    name="reason"
                    label="reason"
                    variant="outlined"
                    value={assignmentInfo.reason}
                    onChange={(event) => handleChange("reason", event.target.value)}
                  ></TextField>
                </div>
                <div className="mt-8 flex w-full flex-row items-center justify-between gap-2 pr-10">
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      name="violateruledate"
                      label="violateruledate"
                      value={value}
                      onChange={(newValue) => {
                        setValue(newValue)
                        handleChange("violateruledate", newValue)
                      }}
                    ></DatePicker>
                  </LocalizationProvider>
                  <DisciplineCombobox handleChange={handleChange}></DisciplineCombobox>
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
                    onClick={closeDisciplineModal}
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
AddDisciplineModal.propTypes = {
  isOpenDisciplineModal: PropTypes.any,
  closeDisciplineModal: PropTypes.any,
  checkReLoading: PropTypes.any,
  setCheckReLoading: PropTypes.any,
  schoolreportId: PropTypes.any,
}
