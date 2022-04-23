import '../styles/Header.scss';
import logo from '../assets/logo.png';


export default function Header(props: any) {

  return (
    <div className='header-div'>
    <header
    className={`App-header ${props.blur
      ? 'modal-blur'
      : 'no-blur'}`}
    >
      <img src={logo} className="App-logo" alt="spinning-logo" />
      <a href="https://github.com/rboyle-software/drone-tools" target="_blank" rel="noreferrer" title="Visit the GitHub repo!">
        <p>DRONE TOOLS</p>
      </a>
    </header>
    </div>
  )

}
