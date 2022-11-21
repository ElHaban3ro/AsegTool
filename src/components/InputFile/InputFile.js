import './InputFile.css'

// React imports.
import React from 'react'






export default class InputFile extends React.Component {
    
    constructor(props) {

        super(props);
        this.video = React.createRef();

        this.state = {
            fileLoad: false,
            videoObject: null

        }

    }
    
    handleSelectFile = (e) => {
        // TODO: Hacer que se pueda cambiar de archivo.
        const videoObject = e.target.files[0];
        console.log(this.state.fileLoad)

        this.setState({
            fileLoad: true,
            videoObject: URL.createObjectURL(videoObject)
        }, () => {
            console.log(this.state.fileLoad)
        })

    }  
    

    onPause = (e) => {
        this.video.current.play()
    }

    render() {
        return(
            <div className="InputFile">
                <form>

                    <input type="file" name="content" id="content" label='Select mp3 or mp4 file' onChange={this.handleSelectFile} accept='video/mp4, audio/mp3' />

                </form>

                {this.state.fileLoad && (
                    <div className="video_div">
                        
                        <div className="video_frame">
                                
                            <video width='500' controls ref={this.video} >

                                <source src={this.state.fileVideo} />

                            </video>

                            <button onClick={this.onPause}>Pause</button>
                        </div>

                    </div>
                )}


            </div>
        )
    }
}