import React from 'react'
import { Link } from 'react-router-dom'
import { useForm } from '../../hooks/useForm'
import validator from 'validator'
import { useDispatch, useSelector } from 'react-redux'
import { removeError, setError } from '../../actions/ui'
import { startRegisterWithEmailPassword } from '../../actions/auth'

export const RegisterScreen = () => {

	const dispatch = useDispatch()
	const { msgError } = useSelector(state => state.ui)

	const [formValues, handleInputChange] = useForm({
		name: 'Hernando',
		email: 'nando@gmail.com',
		password: '123456',
		password2: '123456'
	})

	const { name, email, password, password2 } = formValues



	const handleRegister = (e) => {
		e.preventDefault()
		
		if (isFormValid()) {
			dispatch(startRegisterWithEmailPassword(email, password, name))
		}
	}

	const isFormValid = () => {

		if (name.trim().length === 0) {
			dispatch(setError('name required'))
			return false
		} else if (!validator.isEmail(email)) {
			dispatch(setError('email not valid'))
			return false
		} else if (password !== password2 || password.length < 5) {
			dispatch(setError('password error'))
			return false
		}
		dispatch(removeError())
		return true
	}

	return (
		<>
			<h3 className='auth__title'>Register</h3>
			<form onSubmit={handleRegister}
				className='animate__animated animate__fadeIn animate__faster'>
				{
					msgError && <div className='auth__alert-error'>
						{msgError}
					</div>
				}

				<input
					className='auth__input'
					type="text"
					placeholder='Name'
					name='name'
					autoComplete='off'
					value={name}
					onChange={handleInputChange}
				/>
				<input
					className='auth__input'
					type="text"
					placeholder='Email'
					name='email'
					autoComplete='off'
					value={email}
					onChange={handleInputChange}
				/>
				<input
					className='auth__input'
					type="password"
					placeholder='Password'
					name='password'
					autoComplete='off'
					value={password}
					onChange={handleInputChange}
				/>
				<input
					className='auth__input'
					type="password"
					placeholder='Confirm password'
					name='password2'
					autoComplete='off'
					value={password2}
					onChange={handleInputChange}
				/>
				<button
					className='btn btn-primary btn-block mb-5'
					type='submit'
				>
					Register
				</button>


				<Link to='/auth/login' className='link'>
					Already registered?
				</Link>
			</form>
		</>

	)
}
