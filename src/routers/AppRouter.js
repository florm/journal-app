import { React, useEffect, useState } from 'react'
import { Route } from 'react-router-dom'
import { Redirect } from 'react-router-dom'
import { BrowserRouter, Switch } from 'react-router-dom'
import { useDispatch } from 'react-redux'

import { JournalScreen } from '../components/journal/JournalScreen'
import { AuthRouter } from './AuthRouter'
import { firebase } from '../firebase/firebase-config'
import { login } from '../actions/auth'
import { PublicRoute } from './PublicRoute'
import { PrivateRoute } from './PrivateRoute'
import { startLoadingNotes } from '../actions/notes'


export const AppRouter = () => {

	const dispatch = useDispatch()
	const [checking, setChecking] = useState(true)
	const [isLoggedIn, setIsLoggedIn] = useState(false)
	useEffect(() => {

		firebase.auth().onAuthStateChanged(async (user) => {
			if (user?.uid) {
				dispatch(login(user.uid, user.displayName))
				setIsLoggedIn(true)
				dispatch(startLoadingNotes(user.uid))
			} else {
				setIsLoggedIn(false)
			}
			setChecking(false)
		})

	}, [dispatch])

	if (checking) {
		return (
			<h1>Wait...</h1>
		)
	}
	return (

		<BrowserRouter>
			<div>
				<Switch>
					<PublicRoute
						path={'/auth'}
						isAuthenticated={isLoggedIn}
						component={AuthRouter}
					/>

					<PrivateRoute 
						exact 
						path={'/'}
						isAuthenticated={isLoggedIn} 
						component={JournalScreen} 
					/>
					<Redirect to='/auth/login' />
				</Switch>
			</div>
		</BrowserRouter>

	)
}