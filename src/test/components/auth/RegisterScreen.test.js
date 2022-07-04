import { mount } from 'enzyme'
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store' //ES6 modules
import thunk from 'redux-thunk'
import { MemoryRouter } from 'react-router-dom'
import { RegisterScreen } from '../../../components/auth/RegisterScreen'
import { types } from '../../../types/types'

const middlewares = [thunk]
const mockStore = configureStore(middlewares)
const initialState = {
    ui: {
        loading: false,
        msgError: null
    }
}

const store = mockStore(initialState)

const wrapper = mount(
    <Provider store={store}>
        <MemoryRouter>
            <RegisterScreen />
        </MemoryRouter>
    </Provider>
)
describe('pruebas en el componente RegisterScreen', () => {

    beforeEach(() => {
        store.clearActions()
        
    })

    test('se debe mostrar correctamente', () => {
        expect(wrapper).toMatchSnapshot()

    })

    test('si el email esta vacio debe disparar un error', () => {
        const emailField = wrapper.find('input[name="email"]')
        emailField.simulate('change', { target:{
            name: 'email',
            value: ''
        }})

        wrapper.find('form').prop('onSubmit')({
            preventDefault(){}
        })

        const actions = store.getActions()
        expect(actions[0]).toEqual({
            type: types.uiSetError,
            payload: 'email not valid' 
        })
    })

    test('debe mostrar la caja de alerta con el error', () => { 

        const initialState = {
            ui: {
                loading: false,
                msgError: 'email not valid'
            }
        }
        
        const store = mockStore(initialState)
        
        const wrapper = mount(
            <Provider store={store}>
                <MemoryRouter>
                    <RegisterScreen />
                </MemoryRouter>
            </Provider>
        )

        expect(wrapper.find('.auth__alert-error').exists()).toBe(true)
        expect(wrapper.find('.auth__alert-error').text().trim()).toBe(initialState.ui.msgError)
     })

    
})