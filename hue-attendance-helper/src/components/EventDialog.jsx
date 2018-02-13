/**
 * Created by bolan on 2017/12/20.
 */
import React from 'react';
import TextField from 'material-ui/TextField';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import Moment from "moment";

import './css/EventDialog.css';

const TIME_FORMAT = 'HH:mm';
const DATE_FORMAT = 'YYYY-MM-DD';

class EventDialog extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            show:false
        };
    };

    componentWillReceiveProps(nextProps){
        if(nextProps !== this.props){
            var eventDate = nextProps.event.date || new Date();
            var eventDateM = Moment(eventDate);
            this.setState({
                date:eventDateM.format(DATE_FORMAT),
                time:eventDateM.format(TIME_FORMAT),
                description:nextProps.event.description
            });
        }
    }
    componentWillMount() {
    };

    componentDidMount() {
    };

    handleBasicInputChange(e) {
        var inputObject = {};
        inputObject[e.target.name] = e.target.value;
        this.setState(inputObject);
    }

    handleAddBtnClick(e) {
        let {handleSubmit} = this.props;
        if (handleSubmit) {
            var date = new Date(this.state.date);
            if(this.state.time){
                let timeM = Moment(this.state.time , TIME_FORMAT);
                date.setHours(timeM.hours());
                date.setMinutes(timeM.minutes());
            }
            handleSubmit({
                date: date,
                description: this.state.description
            })
        }
    }


    render() {
        const actions = [
            <FlatButton
                label="Cancel"
                primary={true}
                onClick={this.props.onRequestClose}
            />,
            <FlatButton
                label="Submit"
                primary={true}
                keyboardFocused={true}
                onClick={this.handleAddBtnClick.bind(this)}
            />,
        ];
        const isNew = this.props.event === null || this.props.event._id == null;
        return (
            <Dialog
                title={isNew ? "Create New Event" : "Event  Dialog"}
                actions={actions}
                modal={true}
                open={this.props.show}
                onRequestClose={this.props.onRequestClose}>
                <div className="event-dialog-form">
                    <div className="input-form-line">
                        <TextField name='date' type="date" floatingLabelText="Date" value={this.state.date}
                                   onChange={this.handleBasicInputChange.bind(this)}/></div>
                    <div className="input-form-line">
                        <TextField name='time' type="time" floatingLabelText="Time"  floatingLabelFixed={true} value={this.state.time}
                                   onChange={this.handleBasicInputChange.bind(this)}/></div>
                    <div className="input-form-line">
                        <TextField type="text" name="description" floatingLabelText='Description'
                                   value={this.state.description}
                                   onChange={this.handleBasicInputChange.bind(this)}/></div>
                </div>
            </Dialog>
        )
    };
}
EventDialog.defaultProps = {
    event: {
        date: null,
        description: ''
    },
    show: false
};
export default EventDialog;