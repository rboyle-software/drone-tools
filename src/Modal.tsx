import './styles/Modal.css'


export default function Modal(props: any) {


  return (
    <div className='overlay'>
      <div
        className={`modal ${props.blur && 'fade-in'}`}
      >
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
