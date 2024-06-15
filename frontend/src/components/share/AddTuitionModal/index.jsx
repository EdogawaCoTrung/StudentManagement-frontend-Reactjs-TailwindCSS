import { Dialog, Transition } from "@headlessui/react"
import { Fragment, useEffect, useState } from "react"
import PropTypes from "prop-types"
import { TextField } from "@mui/material"
import { gradeApi } from "../../../apis"
import { toast } from "react-toastify"
import { DatePicker } from "@mui/x-date-pickers/DatePicker"
import dayjs from "dayjs"
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider"
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs"
import { tuitionApi } from "../../../apis"
import ClassComboBox from "../ClassComboBox"
export default function AddTuitionModal({
  isOpenAddTuitionModal,
  closeAddTuitionModal,
  checkReLoading,
  setCheckReLoading,
}) {
  const [value, setValue] = useState(dayjs("2024-05-17"))
  let [selectYear, setSelectYear] = useState("")
  const [tuitionInfo, setTuitionInfo] = useState({
    classId: 1,
    price: "",
    month: "",
    year: selectYear,
    closingdate: value,
  })
  console.log("TUITIONINFO", tuitionInfo)
  function maxGradeYear(year) {
    let maxYear = year[0].year
    for (let i = 0; i < year.length; i++) {
      if (year[i].year > maxYear) maxYear = year[i].year
    }
    return maxYear
  }
  let fetchAllYear = async () => {
    let year = await gradeApi.getAllYear()
    if (year.DT) {
      let maxYear = maxGradeYear(year.DT)
      setSelectYear(maxYear)
    }
  }
  // eslint-disable-next-line
  useEffect(() => {
    console.log("USEEFFEC")
    fetchAllYear()
  }, [])
  const handleChange = (name, value) => {
    setTuitionInfo((prevTuitionInfo) => ({
      ...prevTuitionInfo,
      [name]: value,
    }))
  }
  function convertDate(dateString) {
    const date = new Date(dateString)
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, "0")
    const day = String(date.getDate()).padStart(2, "0")
    const formattedDate = `${day}/${month}/${year}`
    return formattedDate
  }
  console.log("DATA", typeof tuitionInfo.closingdate.format())
  const handleSubmit = async (e) => {
    let res
    let resDate = convertDate(tuitionInfo.closingdate.format())
    console.log("resDate", resDate)
    try {
      e.preventDefault() // Xóa sau
      const data = {
        classId: tuitionInfo.classId,
        price: tuitionInfo.price,
        month: tuitionInfo.month,
        year: selectYear,
        closingdate: tuitionInfo.closingdate.format(),
      }
      res = await tuitionApi.createTuition(data)
      if (res.EC != 1) {
        toast.success("Tạo học phí thành công!!!")
        setCheckReLoading(!checkReLoading)
      } else if (res.EC == 1) {
        toast.error(res.EM)
      }
      setTuitionInfo({
        classId: tuitionInfo.classId,
        price: "",
        month: "",
        year: selectYear,
        closingdate: value,
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
                  Thu học phí
                </Dialog.Title>
                <div className="mt-8 flex flex-row">
                  <TextField
                    sx={{ marginRight: "12px" }}
                    required
                    id="month"
                    name="month"
                    label="Tháng"
                    variant="outlined"
                    value={tuitionInfo.month}
                    onChange={(event) => handleChange("month", event.target.value)}
                  ></TextField>
                  <TextField
                    sx={{ width: "259px" }}
                    disabled
                    required
                    id="year"
                    name="year"
                    label="Năm"
                    variant="outlined"
                    value={selectYear}
                  ></TextField>
                </div>
                <div className="mt-8 flex flex-row">
                  <ClassComboBox handleChange={handleChange}></ClassComboBox>
                  {/* <TextField
                    sx={{ marginRight: "12px" }}
                    required
                    id="classname"
                    name="classname"
                    label="lớp"
                    variant="outlined"
                    value={tuitionInfo.classname}
                    onChange={(event) => handleChange("classname", event.target.value)}
                  ></TextField> */}
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      name="closingdate"
                      label="Controlled picker"
                      value={value}
                      onChange={(newValue) => {
                        setValue(newValue)
                        handleChange("closingdate", newValue)
                      }}
                    ></DatePicker>
                  </LocalizationProvider>
                </div>
                <div className="mt-4 flex w-full flex-row items-center">
                  <label className="mr-3 w-fit" htmlFor="price">
                    Tổng:
                  </label>
                  <input
                    type="text"
                    id="price"
                    name="price"
                    className={`bg-Background2 block w-full rounded-lg border border-gray-300 p-2.5 text-base text-gray-900 placeholder-gray-500 focus:outline-gray-500`}
                    value={tuitionInfo.price}
                    onChange={(event) => handleChange("price", event.target.value)}
                    required
                  />
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
AddTuitionModal.propTypes = {
  isOpenAddTuitionModal: PropTypes.any,
  closeAddTuitionModal: PropTypes.any,
  checkReLoading: PropTypes.any,
  setCheckReLoading: PropTypes.any,
}
