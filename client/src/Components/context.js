
import React from "react";
import { UserContext } from "react";


const Route = ReactRouterDOM.Route;
const Link = ReactRouterDOM.Link;
const HashRouter = ReactRouterDOM.HashRouter;
const UserContext = React.createContext(null);

function Card(props) {
	function classes() {
		const bg = props.bgcolor ? " bg-" + props.bgcolor : " ";
		const txt = props.txtcolor ? " text-" + props.txtcolor : " text-white";
		return "card mb-3 " + bg + txt;
	}

	return (
		<div className={classes()} style={{ maxWidth: "50em" }}>
			<div className='row no-gutters'>
				<div className='col-md-4'>
					<img
						className='img-fluid'
						src='badpig.png'
						alt='better bank pig logo'
					/>
				</div>
				<div className='col-md-8'>
					<div className='card-body'>
						{props.title && <h5 className='card-title'>{props.title}</h5>}
						{props.text && <p className='card-text'>{props.text}</p>}
						{props.body}
						{props.status && <div id='createStatus'>{props.status}</div>}
					</div>
				</div>
			</div>
		</div>
	);
}


export default UserContext; Card;