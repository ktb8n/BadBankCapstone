function Login() {
	const [show, setShow]         = React.useState(true);
	const [status, setStatus]     = React.useState("");
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [msg, setMsg]           = React.useState("");
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
			{loggedIn ? <h2> Welcome, {user}</h2> : <h2></h2>}
			<button
				type='submit'
				className='btn btn-light'
				onClick={() => props.setShow(true)}
			>
				Authenticate again
			</button>
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

		//////////////////////////////////////
		//FIREBASE AUTH ATTEMPT
		///////////////////////////////

	// 	const auth = firebase.auth();
	// 	const promise = auth.signInWithEmailAndPassword(email, password);
	// 	firebase.auth().onAuthStateChanged((firebaseUser) => {
	// 		if (firebaseUser) {
	// 			console.log("firebase authorization for...");
	// 			console.log(firebaseUser);

	// 			fetch(`/account/login/${email}/${password}`)
	// 				.then((response) => response.text())
	// 				.then((text) => {
	// 					try {
	// 						const data = JSON.parse(text);
	// 						setShow(false);
	// 						ctx.user = data.name;
	// 						ctx.email = data.email;
	// 						setStatus(`welcome ${ctx.user}`);
	// 					} catch {
	// 						setShow(false);
	// 					}
	// 				});
	// 		} else {
	// 			setStatus(
	// 				"Unable to Authorize your account. Please create an account to get started"
	// 			);
	// 			setTimeout(() => setStatus(""), 25000);
	// 		}
	// 	});
	// 	promise.catch((e) => {
	// 		console.log("womp womp woooooommmp. authorization error catch");
	// 	});
	// }

  //////////////////////////////////////
//STARTER FILE CODE
  ///////////////////////////////

	  fetch(`/account/login/${email}/${password}`)
	  .then(response => response.text())
	  .then(text => {
	      try {
	          const data = JSON.parse(text);
	          props.setStatus('');
	          props.setShow(false);
            setLoggedIn(true);
            setUser(data.name);
            ctx.user = data.name;
            ctx.email = data.email;
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