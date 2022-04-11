import '../styles/Modal.scss'


export default function Modal(props: any) {

  return (
    <div
      className={`overlay ${props.blur && 'fade-in'}`}
    >
      <div className='modal'>
        {props.message}
        <button
          onClick={() => props.dismissModal()}
        >
          OKAY!
        </button>
      </div>
    </div>
  )
}
