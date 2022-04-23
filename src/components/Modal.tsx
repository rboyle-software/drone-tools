import '../styles/Modal.scss'


export default function Modal(props: any) {

  return (
    <div
      className={`overlay ${props.fade}`}
    >
      <div className='modal'>
        {props.message}
        <button
          onClick={(e) => props.dismissModal(e)}
        >
          OKAY!
        </button>
      </div>
    </div>
  )
}
