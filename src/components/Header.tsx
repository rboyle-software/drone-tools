import { HeaderProps } from '../utilities/PropTypes';
import logo from '../assets/logo.png';
import '../styles/Header.scss';


export default function Header({ blur }: HeaderProps) {

  return (
    <div
      className={`header-wrapper ${blur}`}
    >
      <header className='header'>
        <img src={logo} className="app-logo" alt="spinning-logo" />
        <a href="https://github.com/rboyle-software/drone-tools" target="_blank" rel="noreferrer" title="Visit the GitHub repo!">
          <p>DRONE TOOLS</p>
        </a>
      </header>
    </div>
  )
}
