function Withdraw(){
  const [show, setShow]     = React.useState(true);
  const [status, setStatus] = React.useState('');  
  const ctx = React.useContext(UserContext);

  return (
		<Card
			bgcolor='success'
			header='Withdraw'
			status={status}
			body={
				!ctx.user ? (
					<div>
						<h4> You must login to see access funds</h4>
						<a href='/#login/'>
							<button className='btn btn-secondary'>Login</button>
						</a>
					</div>
				) : (
					<WithdrawMsg setShow={setShow} setStatus={setStatus} />
				)
			}
		/>
	);


function WithdrawMsg(props){
  const [amount, setAmount] = React.useState("");
  return(<>
    <h5>Enter withdrawal amount</h5>
    <input type="number" placeholder="$" value={amount} onChange={e => setAmount(e.currentTarget.value)}></input>
        <button type="submit" 
      className="btn btn-light" 
      onClick={() => {
        handle(amount);
        props.setShow(true);
        props.setStatus(`Success! Take your money`);
        setTimeout(() => props.setStatus(""), 2500);
        }}>
        Withdraw 
    </button>
  </>);
}




  function handle(){
    fetch(`/account/update/${ctx.user.balance}/-${amount}`)
    .then(response => response.text())
    .then(text => {
        try {
            const data = JSON.parse(text);
            props.setStatus(JSON.stringify(data.value));
            props.setShow(false);
            console.log('JSON:', data);
        } catch(err) {
            props.setStatus('Deposit failed')
            console.log('err:', text);
        }
    });
  }
}

