function Balance() {
const ctx = React.useContext(UserContext);


	return (
		<>
			<Card
				bgcolor='info'
				header='Balance'
				body={ 
					!ctx.user? (
						<div>
							<h4> You must login to see your balance</h4>
							<a href='/#login/'>
								<button className='btn btn-secondary'>Login</button>
							</a>
						</div>
					) : (
						<div>
							<h4> Welcome, {ctx.user.name}</h4>

							<h2>
								Your current balance is: {ctx.user.balance}
							</h2>
						</div>
					)
				}
			/>
		</>
	);
}
