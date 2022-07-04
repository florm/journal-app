import {mount} from 'enzyme'
import { Provider } from 'react-redux'
import { Sidebar } from '../../../components/journal/Sidebar'
import configureStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import { NoteScreen } from '../../../components/notes/NoteScreen'
import { activarNota } from '../../../actions/notes'

const middlewares = [thunk]
const mockStore = configureStore(middlewares)

jest.mock('../../../actions/notes', ()=>({
    activarNota: jest.fn()
}))


const initalState = {
    auth:{
        name: 'Flor'
    },
    notes:{
        active: {
            id: '1234',
            title: 'Hola',
            body: 'Mundo',
            date: 0
        },
        notes: []
    }
}

const store = mockStore(initalState)
store.dispatch = jest.fn()

describe('pruebas en el NoteScreen', () => {

    const wrapper = mount(
        <Provider store={store}>
            <NoteScreen/>
        </Provider>
    )

    test('debe mostrarse correctamente', () => {
        expect(wrapper).toMatchSnapshot()

    })

    test('cuando se modifica el valor de un input se dispara el activarNota', () => {
        wrapper.find('input[name="title"]').simulate('change', { target:{
            name: 'title',
            value: 'hola de nuevo'
        }})

        //expect(activarNota).toHaveBeenLastCalledWith({})
        
        expect(activarNota).toHaveBeenCalledWith(
            '1234',
            {
                body: 'Mundo',
                title: 'hola de nuevo',
                id: '1234',
                date: 0
            }
        )
    })

    
})