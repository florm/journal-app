import React, {useEffect, useRef} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { activarNota, startDelete } from '../../actions/notes'
import { useForm } from '../../hooks/useForm'
import { NotesAppBar } from './NotesAppBar'

export const NoteScreen = () => {
	
	const dispatch = useDispatch()
	const { active: note } = useSelector(state => state.notes)

	const [formValues, handleInputChange, reset] = useForm(note)
	const { title, body } = formValues
	
	const activeId = useRef(note.id)
	useEffect(() => {
	  
		if(note.id !== activeId.current){
			reset(note)
			activeId.current = note.id
		}
	 
	},[note, reset] )

	
	useEffect(()=> {
		dispatch(activarNota(formValues.id, { ...formValues}))
	},[dispatch, formValues])
	
	const handleDelete = ()=>{
		console.log(activeId)
		dispatch(startDelete(activeId.current))
	}
	return (
		<div className='notes__main-content'>
			<NotesAppBar />
			<div className='notes__content'>
				<input type="text"
					placeholder='Some awesome title'
					className='notes__title-input'
					autoComplete='off'
					name='title'
					value={title}
					onChange={handleInputChange}
					
				/>

				<textarea
					placeholder="What happened today"
					className='notes__text-area'
					name='body'
					value={body}
					onChange={handleInputChange}
				></textarea>
				{
					(note.url) &&
					<div className='notes__images'>
						<img src={note.url} alt="paisaje" />

					</div>}

			</div>

			<button
				className='btn btn-danger'
				onClick={ handleDelete}
			>Delete</button>
		</div>
	)
}
