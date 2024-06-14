import { Fragment, useEffect, useState } from "react"
import { Combobox, Transition } from "@headlessui/react"
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid"
import { summaryApi, teacherApi } from "../../../apis"
import { toast } from "react-toastify"
import PropTypes from "prop-types"
export default function DisciplineCombobox({ handleChange }) {
  //   let checkString = "10A1 - 1"
  const [selected, setSelected] = useState({
    id: "",
    typename: "",
    minuspoint: "",
  })
  console.log("SELECTED", selected)
  const handleChangeInput = (e) => {
    setSelected(e)
    handleChange("typeinfringeId", e.id)
  }
  const [query, setQuery] = useState("")
  const [cloneQuery, setCloneQuery] = useState("")
  const [teachers, setTeachers] = useState("")
  const fetchAllTeacher = async () => {
    let res = await summaryApi.getAllDiscipine()
    if (res.EC == 1) {
      toast.error(res.EM)
    }
    setTeachers(res.DT)
  }
  useEffect(() => {
    fetchAllTeacher()
  }, [])
  // useEffect(() => {
  //   setSelected(teachers[0])
  // }, [teachers])
  //   console.log("CHECKSTRING", cloneQuery.split("-")[1])
  //   console.log("STRING", checkString.toLowerCase().replace(/\s+|-/g, " ").includes("1"))
  // query.toLowerCase().replace(/\s+|-/g, "").includes(classDT.classname.toLowerCase().replace(/\s+/g, ""))
  const filteredTeachers =
    query === ""
      ? teachers
      : teachers.filter(
          (teacherDT) =>
            teacherDT.typename
              .toLowerCase()
              .normalize("NFD")
              .replace(/[\u0300-\u036f]/g, "")
              .replace(/\s+/g, "")
              .includes(query.toLowerCase().replace(/\s+|-/g, "")) ||
            (query.includes("-")
              ? cloneQuery.split("-")[1].includes(teacherDT.minuspoint.toString()) &&
                query
                  .toLowerCase()
                  .normalize("NFD")
                  .replace(/[\u0300-\u036f]/g, "")
                  .replace(/\s+|-/g, "")
                  .includes(teacherDT.typename.toLowerCase().replace(/\s+/g, ""))
              : query
                  .toLowerCase()
                  .normalize("NFD")
                  .replace(/[\u0300-\u036f]/g, "")
                  .replace(/\s+|-/g, "")
                  .includes(
                    teacherDT.typename.toLowerCase().normalize("NFD").replace(/\s+|-/g, "").replace(/\s+/g, ""),
                  )),
        )
  return (
    <div className="w-60">
      <Combobox value={selected} onChange={handleChangeInput}>
        <div className="relative">
          <div className="relative w-full cursor-default overflow-hidden rounded-lg bg-white text-left shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300 sm:text-sm">
            <Combobox.Input
              className="w-full rounded-lg border-2 border-gray-300 py-4 pl-3 pr-10 text-sm leading-5 text-gray-900 focus:ring-0"
              displayValue={(teachers) =>
                teachers.id === ""
                  ? teachers.typename + teachers.minuspoint
                  : teachers.typename + " - " + teachers.minuspoint
              }
              onChange={(event) => {
                setQuery(event.target.value)
                setCloneQuery(event.target.value)
                handleChange("typeinfringeId", event.target.value)
              }}
            />
            <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
              <ChevronUpDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
            </Combobox.Button>
          </div>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
            afterLeave={() => setQuery("")}
          >
            <Combobox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm">
              {filteredTeachers.length === 0 && query !== "" ? (
                <div className="relative cursor-default select-none py-2 pr-4 text-gray-700">Nothing found.</div>
              ) : (
                filteredTeachers.length > 0 &&
                filteredTeachers.map((teacherDT) => (
                  <Combobox.Option
                    key={teacherDT.id}
                    className={({ active }) =>
                      `relative cursor-default select-none py-2 pl-4 ${
                        active ? "bg-teal-600 text-white" : "text-gray-900"
                      }`
                    }
                    value={teacherDT}
                  >
                    {({ selected, active }) => (
                      <>
                        <span className={`block truncate ${selected ? "font-medium" : "font-normal"}`}>
                          {teacherDT.typename} - {teacherDT.minuspoint}
                        </span>
                        {selected ? (
                          <span
                            className={`absolute inset-y-0 left-3/4 flex items-center pl-3 ${
                              active ? "text-white" : "text-teal-600"
                            }`}
                          >
                            <CheckIcon className="h-5 w-5" aria-hidden="true" />
                          </span>
                        ) : null}
                      </>
                    )}
                  </Combobox.Option>
                ))
              )}
            </Combobox.Options>
          </Transition>
        </div>
      </Combobox>
    </div>
  )
}
DisciplineCombobox.propTypes = {
  handleChange: PropTypes.any,
}
