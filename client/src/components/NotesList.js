import React, { Component } from 'react'

class NotesList extends Component {

    static defaultProps = {
        notes: []
    }

    printNotes = (notes, id, handler) => {
        return notes.map( (note, index) => {
            return note.id === id ?
            (<div style={{marginBottom: 10}} key={index}>
                <div className="list-group-item active" onClick={() => handler(note.id)}>{note.title}</div>
                <div className="list-group-item">{note.note}</div>
            </div>
            ) : (
            <div style={{marginBottom: 10}} key={index}>
                <div className="list-group-item" onClick={() => handler(note.id)}>{note.title}</div>
                <div className="list-group-item">{note.note}</div>
            </div>
            )
        })
    }

    render(){
        const { notes, selectedId, noteSelect } = this.props;
        const renderedNotes = this.printNotes(notes, selectedId, noteSelect);
        return <div className="list-group">{renderedNotes}</div>
    }
}

export default NotesList;