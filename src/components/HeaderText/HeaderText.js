import './HeaderText.css'
import { useState, Fragment } from 'react'

export default function HeaderText() {

    const [openThanks, setOpenThanks] = useState(true)


    return (
        <Fragment>

            {openThanks && (

                <div className="thanks_use_div">
        
                    <div className="text_div">
        
                        <div className="title_close_div">
        
                            <h2 className="title_header">Thanks to use AsegTool! 🌵</h2>
        
                            <div className="close_div">
        
                                <span class="material-symbols-outlined" onClick={() => {setOpenThanks(false)}}>
                                    close
                                </span>
        
                            </div>
        
                        </div>
        
        
                        <p className="text_header">
        
                        Hello dear AsegTool user. Opinions are VERY important, so if you have something to contribute to improve the tool, please contact me through one of my networks (preferably <a href="https://discord.gg/NGp9YbYJ8F" target="_blank" rel="noopener noreferrer">Discord</a>). 
        
                        AsegTool is a tool designed to generate a segmentation file that is usable within my other tool <a href="http://github.com/ElHaban3ro/TheWildTool" target="_blank" rel="noopener noreferrer">TheWildTool</a> (audio tool that serves among other things, to create datasets and audio segmentation). For now it is only possible to export in this format (.aseg, it is possible to open with the notes blog), but in the future it is possible that other export modalities will be added. Feedback is important, I said it, didn't I!
                        <br />
                        <br />
                        AsegTool v1.7
                        </p>
        
                    </div>
        
                </div>
                
            )}

        </Fragment>
    )
}