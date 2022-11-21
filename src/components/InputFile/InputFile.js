import './InputFile.css'

// React imports.
import React, { useState } from 'react'



export default function InputFile(){
    
    const [fileLoad, setFileLoad] = useState(false)
    const [file, setFile] = useState()

    function handleSelectFile(e) {
        
        setFileLoad(true)

        const videoObject = e.target.files[0]
        console.log(URL.createObjectURL(videoObject))

        // TODO: Hacer que se pueda cambiar de archivo.
        setFile(URL.createObjectURL(videoObject))
    }

    return(
        <div className="InputFile">
            <form>

                <input type="file" name="content" id="content" label='Select mp3 or mp4 file' onChange={handleSelectFile} accept='video/mp4, audio/mp3' />

            </form>

            {fileLoad && (
                <video width='500' controls >

                    <source src={file} />

                </video>
            )}


        </div>
    )
}