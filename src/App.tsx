import React from "react";
import { Card } from "@mui/material";
import { Reveal } from "react-genie";
import { Animation } from 'react-genie-styled-components';

export const App = () => {
	return (
		<div>
			<Reveal animation={Animation.BounceInLeft}>
				<Card>Hola soy una card</Card>
			</Reveal>
		</div>
	);
};
