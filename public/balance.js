function Balance() {
	const [show, setShow] = React.useState(true);
	const [status, setStatus] = React.useState("");
  const [user, setUser] = React.useState("");

	return (
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
	);


function validateEntry(field, label) {
  if (!field) {
    setStatus("Well... you've gotta give us SOMETHING. Try your " + label);
    setShow(true);
    setTimeout(() => setStatus(""),2500);
    return false;
  }
  return true;
}


function BalanceMsg(props) {
	return (
		<>
			<h5>Success</h5>
			<button
				type='submit'
				className='btn btn-light'
				onClick={() => {
        
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
	const [email, setEmail] = React.useState("");

	function handle() {
    validateEntry();
    console.log("handling...");
		fetch(`/account/findOne/${email}`)
			.then((response) => response.text())
			.then((text) => {
				try {
					const data = JSON.parse(text);
					props.setStatus(text);
					props.setShow(false);
					setBalance(user.balance);
					console.log("JSON:", data);
				} catch (err) {
					props.setStatus(text);
					console.log("err:", text);
				}
			});
	}

	return (
		<>
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
			<button type='submit' className='btn btn-light' onClick={handle}>
				Check Balance
			</button>
		</>
	);
}
}