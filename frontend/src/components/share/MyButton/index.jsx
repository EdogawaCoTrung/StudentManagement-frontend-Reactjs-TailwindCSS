import Button from '@mui/material/Button'
import PropTypes from 'prop-types';


export default function ButtonUsage(props) {
    return <Button variant="contained">{props.text}</Button>;
  }

  ButtonUsage.propTypes = {
    text: PropTypes.string.isRequired,
  };
  