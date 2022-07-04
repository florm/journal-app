import { mount } from 'enzyme'
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store' //ES6 modules
import thunk from 'redux-thunk'
import { MemoryRouter } from 'react-router-dom'
import { AppRouter } from '../../routers/AppRouter'
import { login } from '../../actions/auth'
import { act } from 'react-dom/test-utils'
import { firebase } from '../../firebase/firebase-config'
jest.mock('../../actions/auth', () => (
    {
        login: jest.fn()
    }
))
const middlewares = [thunk]
const mockStore = configureStore(middlewares)
const initialState = {
    auth:{
        name: null
    },
    ui: {
        loading: false,
        msgError: null
    },
    notes: {
        notes: [],
        active: {
            id: 'ABC'
            
        }
    }
}

const store = mockStore(initialState)
store.dispatch = jest.fn()


describe('pruebas en el AppRouter', () => {


    test('debe llamar el login si estoy autenticado', async () => {


        let user;

        await act(async () => {
            const userCredentials = await firebase.auth().signInWithEmailAndPassword('test@testing.com', '123456')
            user = userCredentials.user

            const wrapper = mount(
                <Provider store={store}>
                    <MemoryRouter>
                        <AppRouter />
                    </MemoryRouter>
                </Provider>
            )
        })

        expect(login).toHaveBeenCalledWith('709pq8WLLAQaKiZrbe8zieQxNBy1', null)
    })
})