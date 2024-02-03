import './styles.css';

export default function Checkbox({onButtonClick , isChecked}) {
    return (
        <label className="checkbox-container">
            <input className="checkbox-button" type="checkbox" onChange={onButtonClick} checked={isChecked}/>
            <span className="checkbox-mark"/>
        </label>
    );
}
