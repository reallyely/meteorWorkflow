import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import React from 'react';
import data from './data.js';
import TaskContainer from './imports/ui/containers/TaskContainer';
import DayPicker from './imports/ui/containers/DayPicker';
import { HotKeys } from 'react-hotkeys';
// TODO: Add hotkeys provider for global state (/)
// focusDayPicker: 'ctrl+shift', (/)
// focusFocusedTask: 'enter',
// prevTask: up
// nextTask: down

const keyMap = {
	'focusDayPicker': [
		{sequence: 'shift+ctrl', action: 'keydown'},
		{sequence: 'ctrl+shift', action: 'keydown'}
	],
	'unFocusDayPicker': [
		{sequence: 'shift', action: 'keyup'},
		{sequence: 'ctrl', action: 'keyup'}
	],
	'focusSearch': 'ctrl+space'
}

const App = () => (
  <MuiThemeProvider>
		<HotKeys keyMap={keyMap}>
			<DayPicker>
				<TaskContainer tasks={data} />
			</DayPicker>
		</HotKeys>
  </MuiThemeProvider>
);

export default App;
