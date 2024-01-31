import trashBinPNG from '../../assets/remove-selected-trash-bin.png';
import './styles.css';

export default function ControllerMenu() {
    return (
        <section className="section controller-menu">
            <button className="controller-menu__button controller-menu__button--tutorial">
                Tutorial
            </button>
            <button className="controller-menu__button controller-menu__button--select-all">
                Select All
            </button>
            <button className="controller-menu__button controller-menu__button--remove-selected">
                <img src={trashBinPNG} alt="A trash bin icon" />
                <p>Remove Selected</p>
            </button>
        </section>
    );
}
