import Pics from '../homescreencomponents/Pics'
import React from 'react'
import JoinGame from './joingame'
import ChessGameWrapper from '../poker/ui/pokergame'
import '../homescreen.css'
/**
 * Onboard is where we create the game room.
 */

class JoinRoom extends React.Component {
    state = {
        didGetUserName: false,
        inputText: ""
    }

    constructor(props) {
        super(props);
        this.textArea = React.createRef();
    }

    typingUserName = () => {
        // grab the input text from the field from the DOM 
        const typedText = this.textArea.current.value
        
        // set the state with that text
        this.setState({
            inputText: typedText
        })
    }

    render() {
    
        return (<React.Fragment>
            {
                this.state.didGetUserName ? 
                <React.Fragment>
                    <JoinGame userName = {this.state.inputText} isCreator = {false}/>
                    <ChessGameWrapper myUserName = {this.state.inputText}/>
                </React.Fragment>
            :
            <>
            <Pics/>
            <div className = 'container'>
               <div className = 'menu'>
                    <h1>Let's Play Some Poker!</h1>
                    <h1 className = 'f0nt'>Your Username:</h1>

                    <input className = 'f0nt, butt0n' 
                           ref = {this.textArea}
                           onInput = {this.typingUserName}></input>
                           
                    <button className="butt0n" 
                        //style = {{marginLeft: String((window.innerWidth / 2) - 60) + "px", width: "120px", marginTop: "62px"}} 
                        disabled = {!(this.state.inputText.length > 0)} 
                        onClick = {() => {
                            // When the 'Submit' button gets pressed from the username screen,
                            // We should send a request to the server to create a new room with
                            // the uuid we generate here.
                            this.setState({
                                didGetUserName: true
                            })
                        }}>Submit</button>
                </div>
                </div>
                </>
            }
            </React.Fragment>)
    }
}

export default JoinRoom