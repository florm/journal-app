import { types } from "../types/types"
import { db, firebase, googleAuthProvider } from '../firebase/firebase-config'
import { finishLoading, startLoading } from "./ui"
import Swal from 'sweetalert2'
import { noteLogout } from "./notes"


export const startLoginEmailPassword = (email, password) => {
    return (dispatch) => {
        dispatch(startLoading())
        
        //el return lo agregue para tener todas las acciones en el test, porque 
        //sino es un metodo que no devuelve nada y para el test el codigo de abajo no 
        //se ejecuta
        return firebase.auth().signInWithEmailAndPassword(email, password)
            .then(({ user }) => {
                dispatch(login(user.uid, user.displayName))
                dispatch(finishLoading())

            }).catch(e => {
                console.log(e)
                dispatch(finishLoading())
                Swal.fire('Error', e.message, 'error')
            })
    }
}
export const startRegisterWithEmailPassword = (email, password, name) => {
    return (dispatch) => {
        firebase.auth().createUserWithEmailAndPassword(email, password)
            .then(async ({ user }) => {
                await user.updateProfile({
                    displayName: name
                })
                dispatch(login(user.uid, user.displayName))
            }).catch(e => {
                console.log(e)
                Swal.fire('Error', e.message, 'error')
            })
    }
}

export const startGooleLogin = () => {
    return (dispatch) => {
        firebase.auth().signInWithPopup(googleAuthProvider)
            .then(userCredential => {
                const { uid, displayName } = userCredential.user
                dispatch(login(uid, displayName))
            })
    }
}

export const login = (uid, displayName) => {
    return {
        type: types.login,
        payload: {
            uid,
            displayName
        }
    }
}

export const startLogout = () => {
    return async (dispatch) => {
        await firebase.auth().signOut()
        dispatch(logout())
        dispatch(noteLogout())
    }
}
export const logout = () => {
    return {
        type: types.logout
    }
}


