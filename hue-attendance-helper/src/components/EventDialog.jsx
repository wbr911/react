/**
 * Created by bolan on 2017/12/20.
 */
import React from 'react';
import './css/EventDialog.css';

class EventDialog extends React.Component {
    constructor(props){
        super(props);
        this.state = [...this.props.event];
    };
    componentWillMount(){};
    componentDidMount(){};

    handleBasicInputChange(e){
        var inputObject = {};
        inputObject[e.target.name] = e.target.value;
        this.setState(inputObject);
    }
    handleAddBtnClick(e){
        let {handleSubmit} = this.props;
        if(handleSubmit){
            handleSubmit({
                date:this.state.date,
                description:this.state.description
            })
        }
    }
    handleCloseBtnClick(e){

    }
    render(){
      return (
        <div className={"event-dialog " + this.props.show?'':'hide ' } >
            <div className="event-dialog-overlay">
                <div className="event-dialog-box">
                    <div className="event-dialog-header">
                        <div className="event-dialog-title">Event Dialog</div>
                        <div className="event-dialog-tool-room">
                            <div id="event-dialog-close-btn" className="button circle" onClick={this.handleCloseBtnClick.bind(this)}><i className="material-icons">close</i></div>
                        </div>
                    </div>
                    <div className="event-dialog-content">
                        <div className="event-dialog-form">
                            <input type="text" name="date" value={this.state.date} onChange={this.handleBasicInputChange.bind(this)}/>
                            <input type="text" name="description" value={this.state.description} onChange={this.handleBasicInputChange.bind(this)}/>
                            <button type="button" onClick={this.handleAddBtnClick.bind(this)}>Add</button>
                        </div>
                    </div>
                </div>
            </div>

        </div>
      )
    };
}
EventDialog.defaultProps = {
  event:{
      date:Date.now(),
      description:''
  }
};