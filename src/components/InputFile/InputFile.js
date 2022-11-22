import './InputFile.css'

// React imports.
import React from 'react'






export default class InputFile extends React.Component {
    
    constructor(props) {

        super(props);
        this.video = React.createRef();
        this.timeline = React.createRef();
        

        this.state = {
            fileLoad: false,
            videoObject: null,
            runningVideo: false,
            pauseImage: "https://www.pngarts.com/files/2/Play-PNG-Download-Image.png",
            currentTime: '00:00:00',
            currentSeconds: 0,
            totalTime: '00:00:00',
            totalSeconds: 100
        }
        
    }
    
    handleSelectFile = (e) => {
        // TODO: Hacer que se pueda cambiar de archivo.
        const videoObject = e.target.files[0];

        this.setState({
            fileLoad: true,
            videoObject: URL.createObjectURL(videoObject)
        })

    }  
    
    
    onPause = (e) => {
        if (this.state.runningVideo === false){
            
            this.video.current.play()
            this.setState({
                runningVideo: true,
                pauseImage: "https://cdn4.iconfinder.com/data/icons/ionicons/512/icon-pause-512.png"
            })
            
        } else {
            
            this.video.current.pause()
            this.setState({
                runningVideo: false,
                pauseImage: 'https://www.pngarts.com/files/2/Play-PNG-Download-Image.png'
            })
            
        }
        
    }


    HandlerVideo = (e) => {

        var date = new Date(null)
        date.setSeconds(Math.ceil(this.video.current.currentTime) - 1)
        var formatCurrentTime = date.toISOString().substr(11, 8)
        if (formatCurrentTime === '23:59:59'){
            this.setState({
                currentTime: '00:00:00',
                currentSeconds: 0
            })
        } else {
            this.setState({
                currentTime: formatCurrentTime,
                currentSeconds: Math.ceil(this.video.current.currentTime) - 1,
            })
        }


            
        var date = new Date(null)
        date.setSeconds(Math.ceil(this.video.current.duration) - 1)
        var formatTotalTime = date.toISOString().substr(11, 8)
        this.setState({
            totalTime: formatTotalTime,
            totalSeconds: Math.ceil(this.video.current.duration)
        })

        this.timeline.current.value = this.video.current.currentTime
        

    }

    HandlerVideoTimeLine = (e) => {
        this.video.current.currentTime = e.target.value
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
                                
                            <video width='500' controls ref={this.video} onTimeUpdate={this.HandlerVideo} >

                                <source src={this.state.videoObject} />

                            </video>

                            <div className="buttons_div">

                                <p className="timing">{this.state.currentTime}/{this.state.totalTime}</p>

                                <input type="range" name="timeline" id="timeline" className="timeline" min='0' max={this.state.totalSeconds} onChange={this.HandlerVideoTimeLine} label="Select mp3 or mp4 file" ref={this.timeline} defaultValue='0' />

                                <a onClick={this.onPause} className="button_test"><img src={this.state.pauseImage} className='video_toolbar_img' alt='#' /></a> {/* <a>, to add pause image */}

                            </div>

                        </div>

                    </div>
                )}


            </div>
        )
    }
}