/**
 * @jest-environment node
 */

//el comentario de arriba sirve para que funcione el wdo test porque daba un error en firestore


import configureStore from 'redux-mock-store' //ES6 modules
import thunk from 'redux-thunk'
import { startLoadingNotes, startNewNote, startSaveNote, startUploading } from '../../actions/notes'
import { db } from '../../firebase/firebase-config'
import { fileUpload } from '../../helpers/fileUpload'
import { types } from '../../types/types'

import * as fs from 'fs';

jest.mock('../../helpers/fileUpload', () => ({
    fileUpload: jest.fn()
}))

const middlewares = [thunk]
const mockStore = configureStore(middlewares)

const NOTE_ID = 'CMh70jsPyjZv4dBn8Q39' //este id es de una nota en la base de datos de firestore que uso para testing
const initState = {
    auth: {
        uid: 'TESTING'
    },
    notes: {
        active: {
            id: NOTE_ID,
            title: 'hola',
            body: 'mundo'
        }
    }
}
let store = mockStore(initState)

describe('pruebas en note actions', () => {

    beforeEach(() => {
        store = mockStore(initState) 
    })

    test('debe crear una nueva nota', async () => {
        await store.dispatch(startNewNote())

        const actions = store.getActions()
        expect(actions[0]).toEqual({
            type: types.notesActive,
            payload: {
                id: expect.any(String),
                title: '',
                body: '',
                date: expect.any(Number)
            }
        })

        expect(actions[1]).toEqual({
            type: types.notesAddNew,
            payload: {
                id: expect.any(String),
                title: '',
                body: '',
                date: expect.any(Number)
            }
        })

        const docId = actions[0].payload.id
        await db.doc(`TESTING/journal/notes/${docId}`).delete()
    })

    test('deben poder cargarse las notas del usuario', async () => {


        await store.dispatch(startLoadingNotes('TESTING'))
        const actions = store.getActions()
        expect(actions[0]).toEqual({
            type: types.notesLoad,
            payload: expect.any(Array)
        })

        const expected = {
            id: expect.any(String),
            title: expect.any(String),
            body: expect.any(String),
            date: expect.any(Number),
        }

        expect(actions[0].payload[0]).toMatchObject(expected)

    })

    test('debe actualizar la nota', async () => {


        const note ={
            id: NOTE_ID,
            title: 'titulo',
            body: 'body'

        }

        await store.dispatch(startSaveNote(note))
        const actions = store.getActions()
        
        expect(actions[0].type).toBe(types.notesUpdated)
        expect(actions[0].payload.id).toBe(NOTE_ID)
        expect(actions[0].payload.note).toEqual(note)

        const docRef = await db.doc(`TESTING/journal/notes/${note.id}`).get()
        expect(docRef.data().title).toBe('titulo')

    })


    test('startUploading debe actualizar el url del entry', async () => {

        fileUpload.mockReturnValue('https://hola-mundo.com')
        fs.writeFileSync('foto.jpg', '')
        const file = fs.readFileSync('foto.jpg')
        await store.dispatch(startUploading(file));

        const docRef = await db.doc(`TESTING/journal/notes/${NOTE_ID}`).get()
        expect(docRef.data().url).toBe('https://hola-mundo.com')

        

    })


})

