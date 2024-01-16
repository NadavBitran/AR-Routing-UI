/**
 * Footer component.
 *
 * @param {object} props - The component props.
 * @param {Array} props.buttonsKey - The array of button keys.
 * @param {Array} props.buttonsContent - The array of button contents.
 * @param {Function} props.buttonOnClickIndicator - The function to handle button click.
 * @returns {JSX.Element} The rendered Footer component.
 */
export default function Footer({
    buttonsKey,
    buttonsContent,
    buttonOnClickIndicator,
}) {
    return (
        <footer className={'app__footer'}>
            {buttonsContent.map((content, index) => (
                <button
                    key={buttonsKey[index]}
                    onClick={() => buttonOnClickIndicator(buttonsKey[index])}
                >
                    {content}
                </button>
            ))}
        </footer>
    );
}
