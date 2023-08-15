import "../style/MenuComp.css";
import { v4 as uuid } from 'uuid';


export default function MenuComp({ setRouteList }) {

  // ---- HANDLERS ----
  const handleNewRouteInput = () => {
    setRouteList((currRouteList) => [...currRouteList, { id: uuid(), routeName: "", stepList: [] }])
  }


  // ---- JSX ----
  return (
    <div className="menuComp">
      <button onClick={handleNewRouteInput}>Add Route</button>
      <button>Help</button>
      <button>Save</button>
    </div>
  );
}