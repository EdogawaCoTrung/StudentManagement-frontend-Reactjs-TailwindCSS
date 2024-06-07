import { useEffect } from "react"
import { Html5QrcodeScanner } from "html5-qrcode"
import PropTypes from "prop-types"
function Scanner({ setScanResult }) {
  useEffect(() => {
    console.log("VAOMODALTRATIEN")
    const scanner = new Html5QrcodeScanner("reader", {
      qrbox: {
        width: 250,
        height: 250,
      },
      fps: 5,
    })
    scanner.render(success)
    function success(result) {
      scanner.clear()
      setScanResult(result)
    }
  }, [])
  return <div id="reader"></div>
}
Scanner.propTypes = {
  setScanResult: PropTypes.any,
}
export default Scanner
