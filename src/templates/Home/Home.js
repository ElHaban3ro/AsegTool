import './Home.css'
import { Fragment } from 'react'


// Components.
import SelectFile from '../../components/InputFile/InputFile'
import Nav from '../../components/Nav/Nav'

export default function Home(){
    return(
        <Fragment>
            
            <Nav />
            <SelectFile />

        </Fragment>
    )
}