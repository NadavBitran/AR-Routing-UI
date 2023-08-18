import StepComp from "./StepComp";

import "../style/RouteComp.css";



export default function RouteComp(props) {

  // --------------------------------------------------------
  // --------------------------------------------------------
  // ---- HANDELERS ----
  const handleRouteNameInput = (event) => {
    props.addRouteNameToRoute(event.target.value, props.routeIndex)
  }

  const handleNewStepInput = () => {
    props.addStepListToRoute([...props.stepList, { length: "", direction: "Foward" }], props.routeIndex)
  }
  // --------------------------------------------------------
  // --------------------------------------------------------


  // --------------------------------------------------------
  // --------------------------------------------------------
  // --- MAPPING ----
  const steps = props.stepList.map((stepElement , stepIndex) => (
    // The following data is transmitted:
    // 1) stepIndex -> The index of the current stepElement
    // 2) routeIndex -> The index of the current stepElement's route
    // 2) setLength -> Sending a callback to *send the data about the step's length*
    // 3) setDirection -> Sending a callback to *send the data about the step's direction*
    <StepComp key={stepIndex}
      stepIndex={stepIndex}
      routeIndex={props.routeIndex}
      addLengthToStep={props.addLengthToStep}
      addDirectionToStep={props.addDirectionToStep} />
  ));
  // --------------------------------------------------------



  // --- JSX ----
  return (
    <div className="routeComp">
      <div className="routeName">
        <label>Route Name:</label>
        <input type="text" onChange={handleRouteNameInput}></input>
      </div>
      <div className="stepCompList">{steps}</div>
      <button onClick={handleNewStepInput}>Add Step</button>
    </div>
  );
}

