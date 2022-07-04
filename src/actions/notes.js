import { db } from "../firebase/firebase-config"
import { loadNotes } from "../helpers/loadNotes"
import { types } from "../types/types"
import Swal from 'sweetalert2'
import { fileUpload } from "../helpers/fileUpload"

export const startNewNote = () => {
    return async (dispatch, getState) => {
        const uid  = getState().auth.uid
        
        const newNote = {
            title: '',
            body: '',
            date: new Date().getTime()
        }
        
        const docRef = await db.collection(`${uid}/journal/notes`).add(newNote)
        dispatch(activarNota(docRef.id, newNote))
        dispatch(addnewNote(docRef.id, newNote))

    } 

}

export const activarNota = (id, note) => {
    return {
        type: types.notesActive,
        payload: {
            id,
            ...note
        }
    }
}

export const addnewNote = (id, note) => {
    return {
        type: types.notesAddNew,
        payload: {
            id,
            ...note
        }
    }
}

export const startLoadingNotes = (uid) => {
    return async (dispatch) => {
        const notes = await loadNotes(uid)
        dispatch(setNotes(notes))
    }
}

export const setNotes = (notes) => {
    return {
        type: types.notesLoad,
        payload: notes
    }
}

export const startSaveNote = (note) => {
    return async (dispatch,getState) => {
        const { uid } = getState().auth
        if(!note.url){
            delete note.url
        }
        const noteToFirestore = {...note}
        delete noteToFirestore.id
        await db.doc(`${uid}/journal/notes/${note.id}`).update(noteToFirestore)
        dispatch(refreshNote(note.id, note))
        Swal.fire('Saved', note.title, 'success')
    }
}

export const refreshNote = (id, note) =>{
    return {
        type: types.notesUpdated,
        payload: {
            id,
            note
        }
    }
}

export const startUploading = (file)=>{
    return async (dispatch, getState) => {
        const { active: activeNote } = getState().notes
        
        Swal.fire({
            title: 'Uploading...',
            text: 'Please wait...',
            allowOutsideClick: false,
            showConfirmButton: false,
            willOpen: ()=>{
                Swal.showLoading()
            }
            
        })

        const fileUrl = await fileUpload(file)
        // console.log(fileUrl)
        Swal.close()
        activeNote.url = fileUrl
        dispatch(startSaveNote(activeNote))

    }
}

export const startDelete = (id)=>{
    return async (dispatch, getState) =>{
        const uid = getState().auth.uid

        await db.doc(`${uid}/journal/notes/${id}`).delete()

        dispatch(deleteNote(id))

    }
}

export const deleteNote = (id) => {
    return {
        type:types.notesDelete,
        payload: id
    }
}

export const noteLogout = () =>{
    return {
        type: types.notesLogoutCleaning
    }
}