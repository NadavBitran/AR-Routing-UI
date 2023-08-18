import "../style/MenuComp.css";


export default function MenuComp({ setRouteList }) {

  // ---- HANDLERS ----
  const handleNewRouteInput = () => {
    setRouteList((currRouteList) => [...currRouteList, { routeName: "", stepList: [] }])
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