import {mount} from 'enzyme'
import { Provider } from 'react-redux'
import { Sidebar } from '../../../components/journal/Sidebar'
import configureStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import { startLogout } from '../../../actions/auth'
import { startNewNote } from '../../../actions/notes'

const middlewares = [thunk]
const mockStore = configureStore(middlewares)

jest.mock('../../../actions/auth', ()=>({
    startLogout: jest.fn()
}))

jest.mock('../../../actions/notes', ()=>({
    startNewNote: jest.fn()
}))

const initalState = {
    auth:{
        name: 'Flor'
    },
    notes:{
        notes: []
    }
}

const store = mockStore(initalState)
store.dispatch = jest.fn()

describe('pruebas en el Sidebar', () => {

    const wrapper = mount(
        <Provider store={store}>
            <Sidebar/>
        </Provider>
    )

    test('debe mostrarse correctamente', () => {
        expect(wrapper).toMatchSnapshot()

    })

    test('debe llamar al startLogout', () => {
        wrapper.find('button').prop('onClick')()
        expect(startLogout).toHaveBeenCalledWith()

    })

    test('debe llamar al startNewNote', () => {
        wrapper.find('.journal__new-entry').prop('onClick')()
        expect(startNewNote).toHaveBeenCalledWith()
    })
})