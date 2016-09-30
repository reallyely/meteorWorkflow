import React from 'react';
import Timer from 'material-ui/svg-icons/image/timer'
import TimerOff from 'material-ui/svg-icons/image/timer-off'
import moment from 'moment'
import { Flex, Grid } from 'reflexbox'

const SubTask = ({subTask, onStart, onStop, isActive}) => {
	let timeLogged = moment.duration(subTask.timeLogged, 'seconds')

	return (
		<Flex key={subTask.subTask}>
			<Grid col={8} px={2} align="middle">
				{`${subTask.subTask}: ${subTask.type} - ${subTask.status}`}
			</Grid>
			<Grid col={4} px={2}>
				{isActive ? 
						<TimerOff id={subTask.subTask} onClick={onStop} hoverColor="red"/>
					: <Timer id={subTask.subTask} onClick={onStart} hoverColor="red" />
				}
				<span>{`${timeLogged.hours()}:${timeLogged.minutes()}`}</span>
			</Grid>
		</Flex>
	)
};

SubTask.propTypes = {
	subTask: React.PropTypes.object
};

export default SubTask;
