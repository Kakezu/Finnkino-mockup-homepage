import { UilBars, UilLocationPoint, UilSignout, UilSearch } from "@iconscout/react-unicons";
import finnkinologo from "../assets/finnkino-logo.png";

// Removes the errors coming from "soon-to-be-deprecated defaultProps in Uil Icons"
const error = console.error;
console.error = (...args) => {
if (/defaultProps/.test(args[0])) return;
error(...args);
};

export default function Navbar() {
    return (
      <div className="nav-container">
        <div className="nav-left-icons">
          <UilBars size={28} color="#CAA200"/>
          <img src={finnkinologo} alt="Finnkinon logo" className="logo" width={30}/>
        </div>
        <div className='nav-right-icons'>
            <UilLocationPoint size={20} color="#FFFFFF"/>
            <p className="lang-text">FIN</p>
            <UilSignout size={20} color="#FFFFFF"/>
            <UilSearch size={20} color="#FFFFFF"/>
        </div>
      </div>
    );
  }