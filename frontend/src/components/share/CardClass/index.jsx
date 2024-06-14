import PropTypes from "prop-types"
import Button from "@mui/material/Button"
// import RemoveIcon from "@mui/icons-material/Remove"
// import IconButton from "@mui/material/IconButton"

function CardClass({ nameclass, openModal, checkId, setCheckId }) {
  let handleOnClick = () => {
    console.log("THIS MODAL CLICK!!!!")
    openModal()
    setCheckId(checkId)
  }
  return (
    // <
    //   style={{
    //     position: "relative",
    //     display: "flex",
    //     flexDirection: "column",
    //     top: 0,
    //   }}
    // >
    <div className="mx-9 my-3 h-20 w-28 animate-fade-down">
      <Button
        onClick={handleOnClick}
        variant="contained"
        className=" h-20 w-28"
        style={{
          backgroundColor: "#e9fce8",
          borderRadius: "20%",
          color: "black",
          zIndex: 0,
        }}
        sx={{
          position: "relative",
          top: 0,
          right: 0,
          fontWeight: "bold",
        }}
      >
        <div className="flex flex-col">
          <p className="text-2xl">{nameclass}</p>
          <p className="font-normal lowercase">sĩ số: 40</p>
        </div>
      </Button>
      {/* <IconButton
        sx={{
          position: "relative",
        }}
        style={{
          zIndex: "1",
          backgroundColor: "#DC8888",
        }}
        color="white"
      >
        <RemoveIcon style={{ color: "white", height: "14px", width: "14px" }} />
      </IconButton> */}
    </div>
  )
}

CardClass.propTypes = {
  nameclass: PropTypes.string,
  openModal: PropTypes.any,
  checkId: PropTypes.any,
  setCheckId: PropTypes.any,
}

CardClass.defaultProps = {
  nameclass: "Default Class",
}

export default CardClass