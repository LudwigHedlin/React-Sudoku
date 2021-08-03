import { Link } from 'react-router-dom';

import classes from './MainNavigation.module.css'

function MainNavigation(){
    return (
        <header className={classes.header}>
            <div className={classes.logo}>
                Sudoku
            </div>
            <nav>
            <ul>
                <li>
                    <Link to="/">Sudoku</Link>
                </li>
            </ul>
            </nav>
        </header>
    )
}

export default MainNavigation;