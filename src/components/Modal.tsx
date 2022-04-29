import { ModalProps } from '../utilities/PropTypes';
import '../styles/Modal.scss';


export default function Modal({ dismissModal, fade, message }: ModalProps) {

  return (
    <div
      className={`modal-overlay ${fade}`}
    >
      <div className='modal-window'>
        {message}
        <button
          onClick={(e) => dismissModal(e)}
        >
          OKAY!
        </button>
      </div>
    </div>
  )
}
