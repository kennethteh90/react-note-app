import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();

class Note extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [ {
        value: 'You can add your note here!',
        title: 'Add a title!',} ],
      noteNumber: 0,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleTitleChange = this.handleTitleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleChange(event) {
    const noteNumber = this.state.noteNumber;

    var list = {...this.state.list}

    list[noteNumber].value = event.target.value;
    //
    this.setState(list)

  }

  handleTitleChange(event) {
    const noteNumber = this.state.noteNumber;

    var list = {...this.state.list}

    list[noteNumber].title = event.target.value;
    //
    this.setState(list)

  }


  handleSubmit(event) {
    const list = this.state.list;
    event.preventDefault();

    this.setState({
      list: list.concat([{
        title: 'Add a title!',
        value: 'New note',
      }]),
      noteNumber: list.length,
    });
  }

  jumpTo(noteNumber) {
    this.setState({
      noteNumber: noteNumber,
    });
  }

  handleClick(e) {
    const noteNumber = this.state.noteNumber;
    const list = this.state.list;
    e.preventDefault();
    console.log({list});
    list.splice(noteNumber,1);

    this.setState({
      list: list,
      noteNumber: list.length - 1,
    });
  }

  handleFocus(event) {
    event.target.select();
  }


  render() {
    // const value = this.state.value
    const list = this.state.list
    const notes = list.map((step, noteNumber) => {
      const title = list[noteNumber].title.slice(0,50);
      const desc = list[noteNumber].value.slice(0,200);
      return (
        <div key={noteNumber}>

          <button  className="note-li text-left" onClick={() => this.jumpTo(noteNumber)}>
            <h5>{title}</h5>
            {desc}
          </button>
          <hr />
        </div>
      );
    });
    const noteNumber = this.state.noteNumber
    const current = list[noteNumber]
    const note = current.value
    const title = current.title

    return(
      <div>
        <div className="layout container-fluid">
          <div className="list col-3 py-3">
            <div> {notes} </div>
          </div>
          <div className="note col-9">
            <div>
              <form onSubmit={this.handleSubmit} className="form-style-5">
                <label>
                  <input type="text" value = {title} onChange={this.handleTitleChange} onFocus={this.handleFocus}></input>
                  <textarea value={note} onChange={this.handleChange} />
                </label>
                <input type="submit" value="Another note!" />
              </form>
              <button onClick={this.handleClick} className="my-button"> Delete Note </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

}


// ========================================

ReactDOM.render(
  <Note />,
  document.getElementById('root')
);
