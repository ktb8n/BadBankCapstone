function Balance() {
  const ctx = React.useContext(UserContext);
  const [loggedIn, setLoggedIn] = React.useState();


console.log(ctx.user);
ctx.user ? (setLoggedIn(true)) : (<h2></h2>);

  //this works with logged in user
console.log(ctx);


	return (
		<>
			<Card
				bgcolor='info'
				header='Balance'
				body={
					!loggedIn ? (
						<div>
							<h4> You must login to see your balance</h4>
							<a href='/#login/'>
								<button className='btn btn-secondary'>Login</button>
							</a>
						</div>
					) : (
						<div>
							<h4> Welcome, {ctx.user}</h4>

							<h2>
								Your current balance is: {ctx.balance}
							</h2>
						</div>
					)
				}
			/>
		</>
	);
			}