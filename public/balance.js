function Balance() {
	const [show, setShow] = React.useState(true);
	const [status, setStatus] = React.useState("");
  const [user, setUser] = React.useState("");
  const ctx = React.useContext(UserContext);
  const [loggedIn, setLoggedIn] = React.useState();
  const [balance, setBalance]   = React.useState("");

console.log(ctx);
console.log(user);

	return (
    <>	
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
			{!loggedIn ? (
				<div>
					<h4> You must login to see your balance</h4>
					<a href='/#login/'>
						<button className='btn btn-secondary'>Login</button>
					</a>
				</div>
			) : (
				<div>
					<h4> Welcome, {ctx.name}</h4>

					<h2>
						{status}: {ctx.balance}
					</h2>
				</div>
			)}

		</>
	);
}
}