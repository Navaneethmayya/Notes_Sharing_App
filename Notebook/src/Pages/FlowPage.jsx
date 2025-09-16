import React from 'react'
import Flow from '../Components/GraphFolderStruture/Flow'
import Dark_light from '../Components/dark_light_switch/Dark_light'
import "../App.css"
function FlowPage () {
  return (
    <div className='flow_root' style={{ height: 600,width:1000}}>
        <Flow/>
        <Dark_light/>
    </div>
  )
}

export default FlowPage 