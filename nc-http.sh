# server
# -l listen
# -N shutdown after EOF

nc -lN 8080


# client

nc localhost 8080

GET / HTTP/1.1


# server

HTTP/1.1 200 OK

hello world


# client

curl localhost:8080


# server

HTTP/1.1 200 OK

hello world

