import React from 'react';
import EventDao from '../dao/event-dao';
import EventDialog from './EventDialog';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import './css/calendar.css'

const WEEK_HEADER_ARR = ["Sun","Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

class Calendar extends React.Component {


    constructor(props) {
        super(props);
        this.eventDao = new EventDao();
    };

    componentWillMount(){
        var now = new Date();
        this.state = {
            year: this.props.year ? this.props.year : now.getFullYear(),
            month: this.props.month? this.props.month:  now.getMonth() + 1,
            date: this.props.date ? this.props.date : now.getDate(),
            eventDialogShow:false
        };
        this.eventDao.destroyDB()
            .then(this.loadAttendanceEvents.bind(this , this.state.year , this.state.month))
            .then(this.render.bind(this));
    };
    componentDidMount(){

    };
    /**
     * @param {int} fullYear
     * @param {int} month start from 1
     */
    buildMonthRowArr(fullYear, month) {
        var firstDate = new Date(fullYear + '/' + month + '/1');
        var lastDay = this.calculateDaysOfMonth(fullYear , month);
        var monthArr = [];
        for (var day = 1, columnIndex = firstDate.getDay() % 7, rowIndex = 0; day <= lastDay; day++) {
            if (!monthArr[rowIndex]) {
                monthArr[rowIndex] = [];
            }
            monthArr[rowIndex][columnIndex] = day;
            columnIndex = (++columnIndex) % 7;
            if (columnIndex === 0) {
                // new row;
                rowIndex++;
            }
            ;
        }
        // fill zero for empty value in row
        for (var rowIndex = 0; rowIndex < monthArr.length; rowIndex++) {
            for (var columnIndex = 0; columnIndex < 7; columnIndex++) {
                if (!monthArr[rowIndex][columnIndex]) {
                    monthArr[rowIndex][columnIndex] = 0;
                }
            }
        }
        return monthArr;
    };
    switch2Pre(){
        this.setState((prevState, props) => {
            if(prevState.month === 1){
                return {
                    month:12 ,
                    year:prevState.year-1,
                    eventsMapByDay:new Map()};
            }else{
                return {
                    month: prevState.month-1,
                    eventsMapByDay:new Map()};
            }
        } , function(){
            this.loadAttendanceEvents(this.state.year , this.state.month);
        }.bind(this));


    };

    switch2Next(){
        this.setState((prevState, props) => {
            if(prevState.month === 12){
                return {
                    month:1 ,
                    year:prevState.year+1,
                    eventsMapByDay:new Map()};
            }else{
                return {
                    month: prevState.month+1,
                    eventsMapByDay:new Map()};
            }
        }, function(){
            this.loadAttendanceEvents(this.state.year , this.state.month);
        }.bind(this));
    }

    /**
     *
     * @param {Array}eventArr
     * @return {Map<string , object>}
     */
    convertEventsArr2MapByDay(eventArr){
        var eventsMapByDay = new Map();
        eventArr.forEach(function(_event){
            /**
             * @type {EventDto}
             */
            var event = _event;
            var day = event.date.getDate();
            eventsMapByDay.has(day) || eventsMapByDay.set(day,[]);
            eventsMapByDay.get(day).push(event);
        },this);
        return eventsMapByDay;
    }

    loadAttendanceEvents(year , month){
        this.eventDao.getByMonth(year , month)
            .then(function(eventArr){
                if(!eventArr){
                    console.log('no event exists in current month');
                    return;
                }
                var eventsMapByDay = this.convertEventsArr2MapByDay(eventArr);
                this.setState({eventsMapByDay:eventsMapByDay})
            }.bind(this))
            .catch(function(err){
                alert(err);
            })

    }

    /**
     *
     * @param {number} year
     * @param {number} month
     * @return {number} how many does specified month have
     */
    calculateDaysOfMonth(year , month){
        var lastDate;
        if (month === 12) {
            lastDate = new Date();
            lastDate.setYear(year + 1);
            lastDate.setMonth(0);
            lastDate.setDate(0);
        } else {
            lastDate = new Date();
            lastDate.setYear(year);
            lastDate.setMonth(month);
            lastDate.setDate(0);
        }
        return lastDate.getDate();
    }
    handlerFloatingBtnClicke(e){
        this.setState({
            eventDialogShow:true
        })
    }
    /**
     *
     * @param year
     * @param month
     * @return {Promise}
     */
    prepareTestDate(year) {
        var testEventsArr = [];
        var sickRate = 0.2;
        for (var month = 1; month <= 12; month++) {
            var days = this.calculateDaysOfMonth(year, month);
            for (var i = 1; i <= days; i++) {
                if (Math.random() < 0.2) {
                    console.log('be absent on ' + year + '年' + month + '月' + (i + 1) + '日');
                    continue;
                }
                var date = new Date();
                date.setYear(year);
                date.setMonth(month - 1);
                date.setDate(i);
                if (date.getDay() === 6 || date.getDay()=== 0) {
                    // weekends
                    continue;
                }
                /**
                 *
                 * @type {EventDto}
                 */
                var startWorkEvent = {};
                date.setHours(6 + Math.random() * 6);
                startWorkEvent._id = date.getTime() + Math.floor(100000 * Math.random()) + '';
                startWorkEvent.date = date;
                startWorkEvent.description = 'start work';
                testEventsArr.push(startWorkEvent);

                /**
                 *
                 * @type {EventDto}
                 */
                var endWorkEvent = {};
                var endDate = new Date();
                endDate.setYear(year);
                endDate.setMonth(month - 1);
                endDate.setDate(i);
                endDate.setHours(18 + Math.random() * 6);
                endWorkEvent._id = endDate.getTime() + Math.floor(100000 * Math.random()) + '';
                endWorkEvent.date = endDate;
                endWorkEvent.description = 'end work';
                testEventsArr.push(endWorkEvent);
            }
        }
        return this.eventDao.saveBatch(testEventsArr)
            .then(function (result) {
                console.log(result);
            }.bind(this));
    }

    /**
     *
     * @param event
     */
    handleEventDialogSubmit(event){

    }

    render() {
        var monthArr = this.buildMonthRowArr(this.state.year, this.state.month);
        let {
            /** @type {Map.<string, Array.<EventDto>>} */
            eventsMapByDay,
            /** @type {{date:date , description:string}} */
            selectedEvent,
            /** @type {boolean} */
            eventDialogShow
        } = this.state.eventsMapByDay;
        return (
            <div className="calendar">
                <div className="calendar-header">
                    <div id="calendar-switch-left" className="button circle" onClick={this.switch2Pre.bind(this)}><i className="material-icons">keyboard_arrow_left</i></div>
                    <div className="calendar-title" >{this.state.year + '年' + this.state.month + '月'}</div>
                    <div id="calendar-switch-right" className="button circle" onClick={this.switch2Next.bind(this)}><i className="material-icons">keyboard_arrow_right</i></div>
                </div>
                <div className="calendar-container ">
                    <div className="calendar-header-container">
                        {WEEK_HEADER_ARR.map(function (header) {
                            return (<div key={'header-' + header} className="calendar-header-cell">{header}</div>)
                        })}
                    </div>
                    <div className="calendar-date-container">
                        {monthArr.map(function (row , index) {
                            return (
                                <div key={'row-'+index} className="calendar-row ">
                                    {row.map(function (day , index) {
                                        return (
                                            <div key={'day-'+index} className={"calendar-cell " + (day === 0 ? 'calendar-cell-empty' : '')}>
                                                <div className="calendar-cell-date">{day === 0 ? '' : day}</div>
                                                {eventsMapByDay && eventsMapByDay.has(day) && <div className="calendar-cell-event-list">
                                                    {eventsMapByDay.get(day).map(function(/**@type {EvenDto} */ eventDto){
                                                        return (<div className="calendar-cell-event">
                                                            <div className="calendar-cell-event-time">{eventDto.date.toLocaleTimeString()}</div>
                                                            <div className="calendar-cell-event-description">{eventDto.description}</div>
                                                        </div>)
                                                    })}
                                                </div>}
                                            </div>
                                        )
                                    })}
                                </div>
                            )
                        })}
                    </div>
                </div>
                <EventDialog show={eventDialogShow} event={selectedEvent} handleSubmit={this.handleEventDialogSubmit.bind(this)}/>
                <FloatingActionButton onClick={this.handlerFloatingBtnClicke.bind(this)}>
                    <ContentAdd />
                </FloatingActionButton>
            </div>)
    }

}
Calendar.defaultProps = {
  eventDialog:{
      show:false,
      event:undefined
  }
};
export default Calendar;
