import React from 'react';
import moment from 'moment';
import { Flex, Box} from 'reflexbox';
import { Tabs, Tab } from 'material-ui/Tabs';
import { HotKeys } from 'react-hotkeys';

const styles = {
	isToday: {color: 'red'}
}

function calculateSelectedDay(selectedIndex, today) {
	return today - selectedIndex
}

class DayPicker extends React.Component {
	constructor(props) {
		super(props);
		const thisMoment = moment()

		this.state = {
			activeIndex: this.props.todayDay,
			pickerFocused: false,
			activeMoment: thisMoment
		}

		this.focusedHandler = {
			'focusDayPicker': (event) => {
				event.repeat || this._handlePickerFocus();
			},
			'unFocusDayPicker': (event) => {
				this.state.pickerFocused && this._handlePickerUnFocus(event);
			},
			'prevDay': () => {
				if (this.state.activeIndex > 0) this._handlePrevDay();
			},
			'nextDay': () => {
				if (this.state.activeIndex < 6) this._handleNextDay();
			},
			'prevWeek': () => {
				this.setState({
					activeMoment: this.state.activeMoment.subtract(1, 'week')
				})
			},
			'nextWeek': () => {
				this.setState({
					activeMoment: this.state.activeMoment.add(1, 'week')
				});
			},
			'resetDay': () => {
				this.setState({
					activeMoment: moment(),
					activeIndex: this.props.todayDay
				})
			}
		}

		this.keyMap = {
			prevDay: 'ctrl+shift+left',
			nextDay: 'ctrl+shift+right',
			prevWeek: 'ctrl+shift+up',
			nextWeek: 'ctrl+shift+down',
			resetDay: 'ctrl+shift+space'
		}

		// this._handleChange = this._handleChange.bind(this)
		this._handlePickerFocus = this._handlePickerFocus.bind(this)
		this._handlePickerUnFocus = this._handlePickerUnFocus.bind(this)
		this._handlePrevDay = this._handlePrevDay.bind(this)
		this._handleNextDay = this._handleNextDay.bind(this)
	}
	_handlePickerFocus() {
		// focus wednesday
		this.setState({
			pickerFocused: true,
			activeIndex: 3,
			activeMoment: this.state.activeMoment.day(3)
		});
	}
	_handlePickerUnFocus(event) {
		this.setState({pickerFocused: false});
	}
	_handlePrevDay() {
		this.setState({
			activeIndex: this.state.activeIndex - 1,
			activeMoment: this.state.activeMoment.subtract(1, 'day')
		});
	}
	_handleNextDay() {
		this.setState({
			activeIndex: this.state.activeIndex + 1,
			activeMoment: this.state.activeMoment.add(1, 'day')
		});
	}
	// _handleClickDay(e) {
	// 	console.log(e);
	// 	this.setState({
	// 		activeIndex: e.target.value,
	// 		activeMoment: this.state.activeMoment.day(e.target.value)
	// 	})
	// 	onClick={(e) => {this._handleClickDay(e)}}
	//
	// }

	render() {
		return (
			<HotKeys keyMap={this.keyMap} handlers={this.focusedHandler}>
				<Tabs
					value={this.state.activeIndex}
					initialSelectedIndex={this.props.todayDay}
				>
					{this.props.daysOfTheWeek.map((day, i) => {
						return (
							<Tab key={day}
								label={day}
								value={i}
								style={this.props.todayDay === i ? styles.isToday : null}
							>
							</Tab>
						)
					})}
				</Tabs>
				<Box>
					<h2>{this.state.activeMoment.calendar()}</h2>
					{this.props.children}
				</Box>
			</HotKeys>
		);
	}
}

DayPicker.defaultProps = {
	daysOfTheWeek: moment.weekdays(),
	todayDay: moment().day()
}

export default DayPicker;
