import './InputFile.css'

// React imports.
import React, { Fragment } from 'react'
import { HotKeys, GlobalHotKeys } from 'react-hotkeys';





export default class InputFile extends React.Component {
    
    constructor(props) {
        
        super(props);
        
        this.preventDefaultHandlers = (handlers) => {
            const newHandlers = {}

            for (const [action, handler] of Object.entries(handlers)) {
                newHandlers[action] = (event) => {
                    if (event) {
                        event.preventDefault();
                    }
                    handler()
                }
            }
            return newHandlers
        }

        
        this.shortcuts = {
            PLAY_PAUSE: 'space',
            POINT: 'up',

            NEXT_S: 'right',
            PREV_S: 'left'
        }

        this.short_actions = this.preventDefaultHandlers({
            PLAY_PAUSE: this.onPause,
            POINT: this.handlerPointShortcut,

            NEXT_S: this.nextSecond,
            PREV_S: this.prevSecond
        })


        this.video = React.createRef();
        this.videoSource = React.createRef();
        this.timeline = React.createRef();
        this.filearea = React.createRef()
        this.tparea = React.createRef()

        this.state = {
            fileLoad: false,
            videoObject: null,
            runningVideo: false,
            pauseImage: "https://www.pngarts.com/files/2/Play-PNG-Download-Image.png",
            currentTime: '00:00:00',
            currentSeconds: 0,
            totalTime: '00:00:00',
            totalSeconds: 0,
            
            timeType: 'h:m:s',
        
            viewFile: '',

            datasetEntities: '',
            selectedEntitie: false,
            datasetName: '',
            textFile: '',
            datasetListOfEntities: ['a'],
            listEnt: '',
            selectEntitie: '',
            selecting: false,
            body: '',
            tempPoint: ''
        }
        
    }


    
    handlerPointShortcut = () => {
        if (this.state.selecting) {
            this.HandlerCreatePoint()
        } else {
            this.HandlerStartPoint()
        }
    }
    

    nextSecond = () => {
        this.video.current.currentTime = this.video.current.currentTime + 1
    }

