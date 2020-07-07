# Purpose of Talk

Introduce Websockets and SSE from a theoretical and practical perspective.


## Method

Discuss the use case of HTTP, then the use case for real time communications.

Compare traditional HTTP protocol vs. WSS and SSE by demonstrating HTTP, then raw sockets, explain the differences with websockets, then demonstrate websockets.

Dive into some of my personal WSS patterns.

Discuss some libraries/tools.


# Presentation Outline

- Why am I doing a presentation on WSS and SSE?
    - WSS is powerful and I had a lot of fun with it when making (near) real-time browser based games
        - show demo/video
    - SSE is less known (and not as supported as WSS) and also very useful
    - Data sent over WSS is less structured, want to share some ways to stay organized for less friction when communicating
- Start at basic web, HTTP protocol
    - http _is_ bidirectional network data communication over a network socket, just with rules
    - [node http example](./node-http.js)
        - familiar?
    - Quick: what is `nc`? (demo)
        - Demonstrate two way communication _without http_
        - `man nc`
        - _availability_ should be in most linux installs by default, use `homebrew` for osx, and must be downloaded for windows
        - _disclaimer_, don't run `nc` commands that you don't understand, it's very powerful, and can powerfully mess up your day
    - [nc http example](./nc-http.sh)
        - raw, still http
