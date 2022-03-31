import './styles/Modal.css'


export default function Modal(props: any) {


  return (
    <div
      className='modal'
    >
      {props.message}
      <button
        onClick={() => props.dismissModal()}
      >
        OKAY!
      </button>
    </div>
  )
}