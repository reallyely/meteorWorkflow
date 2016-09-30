import React from 'react';
import TaskCard from './TaskCard'

const ActiveTask = ({task}) => {
	if (task) {
		return (
			<div style={{border:"medium dashed red", margin:"50px"}}>
				<TaskCard isActive={true} task={task} />
			</div>
		)
	} else {
			return null;
	}
}


ActiveTask.propTypes = {
	task: React.PropTypes.object
};

export default ActiveTask;
