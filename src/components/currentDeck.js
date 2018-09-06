import React, { Component } from 'react'

class CurrentDeck extends Component {
  render() {
    if(this.props.currentDeck === undefined) {
      return ( <div>No current cards.</div> )
    }
    return (
      <div className="current-deck">
        <p>Current Deck in Hand</p>
        <ul>
        {this.props.currentDeck.map(function(c) {
          return (<li key={c.name} style={{color: `${c.color}` }}>{c.name}</li>)
        })}
        </ul>
      </div>
    )
  }
}

export default CurrentDeck;
