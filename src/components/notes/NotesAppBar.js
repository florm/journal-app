import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import moment from 'moment'
import { startSaveNote, startUploading } from '../../actions/notes'

export const NotesAppBar = () => {
	const { active: notaActiva } = useSelector(state => state.notes)
	const dateNote = moment(notaActiva.date)
	const dispatch = useDispatch()

	const handleSave = () => {
		dispatch(startSaveNote(notaActiva))
	}

	const handlePictureUpload = () => {
		document.querySelector('#fileSelector').click()
	}

	const handleFileChange = (e) => {
		const file = e.target.files[0]
		if(file){
			dispatch(startUploading(file))
		}
	}

	return (
		<div className='notes__appbar'>
			<span>{dateNote.format("MMM D YYYY")}</span>

			<input
				id='fileSelector'
				style={{ display: 'none' }}
				type="file"
				onChange={handleFileChange}
			/>
			<div>
				<button className='btn'
					onClick={handlePictureUpload}
				>
					Picture
				</button>

				<button
					className='btn'
					onClick={handleSave}
				>
					Save
				</button>
			</div>
		</div>
	)
}
