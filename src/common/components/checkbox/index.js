import './styles.css';

export default function Checkbox() {
    return (
        <label className="checkbox-container">
            <input className="checkbox-button" type="checkbox" />
            <span className="checkbox-mark" />
        </label>
    );
}
