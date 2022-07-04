import { types } from "../../types/types"


describe('pruebas en types', ()=> {

    test('debe retornar los types', () => { 

        expect(types).toEqual({
            login: '[Auth] Login',
            logout: '[Auth] Logout',
        
            uiSetError: '[UI] Set Error',
            uiRemoveError: '[UI] Remove Error',
        
            uiStartLoading: '[UI] Start loading',
            uiFinishLoading: '[UI] Finish loading',
        
        
            notesAddNew: '[Notes] New Note',
            notesActive: '[Notes] Set active note',
            notesLoad: '[Notes] Load Notes',
            notesUpdated: '[Notes] Update Notes',
            notesFileUrl: '[Notes] Updated image url',
            notesDelete: '[Notes] Delete Note',
            notesLogoutCleaning: '[Notes] Logout Cleaning',
        
        })
        
     })
})