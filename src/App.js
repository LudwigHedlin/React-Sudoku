import React from 'react'
import {Route,Switch} from 'react-router-dom'
import Sudoku from './Components/Sudoku'
import Pathfinder from './Components/Pathfinder';
import Layout from './navigation/Layout.js'
import './index.css';


function App(){
    return (
    <Layout>
        <Switch>
            <Route path="/pathfinder">
                <Pathfinder/>
            </Route>        
            <Route path='/'>
                <Sudoku/>
            </Route>
        </Switch>
    </Layout>
    )
}

export default App;