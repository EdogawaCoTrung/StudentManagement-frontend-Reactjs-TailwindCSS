import { Dialog, Transition } from "@headlessui/react"
import { Fragment, useEffect, useState } from "react"
import PropTypes from "prop-types"
import { TextField } from "@mui/material"
import { gradeApi } from "../../../apis"
import { classApi } from "../../../apis"
import { toast } from "react-toastify"
export default function AddClassModal({
  isOpenAddClassModal,
  closeAddClassModal,
  year,
  gradename,
  setCheckReRender,
  checkReRender,
}) {
  console.log("year: ", year)
  let [gradeId, setGradeId] = useState("")
  const [classInfo, setClassInfo] = useState({
    classname: "",
    total: "",
    gradeId: gradeId,
  })
  let fetchAllGradeByYear = async () => {
    try {
      console.log("Chay vao fetchALlGrade")
      let res = await gradeApi.getAllGradeByYearService(year)
      console.log("FETCH DATA: ", res)
      let findGradeId = res.DT.filter((grade) => {
        console.log("GRADENAMEDATA: ", grade.gradename, typeof grade.gradename)
        return grade.gradename == gradename
      })
      console.log("gradeId: ", findGradeId)
      console.log("GradeId: " + findGradeId[0].id)
      setGradeId(findGradeId[0].id)
    } catch (error) {
      console.log(error)
      toast.error("Không thể lấy id khối")
    }
  }
  // eslint-disable-next-line
  useEffect(() => {
    console.log("USEEFFEC")
    fetchAllGradeByYear()
  }, [year])
  const handleChange = (e) => {
    const { name, value } = e.target
    setClassInfo((prevClassInfo) => ({
      ...prevClassInfo,
      [name]: value,
    }))
  }
  const handleSubmit = async (e) => {
    let res
    try {
      e.preventDefault() // Xóa sau
      const data = {
        classname: classInfo.classname,
        total: classInfo.total,
        gradeId: gradeId,
      }
      res = await classApi.createClass(data)
      if (res.EC != 1) {
        toast.success("Tạo lớp thành công!!!")
        setCheckReRender(!checkReRender)
      } else if (res.EC == 1) {
        toast.error(res.EM)
      }
      setClassInfo({
        classname: "",
        total: "",
        gradeId: gradeId,
      })
    } catch (error) {
      console.log(error)
      toast.error(error)
    }
  }
  return (
    <Transition appear show={isOpenAddClassModal} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={closeAddClassModal}>
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
              <Dialog.Panel className="font-Manrope flex h-fit w-fit transform flex-col rounded-2xl bg-white p-6 text-left shadow-xl transition-all">
                <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900">
                  Thêm Lop
                </Dialog.Title>
                <div className="mt-8 flex flex-row">
                  <TextField
                    sx={{ marginRight: "12px" }}
                    required
                    id="classname"
                    name="classname"
                    label="Tên lớp"
                    variant="outlined"
                    value={classInfo.classname}
                    onChange={handleChange}
                  ></TextField>
                  <TextField
                    id="total"
                    name="total"
                    required
                    label="Sĩ số"
                    variant="outlined"
                    value={classInfo.total}
                    onChange={handleChange}
                  ></TextField>
                </div>
                <div className="mt-4 flex flex-row">
                  <input
                    type="text"
                    id="year"
                    name="year"
                    className={`bg-Background2 mr-3 block w-full cursor-not-allowed rounded-lg border border-gray-300 p-2.5 text-base text-gray-900 placeholder-gray-500 focus:outline-gray-500`}
                    value={"Năm " + year}
                    disabled
                    required
                  />
                  <input
                    type="text"
                    id="gradename"
                    name="gradename"
                    className={`bg-Background2 block w-full cursor-not-allowed rounded-lg border border-gray-300 p-2.5 text-base text-gray-900 placeholder-gray-500 focus:outline-gray-500`}
                    value={"Khối " + gradename}
                    disabled
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
                    onClick={closeAddClassModal}
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
AddClassModal.propTypes = {
  isOpenAddClassModal: PropTypes.any,
  closeAddClassModal: PropTypes.any,
  year: PropTypes.any,
  gradename: PropTypes.any,
  setCheckReRender: PropTypes.any,
  checkReRender: PropTypes.any,
}
