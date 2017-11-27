import React, { Component } from 'react'
import NotesList from './NotesList'
import NoteForm from './NoteForm'
import Note from '../classes'

class App extends Component {

    state = {
        notes: [
            { id: 1, title: 'Welcome Home', note: 'Glad you could make it home' }, 
            { id: 2, title: 'Goodbye', note: 'See ya next time' },
            { id: 3, title: 'Youre back', note: 'Good to see you again' }
        ],
        selectedId: null, 
        selectedTitle: '',
        selectedNote: ''
    }

    // Select new empty note
    newNote = (e) => {
        e.preventDefault();
        const { notes, selectedTitle, selectedNote } = this.state;
        const newNote = new Note(notes.length + 1, selectedTitle, selectedNote);
        const notesCopy = [...this.state.notes, newNote];
        this.setState({ 
            notes: notesCopy,
            selectedId: null, 
            selectedTitle: '',
            selectedNote: ''
        })
    }

    // Set note as selected
    onSelect = (id) => {
        const [pickedNote] = this.state.notes.filter( note => note.id === id)
        this.setState({
            selectedId: pickedNote.id,
            selectedTitle: pickedNote.title,
            selectedNote: pickedNote.note,
        })
    }

    // Save note to service
    onSubmit = (e) => {
        if( this.state.selectedId === null ) { return }
        e.preventDefault();
        const notesCopy = [...this.state.notes].map( note => {
            if( note.id === this.state.selectedId ) {
                const { selectedId, selectedTitle, selectedNote } = this.state;
                const newNote = new Note(selectedId, selectedTitle, selectedNote);
                return newNote;
            } else { return note }
        })
        this.setState({ 
            notes: notesCopy,
            selectedId: null, 
            selectedTitle: '',
            selectedNote: ''
        })
    }

    // Unselect note
    onCancel = () => {
        this.setState({
            selectedId: null, 
            selectedTitle: '',
            selectedNote: ''
        })
    }

    updateForm = (e) => {
        switch( e.target.name ) {
            case 'title' :
                this.setState({ selectedTitle: e.target.value });
                break;
            case 'note' :
                this.setState({ selectedNote: e.target.value });
                break;
            default :
                break;
        }
    }

    onDelete = id => {
        if( this.state.selectedId === null ) { return }
        const notesCopy = [...this.state.notes]
            .filter( note => note.id !== id );
        this.setState({ 
            notes: notesCopy,
            selectedId: null, 
            selectedTitle: '',
            selectedNote: ''
        })
    }

    render() {
        const pickedNoteForForm = { 
                title: this.state.selectedTitle, 
                note: this.state.selectedNote
            }
        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <h1>React notes</h1>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-4">
                        <NotesList notes={this.state.notes} 
                            selectedId={this.state.selectedId}
                            noteSelect={this.onSelect}
                        />
                    </div>
                    <div className="col-md-8">
                        <NoteForm pickedNote={pickedNoteForForm} 
                            formHandler={this.updateForm}
                            formCancel={this.onCancel}
                            formSubmit={this.onSubmit}
                        />
                        <div>
                            <button onClick={this.newNote}>New Note</button>
                            <button style={{marginLeft: 10}} 
                                onClick={() => this.onDelete(this.state.selectedId)}>Delete</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default App;