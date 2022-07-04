import { mount } from 'enzyme'
import { Provider } from 'react-redux'
import { LoginScreen } from '../../../components/auth/LoginScreen'
import configureStore from 'redux-mock-store' //ES6 modules
import thunk from 'redux-thunk'
import { MemoryRouter } from 'react-router-dom'
import { startGooleLogin, startLoginEmailPassword } from '../../../actions/auth'

jest.mock('../../../actions/auth', () => (
    {
        startGooleLogin: jest.fn(),
        startLoginEmailPassword: jest.fn()
    }
))


const middlewares = [thunk]
const mockStore = configureStore(middlewares)
const initialState = {
    ui: {
        loading: false
    }
}

let store = mockStore(initialState)
store.dispatch = jest.fn()

const wrapper = mount(
    <Provider store={store}>
        <MemoryRouter>
            <LoginScreen />
        </MemoryRouter>
    </Provider>
)
describe('pruebas en el componente LoginScreen', () => {

    beforeEach(() => {
        store = mockStore(initialState)
        jest.clearAllMocks()
    })

    test('se debe mostrar correctamente', () => {
        expect(wrapper).toMatchSnapshot()

    })

    test('el boton de login con google debe llamar a la actio startGooleLogin', () => {

        wrapper.find('.google-btn').prop('onClick')()
       
        expect(startGooleLogin).toHaveBeenCalled()


    })

    test('el boton de login debe llamar a la actio startLoginEmailPassword', () => {

        wrapper.find('form').simulate('submit',{ preventDefault(){}})

        expect(startLoginEmailPassword).toHaveBeenCalledWith('nando@gmail.com',
		'123456')


    })
})