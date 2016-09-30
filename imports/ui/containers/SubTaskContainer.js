import React from 'react';
import SubTask from '../components/SubTask'
import TaskStore from '../../../TaskStore'

export default React.createClass({
	getDefaultProps() {
		return {
			subTasks: []
		};
	},
	handleStartTimer(event) {
		TaskStore.startTimer(this.props.parentTask, this.props.subTasks)
	},
	handleStopTimer(event) {
		TaskStore.stopTimer(this.props.parentTask, this.props.subTasks)
	},
	render() {
		return (
			<div>
				{
					this.props.subTasks.map(subTask => {
						return (
							<SubTask
								key={subTask.subTask}
								parentTask={this.props.parentTask}
								subTask={subTask}
								onStart={this.handleStartTimer}
								onStop={this.handleStopTimer}
								isActive={this.props.isActive}/>
						)
					})
				}
			</div>
		);
	}

});
// update store with this subtask's logged time.
// signal that this subtask is Active

// when timer stops, update task.subtask.timeLogged

// when timer is started, clear all other tasks from container or make them unusable
