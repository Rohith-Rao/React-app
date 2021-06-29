import React,{useState} from 'react'
import './Start.css'
import Quiz from './Quiz'
function Start(){
    const topics = ['GK','Computers','Films','Celebs','Music']
    const [check,setcheck] = useState(false)
    const [topicname,settopic] = useState("")
    function clickhandle(name){
        setcheck(true)
        settopic(name)
    }
    return(
        <div>
            {check?( <Quiz topic={topicname}/>): (<>
            <h1 className="heading">Pick a topic and start quiz</h1>
            <div className="options"></div>
            {topics.map((item,index) =>(<button key={index} className="button" onClick={()=>clickhandle(item)}>{item}</button>))}
            </>)}
        </div>
    )
}
export default Start