import "./TopSection.css";
import pokeball from "../Imagenes/pokeball.png"

function TopSection() {
  return (
    <div className="title">
      <div className="title_left">
        <p>Pokedex</p>
      </div>
      <div className="pokeball">
        <img 
          src={pokeball} 
          alt="pokeball" 
          style={{width:"30px", marginRight:"10px"}}
          />
      </div>
    </div>
  );
}

export default TopSection;