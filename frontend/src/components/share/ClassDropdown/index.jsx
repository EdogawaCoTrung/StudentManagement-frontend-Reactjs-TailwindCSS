// eslint-disable-next-line
import { Fragment, useEffect, useState } from "react"
import { Listbox, Transition } from "@headlessui/react"
import { FaAngleDown } from "react-icons/fa6"
import { FaAngleUp } from "react-icons/fa6"
import { classApi } from "../../../apis"
// eslint-disable-next-line
export default function ClassDropdown({ selectClass, setSelectClass }) {
  // eslint-disable-next-line
  const [data, setData] = useState("")
  let fetchAllClass = async () => {
    let res = await classApi.getAllClass()
    setData(res.DT)
  }
  useEffect(() => {
    fetchAllClass()
  }, [])
  return (
    <div className="z-10 w-fit">
      <Listbox value={selectClass} onChange={setSelectClass}>
        <div className="relative mt-1">
          <Listbox.Button className="bg-Background1 relative w-32 cursor-default rounded-lg py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
            <span className="block truncate">{selectClass}</span>
            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
              <FaAngleDown className="h-5 w-5 text-gray-400" aria-hidden="true" />
            </span>
          </Listbox.Button>
          <Transition as={Fragment} leave="transition ease-in duration-100" leaveFrom="opacity-100" leaveTo="opacity-0">
            <Listbox.Options className="bg-Background1 absolute mt-1 max-h-60 w-fit overflow-auto rounded-md py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm">
              {data?.map((classData, classIdx) => (
                <Listbox.Option
                  key={classIdx}
                  className={({ active }) =>
                    `relative cursor-default select-none py-2 pl-10 pr-4 ${
                      active ? "bg-amber-100 text-amber-900" : "text-gray-900"
                    }`
                  }
                  value={classData.id}
                >
                  {({ selected }) => (
                    <>
                      <span className={`block truncate ${selected ? "font-medium" : "font-normal"}`}>
                        {classData.classname}
                      </span>
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
