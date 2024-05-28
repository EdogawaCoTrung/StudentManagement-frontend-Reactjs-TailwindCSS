import PropTypes from "prop-types"
export default function SubjectCard({ subjectName }) {
  return (
    <div className="my-class bg-subjectCard group relative mr-4 mt-5 flex h-[120px] w-[240px] animate-fade-down cursor-pointer items-center justify-center rounded-2xl  after:absolute after:top-2 after:scale-0 after:border-8 after:border-solid after:border-white after:opacity-30 after:transition-all after:content-[''] hover:after:scale-95">
      <p className="font-Manrope text-2xl font-bold text-white group-hover:animate-jump">{subjectName}</p>
    </div>
  )
}
SubjectCard.propTypes = {
  subjectName: PropTypes.any,
}
