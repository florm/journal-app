import { authReducer } from "../../reducers/authReducer"
import { types } from "../../types/types"


describe('pruebas en authReducer', () => {

    test('debe poder loguearse', async () => {

        const action = {
            type: types.login,
            payload: {
                uid: '123455',
                displayName: 'flor'
            }
        }
        const estado = authReducer({}, action)
        expect(estado).toEqual({
            uid: '123455',
            name: 'flor'
        })

    })

    test('debe poder desloguearse', () => {

        const initState = {
            uid: '123455',
            name: 'flor'
        }

        const estado = authReducer(initState, {
            type: types.logout
        })
        expect(estado).toEqual({})

    })

    test('si no existe la accion el estado que devuelve es el mismo', () => {

        const estadoLogueado = {
            uid: '123455',
            name: 'flor'
        }
        const estado = authReducer(estadoLogueado, {
            type: 'no existe'
        })
        expect(estado).toEqual(estadoLogueado)


    })

})