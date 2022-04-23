import '../styles/Modal.scss'


export default function Modal(props: any) {

  return (
    <div
      className={`overlay ${props.blur ? 'fade-in' : 'fade-out'}`}
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
