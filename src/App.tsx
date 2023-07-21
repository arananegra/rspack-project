import React from 'react';
import classes from './app-test.scss';
import { ToastContainer, toast } from 'react-toastify';

function App() {
	React.useEffect(() => {
		toast.success('hola');
	}, []);
	return (
		<div>
			<ToastContainer />
			<h1 className={classes.labelTestClass}>test font</h1>
		</div>
	);
}

export default App;
