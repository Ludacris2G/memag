import './Styles/App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Header from './Header';
import Home from './Home';
import Checkout from './Checkout'
import Login from './Login';
import { useStateValue } from './StateProvider';
import { useEffect } from 'react';
import { auth } from './firebase';
import { ACTIONS } from './reducer';
import Payment from './Payment';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js'
import Orders from './Orders';

const promise = loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY);

function App() {
  const [{}, dispatch] = useStateValue();
  useEffect(() => {
    auth.onAuthStateChanged(authUser => {
      // console.log("THIS IS THE CURRENT USER >>>>", authUser)

      if (authUser) {
        dispatch({
          type: ACTIONS.SET_USER,
          user: authUser
        })
        // console.log(authUser)
      } else {
        // console.log(null)
        dispatch({
          type: ACTIONS.SET_USER,
          user: null
        })
      }
    })
  }, [])

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path='/' element={[<Header/>, <Home/>]}/>
          <Route path="/checkout" element={[<Header/>, <Checkout/>]}/>
          <Route path='/login' element={[<Login/>]}/>
          <Route path='/payment' element={[<Header/>, 
          <Elements stripe={promise}>
            <Payment/>
          </Elements>]}/>
          <Route path='/orders' element={[<Header/>, <Orders/>]}/>
        </Routes>
      </div>
    </Router>
  );
}

export default App;

// ALL DEPENDENCIES ====
// 1. npm i -D react-router-dom
// 2. npm install @mui/icons-material @mui/material @emotion/styled @emotion/react
// 3. npm i firebase
// 4. npm i -g firebase-tools
// 5. (not used) sudo npm i -g firebase-tools - they are already installed, hope it works
// 6. npm i axios -f
// 7. Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass
// 8. firebase login
// 9. firebase init -> hosting -> use existing project -> select current project -> name directory BUILD -> single page app Y - > N
// 10. npm run build
// 11. firebase deploy
// 12. npm i @stripe/stripe-js -f && npm i @stripe/react-stripe-js
// 13. npm i axios -f
// 14. firebase init -> functions -> y -> y
// THIS IS TO BE INSTALLED INSIDE FUNCTIONS DIRECTORY
// 1. npm i express
// 2. npm i cors
// 3. npm i stripe
// 4. firebase emulators:start
// 5. firebase deploy --only functions

// DEPENDENCIES EXPLAINED ====
// 1. -D is shortcut for --save-dev -> package will not be installed if you do npm install --production
// 2. Website icons 
// 3. firebase
// 4. to host your site with Firebase Hosting, you need the Firebase CLI
// 5. 
// 6. REST API. Lightweight HTTP client based on the $http service with Angular.js and is similar to the native JS FETCH API. Is promise based
// 7. to bypass execution policy
// 8. log in to firebase acc
// 9. The firebase.json file is required to deploy assets with the Firebase CLI because it specifies which files and settings from your project directory are deployed to your Firebase project.
// 10. creates an optimized production build. After this if you make changes on the app you have to run npm run build again
// 11/12. Stripe dependencies