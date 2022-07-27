//import logo from './images/badPig.png';

import "bootstrap/dist/css/bootstrap.min.css";
import AllData from "./Components/alldata";
import CreateAccount from "./Components/createaccount";
import Deposit from "./Components/deposit";
import Home from "./Components/home";
import Login from "./Components/login";
import NavBar from "./Components/navbar";
import Withdraw from "./Components/withdraw";
import React from "react";
import { UserContext } from "./Components/context";
import { HashRouter, Routes, Route } from "react-router-dom";

function App() {
	return (
		<HashRouter>
			<NavBar />
			<UserContext.Provider
				value={{
					users: [
						{
							name: "Porky",
							email: "PorkythePig@mit.edu",
							password: "bacon",
							balance: 400,
							history: [],
						},
					],
				}}
			>
				<div className='container' style={{ padding: "20px" }}>
					<Routes>
						<Route path='/' exact element={<Home />} />
						<Route path='/createaccount/' element={<CreateAccount />} />
						<Route path='/login/' element={<Login />} />
						<Route path='/deposit/' element={<Deposit />} />
						<Route path='/withdraw/' element={<Withdraw />} />
						<Route path='/alldata/' element={<AllData />} />
					</Routes>
				</div>
			</UserContext.Provider>
		</HashRouter>
	);
}
export default App;
