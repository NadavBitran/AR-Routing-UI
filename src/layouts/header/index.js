/**
 * Renders the header component.
 *
 * @param {object} props - The component props.
 * @param {string} props.title - The title to be displayed in the header.
 * @returns {JSX.Element} The rendered header component.
 */
export default function Header({ title }) {
    return (
        <header className={'app__header'}>
            <h1>{title}</h1>
        </header>
    );
}
