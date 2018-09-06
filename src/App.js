import React, { Component } from 'react';
import Dispatcher from './Dispatcher.js'
import"../node_modules/bootstrap/dist/css/bootstrap.min.css"
import"../node_modules/bootstrap/dist/js/bootstrap.min.js"
import './App.css';

import AppStore from './stores/AppStore.js'

import CurrentDeck from './components/currentDeck.js'

class App extends Component {
  constructor() {
    super()

    this.state = {
      currentDeck: AppStore.getCurrentDeck(),
      currentCard: {}
    }

    this.pickUpCards = this.pickUpCards.bind(this)
    this._onChange = this._onChange.bind(this)
  }
  componentWillUnmount() {
    AppStore.removeChangeListener(this._onChange)
  }
  shuffleCards(currentDeck) {
    var newDeck = []
    var cardsRemaining = currentDeck.length
    Object.values(currentDeck).map(function(card) {
      var randomChoice = Math.floor(Math.random() * cardsRemaining - 1)
      newDeck.splice(randomChoice, 0, card)
      cardsRemaining--
    })
    Dispatcher.dispatch({
      actionType: 'set-shuffled-deck',
      newDeck: newDeck
    })
  }
  dealTopCard(currentDeck) {
    if(currentDeck.length === 0) {
      alert('No cards left! Please reset the deck.')
      return
    }
    var card = currentDeck[0]
    currentDeck.shift()
    Dispatcher.dispatch({
      actionType: 'update-current-card',
      currentCard: card,
      currentDeck: currentDeck
    })
  }
  pickUpCards() {
    this.setState({ currentDeck: AppStore.getOgDeck(), currentCard: {} })
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Robots & Pencils Full Stack Robot Challenge</h1>
        </header>
        <p className="reset-deck">
          <button className="reset-button" onClick={() => this.pickUpCards()} >Reset Deck</button>
        </p>
        <div className="row card-contents">
          <div className="col-sm-12 col-md-9">
            <div className="row">
              <div className="col-sm-12 col-md-6">
                <button className="card-button" onClick={() => this.shuffleCards(this.state.currentDeck)}>Shuffle Cards</button>
              </div>
              <div className="col-sm-12 col-md-6">
                <button className="card-button" onClick={() => this.dealTopCard(this.state.currentDeck)} disabled={this.state.currentDeck.length === 0 ? true : false} >Deal One Card</button>
                <p>Current Card Dealt:</p>
                <p className="current-card" style={{color: `${this.state.currentCard.color}` }} >{(this.state.currentCard.name !== undefined) ? `${this.state.currentCard.name}` : 'No Cards Currently Dealt.'}</p>
              </div>
            </div>
          </div>
          <div className="col-sm-12 col-md-3">
            <CurrentDeck currentDeck={this.state.currentDeck} />
          </div>
        </div>
      </div>
    )
  }
  componentDidMount() {
    AppStore.addChangeListener(this._onChange)
  }
  _onChange() {
    this.setState({
      currentDeck: AppStore.getCurrentDeck(),
      currentCard: AppStore.getCurrentCard()
    })
  }
}

export default App;
