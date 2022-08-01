

const Route       = ReactRouterDOM.Route;
const Link        = ReactRouterDOM.Link;
const HashRouter  = ReactRouterDOM.HashRouter;
const UserContext = React.createContext(null);


		//////////////////////////////////////
		//FIREBASE AUTH ATTEMPT
		///////////////////////////////

//import { initializeApp } from "firebase/app";

// //Import the functions you need from the SDKs you need:

//import { Authorization } from `firebase/auth`;
//// TODO: Add SDKs for Firebase products that you want to use
// //https://firebase.google.com/docs/web/setup#available-libraries

// //Your web app's Firebase configuration
//// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: "AIzaSyAw7Qcg8uluwFRoBHXnRxyog33sIrulugE",
//   authDomain: "bad-bank-ktb8n.firebaseapp.com",
//   projectId: "bad-bank-ktb8n",
//   storageBucket: "bad-bank-ktb8n.appspot.com",
//   messagingSenderId: "336028486534",
//   appId: "1:336028486534:web:bf16fcf21de702273e3a07"
//   //measurementId: "G-K3JWZ465LF"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// //firebaseConfig.initializeApp(firebaseConfig); I tried this too

function Card(props){
  function classes(){
    const bg  = props.bgcolor ? ' bg-' + props.bgcolor : ' ';
    const txt = props.txtcolor ? ' text-' + props.txtcolor: ' text-white';
    return 'card mb-3 ' + bg + txt;
  }

  return (
		<div className={classes()} style={{ maxWidth: "50em" }}>
			<div className='row no-gutters'>
				<div className='col-md-4'>
					<img
						className='img-fluid'
						src='badPig.png'
						alt='better bank pig logo'
					/>
				</div>
				<div className='col-md-8'>
					<div className='card-body'>
						{props.title && <h5 className='card-title'>{props.title}</h5>}
						{props.text && <p className='card-text'>{props.text}</p>}
						{props.body}
						{props.status && <div id='createStatus'>{props.status}</div>}
					</div>
				</div>
			</div>
		</div>
	);    
}
