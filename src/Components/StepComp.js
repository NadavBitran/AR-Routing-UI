import "../style/StepComp.css";


export default function StepComp(props){

  // --------------------------------------------------------
  // --------------------------------------------------------
  // ---- HANDLERS ----
  // DESCRIPTION: Enters the length of the step in the step's route accordingly
  const handleLengthInput = (event) => {
    props.addLengthToStep(event.target.value , props.stepIndex , props.routeIndex);
  }

  // DESCRIPTION: Enters the direction of the step in the step's route accordingly
  const handleDirectionInput = (event) => {
    props.addDirectionToStep(event.target.value , props.stepIndex , props.routeIndex);
  }
  // --------------------------------------------------------
  // --------------------------------------------------------

  
  // --------------------------------------------------------
  // ---- JSX ----
    return (
      <div className="stepComp">
        <div className="stepComp_left">
          <label>Step No ?</label>
          <div className="stepComp_buttons">
            <button>Remove Step</button>
            <button>Edit Step</button>
          </div>
        </div>
        <div className="stepComp_right">
          <div className="stepComp_length">
            <label>Length:</label>
            <input type="text" onChange = {handleLengthInput}></input>
          </div>
          <div className="stepComp_direction">
            <label>Direction:</label>
            <select onChange={handleDirectionInput}>
                <option>Foward</option>
                <option>Foward-Left</option>
                <option>Left</option>
                <option>Left-Backwards</option>
                <option>Backwards</option>
                <option>Right-Backwards</option>
                <option>Right</option>
                <option>Foward-Right</option>
            </select>
          </div>
        </div>
      </div>
    );
  }
