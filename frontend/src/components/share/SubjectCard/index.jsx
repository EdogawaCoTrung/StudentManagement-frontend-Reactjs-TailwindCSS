import PropTypes from "prop-types"
import { subjectApi } from "../../../apis"
import { useState } from "react"
import SubjectModal from "../SubjectModal"
export default function SubjectCard({ subjectName, id, setCheckReLoading, checkReLoading }) {
  const [isOpenSubjectModal, setIsOpenSubjectModal] = useState(false)
  const closeSubjectModal = () => {
    setIsOpenSubjectModal(false)
  }
  const OpenSubjectModal = () => {
    setIsOpenSubjectModal(true)
  }
  return (
    <div>
      <div
        onClick={OpenSubjectModal}
        className="my-class group relative mr-4 mt-5 flex h-[120px] w-[240px] animate-fade-down cursor-pointer items-center justify-center rounded-2xl bg-subjectCard  after:absolute after:top-2 after:scale-0 after:border-8 after:border-solid after:border-white after:opacity-30 after:transition-all after:content-[''] hover:after:scale-95"
      >
        <p className="font-Manrope text-2xl font-bold text-white group-hover:animate-jump">{subjectName}</p>
      </div>
      {isOpenSubjectModal && (
        <SubjectModal
          setCheckReLoading={setCheckReLoading}
          checkReLoading={checkReLoading}
          isOpenSubjectModal={isOpenSubjectModal}
          closeSubjectModal={closeSubjectModal}
          id={id}
        ></SubjectModal>
      )}
    </div>
  )
}
SubjectCard.propTypes = {
  subjectName: PropTypes.any,
  setCheckReLoading: PropTypes.any,
  checkReLoading: PropTypes.any,
  id: PropTypes.any,
}
