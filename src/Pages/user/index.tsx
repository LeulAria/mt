import React from 'react'
import {Switch} from 'react-router-dom'
import Router from '../../configRoute/routeSubRoute'

export default function index({routes}: any): JSX.Element {
    console.log(routes);
    return (
        <div>
            <Switch>
                {
                    routes.map((value: any, index: any)=>(
                        <Router key={index} {...value}/>
                    ))
                }
            </Switch>
        </div>
    )
}
