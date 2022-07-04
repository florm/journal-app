import {mount} from 'enzyme'
import { Provider } from 'react-redux'
import { Sidebar } from '../../../components/journal/Sidebar'
import configureStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import { NoteScreen } from '../../../components/notes/NoteScreen'
import { activarNota } from '../../../actions/notes'
import { JournalEntry } from '../../../components/journal/JournalEntry'

const middlewares = [thunk]
const mockStore = configureStore(middlewares)

const initalState = {}

const store = mockStore(initalState)
store.dispatch = jest.fn()

describe('pruebas en el JounalEntry', () => {

    const nota = {
        id: 10,
        date: 0,
        title: 'titulo',
        body: 'body',
        url: 'https://algunlugar.com/foto.jpg'
    }

    const wrapper = mount(
        <Provider store={store}>
            <JournalEntry {...nota}/>
        </Provider>
    )

    test('debe mostrarse correctamente', () => {
        expect(wrapper).toMatchSnapshot()

    })

    test('cuando hago click en la nota se hace el dispatch de la accion', () => {
        wrapper.find('.journal__entry').prop('onClick')()

        expect(store.dispatch).toHaveBeenCalled()
        
        expect(store.dispatch).toHaveBeenCalledWith(activarNota(nota.id, {...nota}))

    })

    
})