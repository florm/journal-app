import { finishLoading, removeError, setError, startLoading } from "../../actions/ui"
import { types } from "../../types/types"

describe('pruebas en uiActiones', () => {

    test('todas las acciones deben funcionar', async () => {
        const action = setError('es un error')

        expect(action).toEqual({
            type: types.uiSetError,
            payload: 'es un error'
        })

        const removeErrorAction = removeError()
        const startLoadingAction = startLoading()
        const finishLoadingAction = finishLoading()

        expect(removeErrorAction).toEqual({
            type: types.uiRemoveError,
            payload: null
        })
        expect(startLoadingAction).toEqual({
            type: types.uiStartLoading
        })
        expect(finishLoadingAction).toEqual({
            type: types.uiFinishLoading
        })

    })


})