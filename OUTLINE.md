# Purpose of Talk

Introduce Websockets and SSE from a theoretical and practical perspective.


## Method

Discuss the use case of HTTP, then the use case for real time communications.

Compare traditional HTTP protocol vs. WSS and SSE by demonstrating HTTP, then raw sockets, explain the differences with websockets, then demonstrate websockets.

Dive into some of my personal WSS patterns.

Discuss some libraries/tools.


# Presentation Outline

- Who am I
- Why am I doing a presentation on WSS and SSE?
- Explain basic HTTP for contrast
- Explain bidirectional communication over network sockets
- Live code WSS
    - caveats
- Live code SSE
- OP payloads
- Abstractions - Colyseus
- Discussion

## Who am I

- quick bio

## Why am I doing a presentation on WSS and SSE?

- WSS is powerful and I had a lot of fun with it when making (near) real-time browser based games
    - Dragons vs. Unicorns
    - The Gauntlet demo video
        - 1st session (1:57:40) 1:59:00 https://us02web.zoom.us/rec/play/ucZ_c72op2g3HNKWuASDVvJ8W425K6KsgyhPqfZfzhmxByRRMFWvMrVHN-bWaTMnIMElxnIpimD0HAD1?autoplay=true&startTime=1591321101000
        - 2nd session 14:00 https://us02web.zoom.us/rec/play/tMZ7IuugrTk3TtCU5gSDAvYvW429KKyshHRI-fJeykvkU3YLY1eiZrdAMbMiRxqdeibgl8gusWOnocU7?autoplay=true&startTime=1592794584000
- SSE is less known (and not as supported as WSS) and also very useful
- Data sent over WSS is less structured, want to share some ways to stay organized for less friction when communicating


## Explain basic HTTP for contrast

- http _is_ bidirectional network data communication over a network socket, just with rules
- [node http example](./node-http.js)
    - familiar?
    - curl and browser test
        - curl: (8) Weird server reply
    - make it speak http
        - curl and browser test
        - add custom headers
- Quick: what is `nc`? (demo)
    - Demonstrate two way communication _without http_
    - `man nc`
    - _availability_ should be in most linux installs by default, use `homebrew` for osx, and must be downloaded for windows
    - _disclaimer_, don't run `nc` commands that you don't understand, it's very powerful, and can powerfully mess up your day
- [nc http example](./nc-http.sh)
    - raw, still http
        - client must close after write!
    - [node bidi example](./node-bidi.js)

## Explain bidirectional communication over network sockets

- read and write from sockets
- node-bidi.js

## Live code WSS

- debug wss
- slack wss
    - wss receive message
    - wss i'm typing
    - POST send message

### Caveats

Extra work when using more than a single process.

## Live code SSE

- debug sse

### Caveats

Browser Support
https://developer.mozilla.org/en-US/docs/Web/API/Server-sent_events/Using_server-sent_events

## OP payloads

- https://github.com/GomaGames/dragons-vs-unicorns
    - server/ws/index.js
    - server/ws/client.js
    - https://github.com/GomaGames/dragons-vs-unicorns/blob/master/src/app/game/game.component.ts

## Abstractions and Alternatives

- Colyseus : https://colyseus.io/
- Topic based PubSub pattern


## Discussion

Other wss abstractions worth looking into?
Have you run into issues using wss?
Do you see benefits or use cases of SSE ?
Anything new on the horizon that solves a similar problem?

