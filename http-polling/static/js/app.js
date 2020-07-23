import React, { useState, useEffect } from 'react'
import { render } from 'react-dom'

const POLL_INTERVAL = 2000

const ActivityLog = ({ placeholder }) => <li>{placeholder}</li>

const App = () => {

  const [logs, setLogs] = useState([])

  useEffect(() => {
    setInterval(() =>
      fetch('/api/game-events')
        .then(res => res.json())
        .then(setLogs)
    ,POLL_INTERVAL)
  }, [])

  return <ul>
    { logs.map(log => <ActivityLog key={log.id} placeholder={log.id} />) }
  </ul>
}

render(<App />, document.querySelector('#container'))
