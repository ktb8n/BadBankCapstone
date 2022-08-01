function Login() {
	const [show, setShow] = React.useState(true);
	const [status, setStatus] = React.useState("");
	const ctx = React.useContext(UserContext);

	return (
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
	);
}

function LoginMsg(props) {
	return (
		<>
			<h5>Success</h5>
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

		const auth = firebase.auth();
		const promise = auth.signInWithEmailAndPassword(email, password);
		firebase.auth().onAuthStateChanged((firebaseUser) => {
			if (firebaseUser) {
				console.log("firebase authorization for...");
				console.log(firebaseUser);

				fetch(`/account/login/${email}/${password}`)
					.then((response) => response.text())
					.then((text) => {
						try {
							const data = JSON.parse(text);
							setShow(false);
							ctx.user = data.name;
							ctx.email = data.email;
							setStatus(`welcome ${ctx.user}`);
						} catch {
							setShow(false);
						}
					});
			} else {
				setStatus(
					"Unable to Authorize your account. Please create an account to get started"
				);
				setTimeout(() => setStatus(""), 25000);
			}
		});
		promise.catch((e) => {
			console.log("womp womp woooooommmp. authorization error catch");
		});
	}
	//   fetch(`/account/login/${email}/${password}`)
	//   .then(response => response.text())
	//   .then(text => {
	//       try {
	//           const data = JSON.parse(text);
	//           props.setStatus('');
	//           props.setShow(false);
	//           console.log('JSON:', data);
	//       } catch(err) {
	//           props.setStatus(text)
	//           console.log('err:', text);
	//       }
	//   });
	// }
	function validateUser(field, label) {
		if (!field) {
			setStatus("Eeep! You've got to enter your " + label + " to login!");
			setTimeout(() => setStatus(""), 2500);
			return false;
		}
		return true;
	}

	return (
		<>
			<h3>Login in to access your account</h3>
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
}
