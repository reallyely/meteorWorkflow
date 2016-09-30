import { Meteor } from 'meteor/meteor';
import { ReactiveVar } from 'meteor/reactive-var';
import React from 'react';
import ReactDOM from 'react-dom';
import App from '../App';

// import './main.html';

Meteor.startup(()=> {

		ReactDOM.render(
		  <App />,
		  document.getElementById('root')
		);
})
