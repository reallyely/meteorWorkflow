import React from 'react'
import ReactDOM from 'react-dom'
import TaskCard from '../components/TaskCard';
import ActiveTask from '../components/ActiveTask';

import TaskStore from '../../../TaskStore';

import { HotKeys } from 'react-hotkeys';
import _ from 'lodash';
import { Element, scroller, animateScroll } from 'react-scroll';

import { Toolbar, ToolbarGroup } from 'material-ui/Toolbar';
import TextField from 'material-ui/TextField'
import Search from 'material-ui/svg-icons/action/search';


export default React.createClass({
	propTypes: {
		tasks: React.PropTypes.array
	},
	getDefaultProps() {
		return {
			tasks: []
		};
	},
	getInitialState() {
		return {
			filteredTasks: this.props.tasks,
			activeTask: undefined,
			focusedIndex: 0
		};
	},
	componentWillMount() {
		TaskStore.subscribe(this.updateActiveTask);
	},
	componentDidMount() {
		this.focusSearch();
	},
	focusSearch() {
		this.refs.searchInput.focus();
		animateScroll.scrollToTop({smooth:true})
	},
	updateActiveTask(task) {
		this.setState({
			activeTask: TaskStore.getActiveTask()
		});
	},
	updateSelectedTask(task) {
		this.state.focusedIndex === task
	},
	focusNextTask() {
		this.setState({
			focusedIndex: this.state.focusedIndex + 1
		});

		if (this.state.focusedIndex === 0) {
			animateScroll.scrollToTop({smooth:true})
		} else {
			scroller.scrollTo(`task-${this.state.focusedIndex}`);
		}
	},
	focusPreviousTask() {
		this.setState({
			focusedIndex: this.state.focusedIndex - 1
		});
		if (this.state.focusedIndex === 0) {
			animateScroll.scrollToTop({smooth:true})
		} else {
			scroller.scrollTo(`task-${this.state.focusedIndex}`);
		}
	},

	filterTasks (event) {
		const filterText = event.target.value
		const reg = new RegExp(`\\b${filterText}.*\\b`, "gi")

		const filtered = this.props.tasks.filter(task => {
			return _.find(task, function(o) {
				if (filterText) {
					if (typeof o === 'string') {
						return o.search(reg) > -1;
					}
				} else {
					return true;
				}
			})
		});

		this.setState({
			focusedIndex: 0,
			filteredTasks: filtered
		})
	},
// when navigating tasks with Up and DOWN, manipulate the scroll position as well
	render() {
		const keyHandler = {
			'focusSearch': () => {this.focusSearch();},
			'nextTask': (event) => {
				event.preventDefault();
				this.focusNextTask();
			},
			'prevTask': (event) => {
				event.preventDefault();
				this.focusPreviousTask();
			},
			'selectTask': () => {
				event.preventDefault();
				this.selectTask();
				console.log('selectTask');
			}
		};
		const keyMap = {
			'nextTask': 'down',
			'prevTask': 'up',
			'selectTask': 'enter',
		}
		return (
			<HotKeys keyMap={keyMap} handlers={keyHandler} >
				<div>
					<Element name='searchBar'>
						<Toolbar>
						<ToolbarGroup style={{width:'100%'}} >
								<TextField
								ref="searchInput"
								hintText={<Search />}
								fullWidth={true}
								onChange={(event) => {this.filterTasks(event)}}
								/>
							</ToolbarGroup>
						</Toolbar>
					</Element>
					<ActiveTask task={this.state.activeTask}/>
					<div style={{margin:'30px', padding: '30px'}}>
						{
							this.state.filteredTasks.map((task, i) => {
								return (
								<Element key={task.task} name={`task-${i}`}>
									<TaskCard
										task={task}
										value={task.task}
										key={task.task}
										isActive={!this.state.activeTask}
										onActive={this.handleActive}
										isFocused={this.state.focusedIndex === i}
									/>
								</Element>
								);
							})
						}
					</div>
				</div>
			</HotKeys>
		)
	}
});
// pass this.props.activeTask to <ActiveTask />

// total num filteredTasks
