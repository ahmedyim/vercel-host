import React from "react";
class Hero extends React.Component {
  constructor(props) {
    super(props);
    this.state = { counter: 0 };
  }
  render() {
    return (
      <div>
        {!this.props.isLoggedin && <div>Hero</div>}
        {this.props.isLoggedin && (
          <div>
            Welcome to Mizan
            <div>
              <button onClick={() => this.setState({ counter:this.state.counter-1  })}>-</button>
              <small>{this.state.counter}</small>
              <button  onClick={() => this.setState({ counter:this.state.counter+1 })}>+</button>
            </div>
          </div>
        )}
      </div>
    );
  }
}
export default Hero