    prevSecond = () => {
        this.video.current.currentTime = this.video.current.currentTime - 1
    }


    
    handleSelectFile = (e) => {
        const videoObject = e.target.files[0];
        
        this.setState({
            fileLoad: true,
            videoObject: URL.createObjectURL(videoObject)
        }, () => {
            this.video.current.load()
            this.setState({
                runningVideo: false,
                pauseImage: 'https://www.pngarts.com/files/2/Play-PNG-Download-Image.png'
            })
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


        if (this.video.current.currentTime === 0){
            // CURRENT TIME
            var dateC = new Date(null)
            dateC.setSeconds(0)
            
            
            // // TOTAL SECONDS
            var dateT = new Date(null)
            dateT.setSeconds(0) // Time

        } else {
            // CURRENT TIME
            var dateC = new Date(null)
            dateC.setSeconds(Math.ceil(this.video.current.currentTime) - 1)
            
            
            // TOTAL SECONDS
            var dateT = new Date(null)
            dateT.setSeconds(Math.ceil(this.video.current.duration) - 1) // Time
            
        }
        
        if (this.video.current.duration >= 3600) { // Hours Range.
            
            var formatCurrentTime = dateC.toISOString().substr(11, 8)
            var formatTotalTime = dateT.toISOString().substr(11, 8)

            if (formatCurrentTime === '23:59:59'){
                this.setState({
                    currentTime: '00:00:00',
                    currentSeconds: 0,
                    timeType: 'h:m:s'
                }, () => {
                    this.setState({
                        textFile: `[${this.state.datasetName}][${this.state.datasetEntities}][${this.state.timeType}]\n\n`
                    }, () => {
                        this.setState({
                            viewFile: this.state.textFile + this.state.body
                        }, () => {
                            
                            this.filearea.current.value = this.state.viewFile
            
                        })
                    })

                })
            } else {
                this.setState({
                    currentTime: formatCurrentTime,
                    currentSeconds: Math.ceil(this.video.current.currentTime) - 1,
                    timeType: 'h:m:s'
                },() => {
                    this.setState({
                        textFile: `[${this.state.datasetName}][${this.state.datasetEntities}][${this.state.timeType}]\n\n`
                    }, () => {
                        this.setState({
                            viewFile: this.state.textFile + this.state.body
                        }, () => {
                            
                            this.filearea.current.value = this.state.viewFile
            
                        })
                    })

                })
            }
            
            

            if (isNaN(this.video.current.duration)){
                this.setState({
                    totalTime: formatTotalTime,
                    totalSeconds: '00:00',
                    timeType: 'h:m:s'

                }, () => {

                    this.setState({
                        textFile: `[${this.state.datasetName}][${this.state.datasetEntities}][${this.state.timeType}]\n\n`
                    }, () => {
                        this.setState({
                            viewFile: this.state.textFile + this.state.body
                        }, () => {
                            
                            this.filearea.current.value = this.state.viewFile
            
                        })
                    })

                })

                
            } else {
                    this.setState({
                        totalTime: formatTotalTime,
                        totalSeconds: Math.ceil(this.video.current.duration),
                        timeType: 'h:m:s'

                    }, () => {

                        this.setState({
                            textFile: `[${this.state.datasetName}][${this.state.datasetEntities}][${this.state.timeType}]\n\n`
                        }, () => {
                            this.setState({
                                viewFile: this.state.textFile + this.state.body
                            }, () => {
                                
                                this.filearea.current.value = this.state.viewFile
                
                            })
                        })
    
                    })
            }
    
            this.timeline.current.value = this.video.current.currentTime
            

        } else { // Minutes range
            
            var formatCurrentTime = dateC.toISOString().substr(14, 5)
            var formatTotalTime = dateT.toISOString().substr(14, 5)

            if (formatCurrentTime === '59:59'){
                this.setState({
                    currentTime: '00:00',
                    currentSeconds: 0,
                    timeType: 'm:s'
                }, () => {

                    this.setState({
                        textFile: `[${this.state.datasetName}][${this.state.datasetEntities}][${this.state.timeType}]\n\n`
                    }, () => {
                        this.setState({
                            viewFile: this.state.textFile + this.state.body
                        }, () => {
                            
                            this.filearea.current.value = this.state.viewFile
            
                        })
                    })

                })
            } else {
                this.setState({
                    currentTime: formatCurrentTime,
                    currentSeconds: Math.ceil(this.video.current.currentTime) - 1,
                }, () => {

                    this.setState({
                        textFile: `[${this.state.datasetName}][${this.state.datasetEntities}][${this.state.timeType}]\n\n`
                    }, () => {
                        this.setState({
                            viewFile: this.state.textFile + this.state.body
                        }, () => {
                            
                            this.filearea.current.value = this.state.viewFile
            
                        })
                    })

                })
            }

            if (isNaN(this.video.current.duration)){
                    this.setState({
                    totalTime: formatTotalTime,
                    totalSeconds: '00:00',
    
                    timeType: 'm:s'
                }, () => {

                    this.setState({
                        textFile: `[${this.state.datasetName}][${this.state.datasetEntities}][${this.state.timeType}]\n\n`
                    }, () => {
                        this.setState({
                            viewFile: this.state.textFile + this.state.body
                        }, () => {
                            
                            this.filearea.current.value = this.state.viewFile
            
                        })
                    })

                })

            } else {
                this.setState({
                    totalTime: formatTotalTime,
                    totalSeconds: Math.ceil(this.video.current.duration),
    
                    timeType: 'm:s'
                }, () => {

                    this.setState({
                        textFile: `[${this.state.datasetName}][${this.state.datasetEntities}][${this.state.timeType}]\n\n`
                    }, () => {
                        this.setState({
                            viewFile: this.state.textFile + this.state.body
                        }, () => {
                            
                            this.filearea.current.value = this.state.viewFile
            
                        })
                    })

                })
            }
    
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



    // Create point
    HandlerStartPoint = (e) => {

        if (e) {
            e.preventDefault()
        }

        this.setState({
            tempPoint: `! ${this.state.selectEntitie}\n- ${this.state.currentTime} > `,
            selecting: true
        })
        
    }
    

    HandlerCreatePoint = (e) => {
        if (e) {
            e.preventDefault()
        }
        
        this.setState({
            tempPoint: this.state.tempPoint + `${this.state.currentTime}\n\n`,
            selecting: false
        }, () => {
            this.setState({
                body: this.state.body + this.state.tempPoint,
                tempPoint: ''
            }, () => {
                this.setState({

                    viewFile: this.state.textFile + this.state.body

                }, () => {

                    this.filearea.current.value = this.state.viewFile

                })
            })
        })
    }

    
    HandlerEntitieRadio = (e) => {

        this.setState({
            selectedEntitie: true,
            selectEntitie: e.target.value
        })
    }



    // Inputs metadata
    datasetName = (e) => {
        
        this.setState({
            datasetName: e.target.value,
            textFile: `[${e.target.value}][${this.state.datasetEntities}][${this.state.timeType}]\n\n`
        }, () => {
            this.setState({
                viewFile: this.state.textFile + this.state.body
            }, () => {
                
                this.filearea.current.value = this.state.viewFile

            })
        })
        
    }
    


    datasetEntities = (e) => {
        var listOfEntities = e.target.value.split(',')
        var LoE = []

        for (var ei in listOfEntities){
            
            LoE.push(listOfEntities[ei].trim())
        }

        this.setState({
            datasetListOfEntities: LoE,
            
            


            datasetEntities: e.target.value,
            textFile: `[${this.state.datasetName}][${e.target.value}][${this.state.timeType}]\n\n`
        }, () => {
            this.setState({
                viewFile: this.state.textFile + this.state.body
            }, () => {
                
                this.filearea.current.value = this.state.viewFile

            })
            
            const listOfEnt = content_original => {
                let content = []
                for (let i in content_original) {
                    const item = content_original[i]
                    content.push(<div key={item}>

                                    <input type='radio' name='entitieRadio' value={item} id={item} onChange={this.HandlerEntitieRadio} className='entitiesRadio' />
                                    <label htmlFor={item} className='labelEntities'> {item} </label>

                                </div>)
                }

                return content  
            }
            

            this.setState({

                listEnt: (<div>

                            {listOfEnt(this.state.datasetListOfEntities)} 

                            {/* <h2>AAAA</h2> */}

                         </div>)

            })
            
            
            
        })
        
    }




    render() {
        return(
            //! TODO: shortcuts to functions!!!!!


            <div className="InputFile"> 
                
                <div className="video_div">

                    <div className="video_frame">
                        {this.state.fileLoad && (

                            <video height='100%' ref={this.video} onTimeUpdate={this.HandlerVideo} >

                                <source src={this.state.videoObject} ref={this.videoSource} />d

                            </video>

                        )}                        


                    </div>
                    {/* {this.state.fileLoad && ( */}
                        <div className="buttons_main_div">

                            <div className="time_volume_div">

                                <p className="timing">{this.state.currentTime} / {this.state.totalTime}</p>

                                <input type="range" name="volume_range" id="volume_range" className="volume_range" min='0' max='100' defaultValue='100' onChange={this.HandlerVolume} />

                            </div>

                            <div className="timeline_div">

                                <span onClick={this.onPause} className="button_test"><img src={this.state.pauseImage} className='video_toolbar_img' alt='#' /></span>

                                <input type="range" name="timeline" id="timeline" className="timeline" min='0' max={this.state.totalSeconds} onChange={this.HandlerVideoTimeLine} label="Select mp3 or mp4 file" ref={this.timeline} defaultValue='0' />

                            </div>

                        </div>
                    {/* )} */}
                </div>


                <div className="options">
                

                    <input type="file" name="content" id="content" label='Select mp3 or mp4 file' onChange={this.handleSelectFile} accept='video/mp4, audio/mp3' />

                    {this.state.fileLoad && (
                        
                        <div className="file_dv">

                            <GlobalHotKeys keyMap={this.shortcuts} handlers={this.short_actions} />

                            <form>
                                <div className="inputs_info_div">

                                    <div className="input_config_div">

                                        <label htmlFor="datasetName">Dataset name: </label>
                                        <input type="text" name="datasetName" id="datasetName" onChange={this.datasetName} required />

                                    </div>


                                    <div className="input_config_div">

                                        <label htmlFor="entities">Entities separated by commas: </label>
                                        <input type="text" name="entities" id="entities" onChange={this.datasetEntities} required />

                                    </div>
                                    
                                </div>
                                


                                <div className="select_entitie">

                                    {this.state.listEnt}

                                </div>

                                <div className="tools_div">


                                    {this.state.selecting ? (
                                        
                                        <button onClick={this.HandlerCreatePoint}>Create Point</button>
                                    
                                    ) : (
                                            
                                        <button onClick={this.HandlerStartPoint}>Start Point</button>
                                    )}

                                </div>
                                <textarea name="temp_point" id="temp_point" ref={this.tparea} value={this.state.tempPoint} readOnly ></textarea>
                                <textarea name="filesegments" id="filesegments" ref={this.filearea} defaultValue="Nothing Here. Start to config." >


                                </textarea>

                            </form>
                        </div>

                    )}


                </div>


            </div>
        )
    }
}
