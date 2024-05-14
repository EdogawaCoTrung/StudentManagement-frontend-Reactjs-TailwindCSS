import { useEffect } from "react"
import { preLoaderAnim } from "../animations"
import PropTypes from "prop-types"
import "./index.scss"
const PreLoader = () => {
  useEffect(() => {
    preLoaderAnim()
  }, [])
  return (
    <div className="preloader">
      <div className="texts-container">
        <span>Student </span>
        <span>Management </span>
        <span>Web</span>
      </div>
    </div>
  )
}

export default PreLoader
PreLoader.propTypes = {
  HandleClick: PropTypes.any,
}
