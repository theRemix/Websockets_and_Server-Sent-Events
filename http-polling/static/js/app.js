import React, { useState, useEffect, useRef } from 'react'
import { render } from 'react-dom'

const POLL_INTERVAL = 2000

const ActivityLog = ({ sourcePlayer, targetPlayer, type, weapon }) =>
  <li className={`eventLog eventType-${type}`}>
    <div className='sourcePlayer'>
      <img className='avatar' src={`./images/${sourcePlayer.avatar}`} />
      <span className='name'>{sourcePlayer.name}</span>
      <img className='weapon' src={`./images/${weapon.graphic}`} />
    </div>

    <div className='targetPlayer'>
      <span className='name'>{targetPlayer.name}</span>
      <img className='avatar' src={`./images/${targetPlayer.avatar}`} />
    </div>
  </li>

const App = () => {
  const [logs, setLogs] = useState([])
  const timeout = useRef(null)

  useEffect(() => {
    timeout.current = setTimeout(() =>
      fetch('/api/game-events')
        .then(res => res.json())
        .then(setLogs)
    , POLL_INTERVAL)
  }, [logs])

  return <ul className='eventLogs'>
    { logs.map(log =>
      <ActivityLog
        key={log.id}
        sourcePlayer={log.sourcePlayer}
        targetPlayer={log.targetPlayer}
        type={log.type}
        weapon={log.weapon}
      />
    )}
  </ul>
}

render(<App />, document.querySelector('#container'))
