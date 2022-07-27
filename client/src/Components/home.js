import React from "react";
import {Card} from "./context";

function Home() {
	return (
		<Card
			txtcolor='black'
			header='Better Banking LLC'
			title='Welcome!'
			text='You can move around using the navigation bar.'
		/>
	);
}

export default Home;

//body={(<img src="" className="img-fluid" alt="Responsive image"/>)}
