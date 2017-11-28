import React, { Component } from 'react'
import NotesList from './NotesList'
import NoteForm from './NoteForm'
import axios from 'axios'

class App extends Component {

    state = {
        notes: [],
        selectedId: null, 
        selectedTitle: '',
        selectedNote: ''
    }

    componentDidMount() {
        axios.get('/notes')
        .then( response => {
            this.setState({
                notes: response.data
            })
        })
        .catch( response => {
            console.log(response);
        })
    }

    // Select new empty note
    newNote = (e) => {
        e.preventDefault();
        const { selectedTitle, selectedNote } = this.state;
        axios.post('/notes', {
            title: selectedTitle,
            note: selectedNote
          })
          .then( response => {
            this.setState({ 
                notes: response.data,
                selectedId: null, 
                selectedTitle: '',
                selectedNote: ''
            })
          })
          .catch( response => {
            console.log(response);
          });
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
        const { selectedId, selectedTitle, selectedNote } = this.state;
        axios.put(`/notes/${selectedId}`, {
            title: selectedTitle,
            note: selectedNote
        })
        .then( response => {
          console.log(response.data)
          this.setState({ 
              notes: response.data,
              selectedId: null, 
              selectedTitle: '',
              selectedNote: ''
          })
        })
        .catch( response => {
          console.log(response);
        });
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
        axios.delete(`/notes/${id}`)
          .then( response => {
            this.setState({ 
                notes: response.data,
                selectedId: null, 
                selectedTitle: '',
                selectedNote: ''
            })
          })
          .catch( response => {
            console.log('you failed')
            console.log(response);
          });
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