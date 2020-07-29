import React, { useState, useEffect, useRef } from 'react'
import { render } from 'react-dom'

const ActivityLog = ({ sourcePlayer, targetPlayer, type, weapon, onClick}) =>
  <li className={`eventLog eventType-${type}`} onClick={onClick}>

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
  const [likes, setLikes] = useState([])
  const events = useRef(null)

  useEffect(() => {
    events.current = new EventSource('/api/game-events')

    // clean up
    return () => events.current.close()
  }, [])


  useEffect(() => {
    if (!events.current) return

    events.current.onmessage = e => {
      const {op, payload} = JSON.parse(e.data)
      switch(op){
        case 'GAME_EVENT':
          if(logs.length > 3){ // purge older events
            setLogs([...logs.slice(-2), payload ])
          } else {
            setLogs([...logs, payload ])
          }
          break;
        case 'LIKE':
          if(likes.length > 10){ // purge older likes
            setLikes([...likes.slice(-9), payload ])
          } else {
            setLikes([...likes, payload ])
          }
          break;
        default:
          console.error(`OP NOT IMPLEMENTED: ${op}`)
      }

    }

  }, [logs, likes]);

  const clickLike = e => {
    fetch('/api/like', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        id: Date.now(), // should be current eventLog ID
        x: e.pageX,
        y: e.pageY
      })
    })
  }

  return <ul className='eventLogs'>
    <div className='likes'>
      { likes.map(({id,x,y}) =>
        <div key={`${id}-${x}-${y}`} className='like' style={{left: x-10, top: y-5}}></div>
      ) }
    </div>
    { logs.map(log =>
        <ActivityLog
          key={log.id}
          sourcePlayer={log.sourcePlayer}
          targetPlayer={log.targetPlayer}
          type={log.type}
          weapon={log.weapon}
          onClick={clickLike}
        />
      )
    }
  </ul>
}

render(<App />, document.querySelector('#container'))
