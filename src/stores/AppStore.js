import dispatcher from "../Dispatcher"
import {EventEmitter} from "events"

import jQuery from 'jquery'
import Clone from 'clone'

import cardsPath from '../cards/standardDeck'

const CHANGE_EVENT = 'app_change'

const SET_SHUFFLED_DECK = 'set-shuffled-deck'
const UPDATE_CURRENT_DECK = 'update-current-deck'
const UPDATE_CURRENT_CARD = 'update-current-card'

var _cardDeck = []
var currentDeck = []
var currentDealtCard = {}

class AppStore extends EventEmitter {
  setup() {
    return jQuery.getJSON(cardsPath, function(result){
      _cardDeck = result
      currentDeck = Clone(_cardDeck)
      appStore.emitChange()
    })
  }
  getOgDeck() {
    currentDeck = Clone(_cardDeck)
    return currentDeck
  }
  setShuffledDeck(newDeck) {
    currentDeck = newDeck
  }
  getCurrentDeck() {
    return currentDeck
  }
  updateDeck(deck) {
    currentDeck = deck
  }
  updateCard(card, deck) {
    currentDealtCard = card
    currentDeck = deck
  }
  getCurrentCard() {
    return currentDealtCard
  }
  addChangeListener(callback) {
    this.on(CHANGE_EVENT, callback)
  }
  removeChangeListener(callback) {
    this.removeListener(CHANGE_EVENT, callback)
  }
  emitChange() {
    this.emit(CHANGE_EVENT)
  }
  handleActions(payload) {
    switch (payload.actionType) {
      case SET_SHUFFLED_DECK:
        appStore.setShuffledDeck(payload.newDeck)
        appStore.emitChange()
        break
      case UPDATE_CURRENT_DECK:
        appStore.updateDeck(payload.currentDeck)
        appStore.emitChange()
        break
      case UPDATE_CURRENT_CARD:
        appStore.updateCard(payload.currentCard, payload.currentDeck)
        appStore.emitChange()
        break
      default:
        break
    }
  }
}

const appStore = new AppStore();
dispatcher.register(appStore.handleActions.bind(appStore));
export default appStore;
