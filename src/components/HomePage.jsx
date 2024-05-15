import Cards from "./Cards";
import DropdownMenu from "./DropdownMenu";
import sarjalippukuva from "../assets/sarjalippukuva.jpg"
import lahjakorttikuva from "../assets/lahjakorttikuva.jpg"


export default function HomePage() {
  return (
    <>
      <DropdownMenu />
      <h3>Suosituimmat elokuvat juuri nyt</h3>
      <Cards />
      <h3>Sarjaliput ja lahjakortit</h3>
      <img className="sarjalippu-img" src={sarjalippukuva} width={380}/>
      <img className="lahjakortti-img" src={lahjakorttikuva} width={380}/>
    </>
  );
}
