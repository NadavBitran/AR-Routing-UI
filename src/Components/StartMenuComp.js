import "../style/StartMenuComp.css";


export default function StartMenuComp({setStartMenuButton}) {
  return (
    <div className="startMenuComp">
      <h1>Do you want to add routes now?</h1>
      <div className="buttonOptions">
        <button onClick={() => {setStartMenuButton("Yes - Start Creating");}}>Start Creating</button>
        <button onClick={() => {setStartMenuButton("Yes - Start Tutorial");}}>Start Tutorial</button>
        <button onClick={() => {setStartMenuButton("No");}}>No</button>
      </div>
    </div>
  );
}