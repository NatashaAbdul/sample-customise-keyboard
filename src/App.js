import React, { Component } from 'react';
import Keyboard from 'react-simple-keyboard';
import 'react-simple-keyboard/build/css/index.css';

class App extends Component {
  state = {
    layoutName: "default",
    input: "",
    isShowKeyboard: false
  };

  onChangeInput = (event) => {
    const input = event.target.value;

    this.setState({ input: event.target.value }, () =>
      this.keyboard.setInput(input)
    );
  };
  onKeyPress = (button) => {
    console.log("Button pressed", button);
    if (button === "{shift}" || button === "{lock}") {
      this.handleShift()
    }
    if (button == "{bksp}") {
      var newInputValue = this.state.input.slice(0, -1)
      this.setState({ input: newInputValue }, () => this.keyboard.setInput(newInputValue))
    }
    if (button !== "{bksp}" && button !== "{lock}" && button !== "{shift}" && button !== "{tab}") {
      var addValue = this.state.input.concat(button)
      console.log(addValue)
      this.setState({ input: addValue }, () => this.keyboard.setInput(addValue))
    }
  }
  handleShift = () => {
    let layoutName = this.state.layoutName;

    this.setState({
      layoutName: layoutName === "default" ? "shift" : "default"
    });
  };
  keyboard = {
    syncInstanceInputs: false
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <div className="container">
            <label htmlFor="custom-input">Email Address: </label>
            <input className="custom-input" type="text" value={this.state.input} readOnly onChange={(e) => this.onChangeInput(e)} onClick={() => this.setState({ isShowKeyboard: true })} />
            <button className="custom-button" onClick={() => this.setState({ isShowKeyboard: false })}>Done</button>
          </div>
          {this.state.isShowKeyboard ? <Keyboard keyboardRef={r => (this.keyboard = r)} layoutName={this.state.layoutName}
            onKeyPress={this.onKeyPress}
          /> : <></>}

        </header>
      </div>
    );
  }
}

export default App


