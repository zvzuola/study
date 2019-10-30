import React, { Component, useReducer } from 'react'
import logo from './logo.svg'
import './App.css'
import InfinityScroll from './InfinityScroll'

class App extends Component {
  render() {
    return (
      <div className="App">
        <TodoList />
      </div>
    )
  }
}

interface Item {
  id: number
  text: string
}

function reducer(state: Item[], action: any) {
  switch (action.type) {
    case 'add':
      return [
        ...state,
        {
          text: '',
          id: Date.now()
        }
      ]
    default:
      return state
  }
}

function TodoList() {
  const [state, dispatch] = React.useReducer(reducer, [])
  return (
    <div>
      <h3>todo list</h3>
      <TodoItem state={state} />
      <button onClick={() => dispatch({ type: 'add' })}>add</button>
      <h3>无限滚动</h3>
      <InfinityScroll />
    </div>
  )
}

function TodoItem({ state }: any) {
  return state.map((item: Item) => <div key={item.id}><input defaultValue={'' + item.id} /></div>)
}

export default App
