function CreateAccount() {
	const [show, setShow] = React.useState(true);
	const [status, setStatus] = React.useState("");
	const [user, setUser]     = React.useState("")

	return (
		<Card
			bgcolor='primary'
			header='Create Account'
			status={status}
			body={
				show ? (
					<CreateForm setShow={setShow} />
				) : (
					<CreateMsg setShow={setShow} />
				)
			}
		/>
	);

	function CreateMsg(props) {
		return (
			<>
				<h5>Success</h5>
				<a href='#/login/'>
					<button
						type='submit'
						className='btn btn-light'
						
					>
						Login 
					</button>
				</a>
				{/* <button onClick={component={Login}}>
				Login
			</button> */}
			</>
		);
	}

	function CreateForm(props) {
		const [name, setName] = React.useState("");
		const [email, setEmail] = React.useState("");
		const [password, setPassword] = React.useState("");

		function handle() {
			console.log("create account initiated");
			if (!createValidation(name, "name")) return;
			if (!createValidation(email, "email")) return;
			if (!createValidation(password, "password")) return;

			//authorization??

			const url = `/account/create/${name}/${email}/${password}`;
			(async () => {
				var res = await fetch(url);
				var data = await res.json();
				console.log(data);
			})();
			props.setShow(false);
		}

		return (
			<>
      <h2>Create Account</h2>
				Name
				<br />
				<input
					type='input'
					className='form-control'
					placeholder='Enter name'
					value={name}
					onChange={(e) => setName(e.currentTarget.value)}
				/>
				<br />
				Email address
				<br />
				<input
					type='input'
					className='form-control'
					placeholder='Enter email'
					value={email}
					onChange={(e) => setEmail(e.currentTarget.value)}
				/>
				<br />
				Password
				<br />
				<input
					type='password'
					className='form-control'
					placeholder='Enter password'
					value={password}
					onChange={(e) => setPassword(e.currentTarget.value)}
				/>
				<br />
				<button type='submit' className='btn btn-light' onClick={handle}>
					Create Account
				</button>
			</>
		);
	}

	function createValidation(field, label) {
		if (!field) {
			setStatus("Whoopsies: " + label + " is mandatory");
			return false;
		}
		if (label === "password" && field.length < 5) {
			setStatus("Yikes! Your " + label + " must be longer than 5 characters");
			return false;
		}
		return true;
	}
}
