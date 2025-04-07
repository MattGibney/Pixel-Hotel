# Websockets

The Habbo client communicates with the server using web sockets. This allows for
real-time communication between the client and server. The client and server
communicate via a prorietary protocol that is not documented. A big part of this
project is to reverse engineer this protocol so that we can understand how the
client and server communicate. There have been plenty of projects that have
replicated server functionality in the past, but there hasn't been (to my
knowledge) a concerted effort to fully understand and document the protocol
that the client and server use to communicate. Many of the projects that I have
reviewd ahead of this work but don't explain how they work. Many of them don't
appear to fully understand what they are actually doing, only that if they do
something, it works.

## Open connections

When the client connects to the server, an open connection is establisted on the
primary port. This is the serever and port that the Browser HTML defines. This
connection is then held open for the duration of the session. If the connection
is severed, the client will throw an error and ask the user to refresh their
page and start again.

Whenever the user wishes to enter a public room, the client will open a new
connection to the server on a different port. This is the port that is defined
in the room's data. This connection is also held open for the duration of the
session. While a user is in a room, there are two open sockets. One for the
primary connection and one for the room connection. When the user wishes to
leave the room, a signal is sent to the server informing it that the player
wishes to leave and the server terminates the connection.
