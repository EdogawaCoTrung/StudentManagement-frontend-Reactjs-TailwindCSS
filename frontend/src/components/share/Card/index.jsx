import PropTypes from "prop-types"
import ButtonAndIcon from "../ButtonAndIcon"
import Grid from "@mui/material/Grid"

function Card({ className, teacherName }) {
  return (
    <Grid container direction="column">
      <Grid item>
        <ButtonAndIcon btnName={className} />
      </Grid>
      <Grid item>
        <span className=" font-bold">{teacherName}</span>
      </Grid>
    </Grid>
  )
}

Card.propTypes = {
  className: PropTypes.string,
  teacherName: PropTypes.string,
}

Card.defaultProps = {
  className: "Default Class",
  teacherName: "Default Teacher",
}

export default Card
