import classes from './Layout.module.css'
import MainNavigation from './MainNavigation';

function layout(props){
    return <div>
        <MainNavigation/>
        <main className={classes.main}>
            {props.children}
        </main>
    </div>
}

export default layout;