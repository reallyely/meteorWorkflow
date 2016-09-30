import React from 'react';
import {Card, CardHeader, CardText} from 'material-ui/Card';
import SubTaskContainer from '../containers/SubTaskContainer'
import moment from 'moment'

import BugReport from 'material-ui/svg-icons/action/bug-report'
import QuestionAnswer from 'material-ui/svg-icons/action/question-answer'
import NoteAdd from 'material-ui/svg-icons/action/note-add'


// when a task is selected, update parent as to what curent context is
// we'll need to get scroll position
// modify style to highlight Card
const styles = {
	isFocused: {
		border: 'thin dotted red',
	},
	default: {margin:'10px'}
}


const TaskCard = ({task, isActive, style, isFocused}) => {
	const timeLogged = moment.duration(task.timeLogged, 'seconds')

		if (isActive) {
			return (
				<Card
					style={isFocused ? styles.isFocused : styles.default}
				>

					<CardHeader
						title={<strong>{task.task}: {task.title}</strong>}
						subtitle={task.type}
						avatar={
							task.type.match('New Requirement') ? <NoteAdd color="blue"/> :
							task.type.match('Defect') ? <BugReport color="red"/> :
							task.type.match('Consultation') ? <QuestionAnswer color="orange"/> :
							null
						}>
						Time Spent: {timeLogged.humanize()}
					</CardHeader>
					<CardText>
						<div>
							<p>
								{task.description}
							</p>
							<SubTaskContainer parentTask={task} subTasks={task.subTasks}/>
						</div>
					</CardText>
				</Card>
			)
		} else {
			return null;
		}
};

TaskCard.propTypes = {
	task: React.PropTypes.object
};

export default TaskCard;
