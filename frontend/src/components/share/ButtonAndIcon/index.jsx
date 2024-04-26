
import PropTypes from "prop-types"
import Button from "@mui/material/Button"
import RemoveIcon from "@mui/icons-material/Remove"
import IconButton from "@mui/material/IconButton"

function ButtonAndIcon({ btnName }) {
    return (
        <div
            style={{
                position: "absolute",
                display: "flex",
                flexDirection: "column",
                top: 0,
                alignItems: "center",
            }}
            >
            <Button
                variant="contained"
                className=" h-20 w-28"
                style={{
                backgroundColor: "#F1F8FF",
                borderRadius: "20%",
                color: "black",
                }}
                sx={{
                position: "relative",
                top: 20, 
                right: 0, 
                fontWeight: 'bold',
                }}
            >
                {btnName}
            </Button>
            <IconButton
                sx={{
                position: "relative",
                top: -60,
                right: -50,
                }}
                style={{
                zIndex: "1",
                backgroundColor: "#DC8888",
                }}
                color="white"
            >
                <RemoveIcon style={{ color:"white", height: "14px", width: "14px" }} />
            </IconButton>
            </div>
    );
}

ButtonAndIcon.propTypes = {
    btnName: PropTypes.string,
};

ButtonAndIcon.defaultProps = {
    btnName: 'Default Button',
};

export default ButtonAndIcon;