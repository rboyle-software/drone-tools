import '../styles/Header.scss';
import logo from '../assets/logo.png';


export default function Header(props: any) {

  return (
    <div
      className={`header-div ${props.blur}`}
    >
      <header className='App-header'>
        <img src={logo} className="App-logo" alt="spinning-logo" />
        <a href="https://github.com/rboyle-software/drone-tools" target="_blank" rel="noreferrer" title="Visit the GitHub repo!">
          <p>DRONE TOOLS</p>
        </a>
      </header>
    </div>
  )
}
