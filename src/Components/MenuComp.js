import "../style/MenuComp.css";
import { v4 as uuid } from 'uuid';

// ---- PROPS ----
// 1) setRoutesInfo -> The callback to create a new route when the button is clicked
export default function MenuComp({setRouteList}){

  // ---- HANDLERS ----
  const handleNewRouteInput = () => {
    setRouteList((currRouteList) => [...currRouteList , {id: uuid() , routeName : "" , stepList : []}])
  }


  // ---- JSX ----
  return(
    <div className="menuComp">
      <button onClick = {() => {handleNewRouteInput()}}>Add Route</button>
      <button>Help</button>
      <button>Save</button>
    </div>
  );
}