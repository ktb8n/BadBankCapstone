function Balance() {
	const [show, setShow] = React.useState(true);
	const [status, setStatus] = React.useState("");
  const [user, setUser] = React.useState("");
  const ctx = React.useContext(UserContext);
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [balance, setBalance]   = React.useState("");


	return (
    <>	{
		loggedIn ? <h2> Welcome, {user}</h2> : <h2></h2>
	}
		<Card
			bgcolor='info'
			header='Balance'
			status={status}
			body={
				show ? (
					<BalanceForm setShow={setShow} setStatus={setStatus} />
				) : (
					<BalanceMsg setShow={setShow} setStatus={setStatus} />
				)
			}
		/>
    </>
	);


function validateEntry() {
  if (!loggedIn) {
    console.log("validating...");
    setStatus("Please login to check your balance.");
    setShow(true);
    return false;
  }
  return true;
}


function BalanceMsg(props) {
	return (
		<>
			{loggedIn ? <h5>{balance}</h5> : <h5>Not Logged In</h5>}
			<button
				type='submit'
				className='btn btn-light'
				onClick={() => {
          setStatus('Current Balance:' + balance);
					props.setShow(true);
					props.setStatus("");
				}}
			>
				Check balance again
			</button>
		</>
	);
}

function BalanceForm(props) {

	function handle() {
    validateEntry();
    console.log("handling...");
		fetch(`/account/findOne/${ctx.email}`)
			.then((response) => response.text())
			.then((text) => {
				try {
					const data = JSON.parse(text);
					setUser(data);
					props.setShow(false);
					setBalance(user.balance);
					console.log(balance);
				} catch (err) {
					props.setStatus(text);
					console.log("err:", text);
				}
			});
	}

	return (
		<>
			{ctx === "" ? (
				<h4> You must login to continue</h4>
			) : (
				<h4> Welcome, {ctx.name}</h4>
			)}
			<h2>Got money? Let's find out:</h2>

			{/* Email
			<br />
			<input
				type='input'
				className='form-control'
				placeholder='Enter email'
				value={email}
				onChange={(e) => setEmail(e.currentTarget.value)}
			/>
			<br /> */}
			<button type='submit' className='btn btn-light' onClick={handle}>
				Check Balance
			</button>
		</>
	);
}
}