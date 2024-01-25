import "./styles.css";
import "../../common/styles/color.css";
/**
 * Footer component.
 *
 * @param {object} props - The component props.
 * @param {string} props.buttonText - The text to display in the button
 * @param {() => void} props.buttonOnClickAction - The action to perform when the button is clicked
 * @returns {JSX.Element} The rendered Footer component.
 */
export default function Footer({
    buttonText,
    buttonOnClickAction
}) {
    return (
        <footer className={'app__footer'}>
            <div className={"container footer--button--container"}>
                <button className={"app__footer--btn"} onClick={() => buttonOnClickAction()}>
                    {buttonText}
                </button>
            </div>
        </footer>
    );
}
