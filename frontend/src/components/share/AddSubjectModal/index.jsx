import { Dialog, Transition } from "@headlessui/react"
import { Fragment, useState } from "react"
import PropTypes from "prop-types"
import { TextField } from "@mui/material"
import { toast } from "react-toastify"
import { subjectApi } from "../../../apis"
export default function AddSubjectModal({
  isOpenAddTuitionModal,
  closeAddTuitionModal,
  checkReLoading,
  setCheckReLoading,
}) {
  const [subjectInfo, setSubjectInfo] = useState({
    subjectName: "",
    fifteenMinFactor: undefined,
    fourtyFiveMinFactor: undefined,
    finalFactor: undefined,
    factor: undefined,
    minPassScore: undefined,
  })
  const handleChange = (name, value) => {
    setSubjectInfo((prevTuitionInfo) => ({
      ...prevTuitionInfo,
      [name]: value,
    }))
  }
  const handleSubmit = async (e) => {
    let res
    try {
      e.preventDefault() // Xóa sau
      const data = {
        subjectName: subjectInfo.subjectName,
        fifteenMinFactor: subjectInfo.fifteenMinFactor,
        fourtyFiveMinFactor: subjectInfo.fourtyFiveMinFactor,
        finalFactor: subjectInfo.finalFactor,
        factor: subjectInfo.factor,
        minPassScore: subjectInfo.minPassScore,
      }
      res = await subjectApi.createSubject(data)
      if (res.EC != 1) {
        toast.success("Tạo môn thành công!!!")
        setCheckReLoading(!checkReLoading)
      } else if (res.EC == 1) {
        toast.error(res.EM)
        setCheckReLoading(!checkReLoading)
      }
      setSubjectInfo({
        subjectName: "",
        fifteenMinFactor: undefined,
        fourtyFiveMinFactor: undefined,
        finalFactor: undefined,
        factor: undefined,
        minPassScore: undefined,
      })
    } catch (error) {
      console.log(error)
      toast.error(error)
    }
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
                  Create Subject
                </Dialog.Title>
                <div className="mt-8 flex flex-row">
                  <TextField
                    sx={{ marginRight: "12px" }}
                    required
                    id="subjectName"
                    name="subjectName"
                    label="Tên môn học"
                    variant="outlined"
                    value={subjectInfo.subjectName}
                    onChange={(event) => handleChange("subjectName", event.target.value)}
                  ></TextField>
                  <TextField
                    sx={{ width: "259px" }}
                    required
                    id="fifteenMinFactor"
                    name="fifteenMinFactor"
                    label="Hệ số 15p"
                    variant="outlined"
                    value={subjectInfo.fifteenMinFactor}
                    onChange={(event) => handleChange("fifteenMinFactor", event.target.value)}
                  ></TextField>
                </div>
                <div className="mt-8 flex flex-row">
                  <TextField
                    sx={{ marginRight: "12px" }}
                    required
                    id="fourtyFiveMinFactor"
                    name="fourtyFiveMinFactor"
                    label="Hệ số 1 tiết"
                    variant="outlined"
                    value={subjectInfo.fourtyFiveMinFactor}
                    onChange={(event) => handleChange("fourtyFiveMinFactor", event.target.value)}
                  ></TextField>
                  <TextField
                    sx={{ width: "259px" }}
                    required
                    id="finalFactor"
                    name="finalFactor"
                    label="Hệ số cuối kì"
                    variant="outlined"
                    value={subjectInfo.finalFactor}
                    onChange={(event) => handleChange("finalFactor", event.target.value)}
                  ></TextField>
                </div>
                <div className="mt-4 flex w-full flex-row items-center">
                  <TextField
                    sx={{ marginRight: "12px" }}
                    required
                    id="factor"
                    name="factor"
                    label="Hệ số môn"
                    variant="outlined"
                    value={subjectInfo.factor}
                    onChange={(event) => handleChange("factor", event.target.value)}
                  ></TextField>
                  <TextField
                    sx={{ width: "259px" }}
                    required
                    id="minPassScore"
                    name="minPassScore"
                    label="Điểm tối thiểu"
                    variant="outlined"
                    value={subjectInfo.minPassScore}
                    onChange={(event) => handleChange("minPassScore", event.target.value)}
                  ></TextField>
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
AddSubjectModal.propTypes = {
  isOpenAddTuitionModal: PropTypes.any,
  closeAddTuitionModal: PropTypes.any,
  checkReLoading: PropTypes.any,
  setCheckReLoading: PropTypes.any,
}
