import React from 'react'
import { Redirect } from 'react-router-dom'
import { Routes, Route, BrowserRouter, Switch } from 'react-router-dom'
import { LoginScreen } from '../components/auth/LoginScreen'
import { RegisterScreen } from '../components/auth/RegisterScreen'
import { JournalApp } from '../JournalApp'

export const AuthRouter = () => {
	return (

		<BrowserRouter>
			<div className='auth__main'>
				<div className='auth__box-container'>
					<Switch>
						<Route exact path={'/auth/login'} component={LoginScreen} />
						<Route exact path={'/auth/register'} component={RegisterScreen} />
						<Redirect to='/auth/login' />
					</Switch>
				</div>
			</div>
		</BrowserRouter>

	)
}
