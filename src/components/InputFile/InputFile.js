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
            totalSeconds: 100,

            timeType: null
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

        
        // CURRENT TIME
        var dateC = new Date(null)
        dateC.setSeconds(Math.ceil(this.video.current.currentTime) - 1)
        
        
        // TOTAL SECONDS
        var dateT = new Date(null)
        dateT.setSeconds(Math.ceil(this.video.current.duration) - 1) // Time
        
        
        if (this.video.current.duration >= 3600) { // Hours Range.
            
            var formatCurrentTime = dateC.toISOString().substr(11, 8)
            var formatTotalTime = dateT.toISOString().substr(11, 8)


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
            
            

            this.setState({
                totalTime: formatTotalTime,
                totalSeconds: Math.ceil(this.video.current.duration),
                
                timeType: 'h:m:s'
            })
    
            this.timeline.current.value = this.video.current.currentTime
            

        } else { // Minutes range
            
            var formatCurrentTime = dateC.toISOString().substr(14, 5)
            var formatTotalTime = dateT.toISOString().substr(14, 5)

            if (formatCurrentTime === '59:59'){
                this.setState({
                    currentTime: '00:00',
                    currentSeconds: 0
                })
            } else {
                this.setState({
                    currentTime: formatCurrentTime,
                    currentSeconds: Math.ceil(this.video.current.currentTime) - 1,
                })
            }
            this.setState({
                totalTime: formatTotalTime,
                totalSeconds: Math.ceil(this.video.current.duration),

                timeType: 'm:s'
            })
    
            this.timeline.current.value = this.video.current.currentTime
            
        }
            


        if (this.video.current.duration === this.video.current.currentTime) {
            this.setState({
                runningVideo: false,
                pauseImage: 'https://www.pngarts.com/files/2/Play-PNG-Download-Image.png'
            })
        }


    }

    HandlerVideoTimeLine = (e) => {
        this.video.current.currentTime = e.target.value

        var date = new Date(null)
        date.setSeconds(Math.ceil(e.target.value) - 1)


        if (this.video.current.duration >= 3600) {

            var formatCurrentTime = date.toISOString().substr(11, 8)
            if (formatCurrentTime === '23:59:59'){
                this.setState({
                    currentTime: '00:00:00',
                    currentSeconds: 0
                })
            } else {
                this.setState({
                    currentTime: formatCurrentTime,
                    currentSeconds: Math.ceil(e.target.value) - 1,
                })
            }
            
        } else {
            
            var formatCurrentTime = date.toISOString().substr(14, 5)
            if (formatCurrentTime === '59:59'){
                this.setState({
                    currentTime: '00:00',
                    currentSeconds: 0
                })
            } else {
                this.setState({
                    currentTime: formatCurrentTime,
                    currentSeconds: Math.ceil(e.target.value) - 1,
                })
            }
            

        }
    }


    HandlerVolume = (e) => {
        this.video.current.volume = e.target.value / 100
    }


    render() {
        return(
            //! TODO: shortcuts to functions!!!!!

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

                                {/* TODO: volume slider */}

                                <input type="range" name="volume_range" id="volume_range" className="volume_range" min='0' max='100' defaultValue='100' onChange={this.HandlerVolume} />

                                <span onClick={this.onPause} className="button_test"><img src={this.state.pauseImage} className='video_toolbar_img' alt='#' /></span>

                            </div>

                        </div>

                    </div>
                )}


            </div>
        )
    }
}