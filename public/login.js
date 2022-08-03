function Login() {
	const [show, setShow]         = React.useState(true);
	const [status, setStatus]     = React.useState("");
 	const [loggedIn, setLoggedIn] = React.useState();
 	const [user, setUser]         = React.useState("");
	const ctx                     = React.useContext(UserContext);

  

	return (
		<>
			<Card
				bgcolor='secondary'
				header='Login'
				status={status}
				body={
					show ? (
						<LoginForm setShow={setShow} setStatus={setStatus} />
					) : (
						<LoginMsg setShow={setShow} setStatus={setStatus} />
					)
				}
			/>
		</>
	);


function LoginMsg(props) {
	return (
		<>
			{loggedIn ? (
				<div>
					<h2> Welcome, {user} ! </h2>{" "}
					<h6>What would you like to do:</h6>
				</div>
			) : (
				<h2></h2>
			)}
			<div className='welcomeButton'>
				<a href='/#balance/'>
					<button className='btn btn-info'>Check Balance</button>
				</a>
			</div>
			<div className='welcomeButton'>
				<a href='/#withdraw/'>
					<button className='btn btn-success'>Withdraw</button>
				</a>
			</div>
			<div className='welcomeButton'>
				<a href='/#deposit/'>
					<button className='btn btn-warning'>Deposit</button>
				</a>
			</div>
		</>
	);
}

function LoginForm(props) {
	const [email, setEmail] = React.useState("");
	const [password, setPassword] = React.useState("");
	//const [name, setName] = React.useState("");

	function handle() {
		if (!validateUser(email, "email")) return;
		if (!validateUser(password, "password")) return;


	  fetch(`/account/login/${email}/${password}`)
	  .then(response => response.text())
	  .then(text => {
	      try {
	          const data = JSON.parse(text);
	          props.setStatus('');
	          props.setShow(false);
			  ctx.setUser(data);
            setLoggedIn(true);
            setUser(data.name);
            ctx.user = data.name;
            ctx.email = data.email;
			ctx.balance = data.balance;
	          console.log('JSON:', data);
	      } catch(err) {
	          props.setStatus(text)
	          console.log('err:', text);
	      }
	  });
	}


	return (
		<>
			<h2>Login to your Account</h2>
			Email
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
				Login
			</button>
		</>
	);
  
  	function validateUser(field, label) {
			if (!field) {
				setStatus("Eeep! You've got to enter your " + label + " to login!");
				setTimeout(() => setStatus(""), 2500);
				return false;
			}
			return true;
		}
}
}