import { Dialog, Transition } from "@headlessui/react"
import { Fragment } from "react"
import PropTypes from "prop-types"
import { FaCamera } from "react-icons/fa"
import { QRCodeSVG } from "qrcode.react"
export default function QrCodeModal({ isOpenScannerModal, closeScannerModal, link }) {
  return (
    <Transition appear show={isOpenScannerModal} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={closeScannerModal}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/25" />
        </Transition.Child>

        <div className="fixed inset-0 flex items-center justify-center align-middle ">
          <div className="">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="flex h-fit w-[400px] transform flex-col items-center justify-center rounded-2xl bg-white p-6 text-left font-Manrope shadow-xl transition-all">
                <div className="flex items-center">
                  <Dialog.Title as="h3" className="mr-2 text-3xl font-medium leading-6 text-gray-900">
                    QR-CODE
                  </Dialog.Title>
                  <FaCamera size={30} />
                </div>
                <div className="mt-8 flex flex-row">
                  <QRCodeSVG size={250} value={link} />
                </div>
                <p className="mt-4 text-wrap text-center font-Manrope text-base font-bold text-red-900">
                  Lưu ý: Trong trường hợp mất biên lai thu tiền học phí, học sinh chụp lại mã và đem nộp khi đóng tiền
                </p>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
}
QrCodeModal.propTypes = {
  isOpenScannerModal: PropTypes.any,
  closeScannerModal: PropTypes.any,
  link: PropTypes.any,
}
