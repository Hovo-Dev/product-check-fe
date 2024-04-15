import { ToastContainer } from 'react-toastify'

const ToastService = () => (
  <ToastContainer
    className='toast-container'
    draggable
    rtl={false}
    theme='dark'
    pauseOnHover
    closeOnClick
    autoClose={3000}
    pauseOnFocusLoss
    newestOnTop={false}
    position='top-right'
    hideProgressBar={false}
  />
)

export default ToastService
