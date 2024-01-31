import { Link } from 'react-router-dom';

import * as DataTypes from '../../common/types/data.types';

import './styles.css';
import '../../common/styles/color.css';
/**
 * Footer component.
 *
 * @param {DataTypes.Button} props - The component props.
 * @returns {JSX.Element} The rendered Footer component.
 */
export default function Footer({ text, action }) {
    const toPath = '/route-manager'; // since we only have two routes, we can hardcode the path here (change if needed)

    return (
        <footer className={'app__footer'}>
            <div className={'container footer--button--container'}>
                <Link
                    to={toPath}
                    className={'app__footer--btn'}
                    onClick={() => action()}
                >
                    {text}
                </Link>
            </div>
        </footer>
    );
}
