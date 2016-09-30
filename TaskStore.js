import { EventEmitter } from 'events';
import data from './data'

const emitter = new EventEmitter();
let activeTask = {}
const TaskStore = {
	getTasks() {
		return data.concat()
	},
	getActiveTask() {
		return activeTask;
	},
	subscribe(callback) {
		emitter.on('startTimer', callback);
		emitter.on('stopTimer', callback);
	},

	unsubscribe(callback) {
		emitter.off('startTimer', callback);
		emitter.off('stopTimer', callback);
	},
	startTimer(task, subTask) {
		// set active task & subTask
		activeTask = task;
		emitter.emit('startTimer');
		// begin timer
		// TODO: if a different task is already active, deactivate that one and activate this one
	},
	stopTimer(task, subTask, timeLogged) {
		// deactivate task
		// add total time from start to stop
		activeTask = undefined;
		emitter.emit('stopTimer');
	},
}

export default TaskStore;

// trigger timer -> Set Subtaks starts logging timer
// activeTask is placed in ActiveTask container
//
