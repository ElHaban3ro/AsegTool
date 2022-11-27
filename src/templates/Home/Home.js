import './Home.css'
import { Fragment } from 'react'


// Components.
import SelectFile from '../../components/InputFile/InputFile'
import Nav from '../../components/Nav/Nav'
import HeaderText from '../../components/HeaderText/HeaderText'

export default function Home(){
    return(
        <Fragment>
            
            <Nav />
            <HeaderText />
            <SelectFile />

        </Fragment>
    )
}