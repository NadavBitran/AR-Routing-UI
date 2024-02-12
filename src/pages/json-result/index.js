import './styles.css';

export default function JsonResult({ json }) {
    return (
        <main className="container json-result">
            <pre>{json}</pre>
        </main>
    );
}
