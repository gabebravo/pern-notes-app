import React, { Component } from 'react'

class NoteForm extends Component {

    render(){
        const { title, note } = this.props.pickedNote;
        return <div>
            <div className="form-group">
                <label>Title:</label>
                <input className="form-control" name="title" 
                    onChange={this.props.formHandler} value={title}/>
            </div>
            <div className="form-group">
                <label>Note:</label>
                <textarea className="form-control" name="note" 
                    onChange={this.props.formHandler} value={note}/>
            </div>
            <div className="form-group">
                <button className="btn btn-default pull-right" 
                    onClick={this.props.formSubmit}>Submit</button>
                <button className="btn btn-default pull-right" 
                    onClick={this.props.formCancel}>Cancel</button>
            </div>
        </div>
    }
}

export default NoteForm;