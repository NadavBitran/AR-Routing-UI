import { MAP_PAGE_TEXT } from "../constants/mapConstants";

const MapTutorialBar = () => {
    return (
        <section className={"outer-tutorial-bar"}>
            <div className={"container tutorial-bar"}>
                <button className="tutorial-bar--btn">{MAP_PAGE_TEXT.TUTORIAL}</button>
                <p className="tutorial-bar--text">Choose the Starting position</p>
            </div>
        </section>
    );
};

export default MapTutorialBar;
