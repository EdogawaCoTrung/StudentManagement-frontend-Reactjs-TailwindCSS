import { Dialog, Transition } from "@headlessui/react"
import { Fragment, useEffect, useState } from "react"
import PropTypes from "prop-types"
import { TextField } from "@mui/material"
import { gradeApi } from "../../../apis"
import { toast } from "react-toastify"
export default function AddYearModal({ isOpenAddYearModal, closeAddYearModal, setCheckReRender, checkReRender }) {
  const [yearInfo, setYearInfo] = useState({
    year: "",
  })
  // eslint-disable-next-line
  const handleChange = (e) => {
    const { name, value } = e.target
    setYearInfo((prevClassInfo) => ({
      ...prevClassInfo,
      [name]: value,
    }))
  }
  const handleSubmit = async (e) => {
    let res
    try {
      e.preventDefault() // Xóa sau
      const data = {
        year: yearInfo.year,
      }
      res = await gradeApi.createYear(data)
      if (res.EC != 1) {
        toast.success("Tạo năm thành công!!!")
        setCheckReRender(!checkReRender)
        closeAddYearModal()
      } else if (res.EC == 1) {
        toast.error(res.EM)
      }
    } catch (error) {
      console.log(error)
      toast.error(error)
    }
  }
  return (
    <Transition appear show={isOpenAddYearModal} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={closeAddYearModal}>
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
                  Create Year
                </Dialog.Title>
                <div className="mt-8 flex w-full flex-row items-center">
                  <TextField
                    sx={{ width: "100%" }}
                    required
                    id="year"
                    name="year"
                    label="Tên năm"
                    variant="outlined"
                    value={yearInfo.year}
                    onChange={handleChange}
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
                    onClick={closeAddYearModal}
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
AddYearModal.propTypes = {
  isOpenAddYearModal: PropTypes.any,
  closeAddYearModal: PropTypes.any,
  setCheckReRender: PropTypes.any,
  checkReRender: PropTypes.any,
}
