// eslint-disable-next-line
import { Fragment, useEffect, useState } from "react"
import { Listbox, Transition } from "@headlessui/react"
import { FaAngleDown } from "react-icons/fa6"
import { FaAngleUp } from "react-icons/fa6"
import { gradeApi } from "../../../apis"
import PropTypes from "prop-types"
// eslint-disable-next-line
export default function Dropdown({ selectYear, setSelectYear, type }) {
  // eslint-disable-next-line
  const [data, setData] = useState("")
  let [yearArr, setYearArr] = useState([])
  function destructYear(data) {
    console.log("chay vao ham")
    if (data) {
      let arr = data.map((grade) => grade.year)
      return arr
    }
    return null
  }
  let fetchAllYear = async () => {
    let year = await gradeApi.getAllYear()
    console.log("GETYEAR", year.DT)
    setData(year.DT)
  }
  useEffect(() => {
    fetchAllYear()
  }, [])
  useEffect(() => {
    if (type != null) {
      let arr = destructYear(data)
      let reductArr = ["All", ...new Set(arr)]
      setYearArr(reductArr)
    } else if (type == null) {
      let arr = destructYear(data)
      let reductArr = [...new Set(arr)]
      setYearArr(reductArr)
    }
  }, [data])
  console.log(selectYear + "View dropdown")
  console.log(yearArr)
  //   const fetchAllGroup = async () => {
  //     const groups = await groupApi.getAllGroup()
  //     setData(groups)
  //   }
  //   useEffect(() => {
  //     fetchAllGroup()
  //   }, [])
  // useEffect(async () => {
  //   if (!loading && data.length > 0) {

  //   }
  // }, [data, loading])
  return (
    <div className="z-10 w-fit animate-fade-right">
      <Listbox value={selectYear} onChange={setSelectYear}>
        <div className="relative mt-1">
          <Listbox.Button className="relative w-32 cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
            <span className="block truncate">{selectYear}</span>
            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
              <FaAngleDown className="h-5 w-5 text-gray-400" aria-hidden="true" />
            </span>
          </Listbox.Button>
          <Transition as={Fragment} leave="transition ease-in duration-100" leaveFrom="opacity-100" leaveTo="opacity-0">
            <Listbox.Options className="bg-Background1 absolute mt-1 max-h-60 w-fit overflow-auto rounded-md py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm">
              {yearArr?.map((year, yearIdx) => (
                <Listbox.Option
                  key={yearIdx}
                  className={({ active }) =>
                    `relative cursor-default select-none bg-white py-2 pl-10 pr-4 ${
                      active ? "bg-amber-400 text-amber-900" : "text-gray-900"
                    }`
                  }
                  value={year}
                >
                  {({ selected }) => (
                    <>
                      <span className={`block truncate ${selected ? "font-medium" : "font-normal"}`}>{year}</span>
                      {selected ? (
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
                          <FaAngleUp className="h-5 w-5" aria-hidden="true" />
                        </span>
                      ) : null}
                    </>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
    </div>
  )
}
