import { Tab } from "@headlessui/react"
import { tuitions } from "./data"
import React, { useEffect, useMemo, useState } from "react"
import { PiStudentBold } from "react-icons/pi"
import { SiGoogleclassroom } from "react-icons/si"
import StudentTuitionTable from "../../components/share/StudentTuitionTable"
import { Button } from "@mui/material"
import AddCircleRoundedIcon from "@mui/icons-material/AddCircleRounded"
import AddTuitionModal from "../../components/share/AddTuitionModal"
export default function Plan() {
  let [isOpenAddTuitionModal, setIsOpenAddTuitionModal] = useState(false)
  function closeAddTuitionModal() {
    setIsOpenAddTuitionModal(false)
  }
  function openAddTuitionModal() {
    setIsOpenAddTuitionModal(true)
  }
  return (
    <div className="mx-14 mb-0 flex h-screen flex-col overflow-hidden p-0">
      <div className="mt-10 flex items-center justify-between">
        <p className="font-Manrope text-2xl font-bold">Học phí</p>
        <Button
          onClick={openAddTuitionModal}
          variant="contained"
          color="success"
          startIcon={<AddCircleRoundedIcon></AddCircleRoundedIcon>}
        >
          Add
        </Button>
        <AddTuitionModal
          isOpenAddTuitionModal={isOpenAddTuitionModal}
          closeAddTuitionModal={closeAddTuitionModal}
        ></AddTuitionModal>
      </div>
      <div className="relative mt-10">
        <Tab.Group>
          <Tab.List className="absolute flex w-full">
            <Tab
              autoFocus
              className="group z-0 flex h-14 w-fit flex-row rounded-none bg-gray-500 px-3 transition-all duration-300 focus:-translate-y-2 focus:bg-backgroundplus active:-translate-y-2 active:bg-backgroundplus"
            >
              <div className="mt-2 flex flex-row items-center justify-center  align-top">
                <PiStudentBold className="mr-1 text-base font-semibold transition-none duration-0 group-focus:text-white" />
                <p className="group-text font-Manrope text-base font-semibold transition-none duration-0 group-focus:text-white">
                  Học sinh
                </p>
              </div>
            </Tab>
            <Tab className="group z-0 flex h-14 w-fit flex-row rounded-none bg-gray-500 px-3 transition-all duration-300 focus:-translate-y-2 focus:bg-backgroundplus active:-translate-y-2 active:bg-backgroundplus">
              <div className="mt-2 flex flex-row items-center justify-center  align-top">
                <SiGoogleclassroom className="mr-1 text-base font-semibold duration-0 group-focus:text-white" />
                <p className="group-text font-Manrope text-base font-semibold duration-0 group-focus:text-white">Lớp</p>
              </div>
            </Tab>
          </Tab.List>
          <Tab.Panels>
            <Tab.Panel>
              <StudentTuitionTable data={tuitions}></StudentTuitionTable>
            </Tab.Panel>
            <Tab.Panel>Content 2</Tab.Panel>
          </Tab.Panels>
        </Tab.Group>
      </div>
    </div>
  )
}
