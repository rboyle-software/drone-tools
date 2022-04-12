import '../styles/Header.scss';
import logo from '../assets/logo.png';


export default function Header(props: any) {

  return (
    <header
    className={`App-header ${props.modalDisplay
      ? 'modal-blur'
      : 'no-blur'}`}
    >
      <a href="https://github.com/rboyle-software/drone-tools" target="_blank" rel="noreferrer" title="Visit the GitHub repo!">
        <img src={logo} className="App-logo" alt="spinning-logo" />
        <p>DRONE TOOLS</p>
      </a>
    </header>
  )

}
