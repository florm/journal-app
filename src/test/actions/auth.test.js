// /**
//  * @jest-environment node
//  */

import configureStore from 'redux-mock-store' //ES6 modules
import thunk from 'redux-thunk'

import { login, logout, startLoginEmailPassword, startLogout } from "../../actions/auth"
import { types } from '../../types/types'
const middlewares = [thunk]


const mockStore = configureStore(middlewares)
const initialState = {}

let store = mockStore(initialState)


describe('pruebas en auth actions', () => {

    beforeEach(()=>{
        store = mockStore(initialState)
    })

    test('login crear las acciones respectivas', () => {

        const uid = 'TESTING'
        const displayName = 'Flor'
        const action = login(uid, displayName)

        expect(action.type).toBe(types.login)
        expect(action.payload).toEqual({
            uid: uid,
            displayName: displayName
        })

    })

    test('logout debe crear las acciones respectivas', () => {

        const action = logout()

        expect(action.type).toBe(types.logout)


    })

    test('debe realizar el startLogout', async () => {

        await store.dispatch(startLogout())
        const actions = store.getActions()
        
        expect(actions[0]).toEqual({
            type: types.logout
        })

        expect(actions[1]).toEqual({
            type: types.notesLogoutCleaning
        })
    })

    test('debe realizar el startLoginEmailPassword', async () => {

        const email = 'test@testing.com'
        const pass = '123456'
        await store.dispatch(startLoginEmailPassword(email, pass))
        const actions = store.getActions()
        
        expect(actions[1]).toEqual({
            type: types.login,
            payload: { 
                uid: '709pq8WLLAQaKiZrbe8zieQxNBy1', 
                displayName: null }
        })
        
        
    })




})

