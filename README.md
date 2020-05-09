# sternm

sternm is a seed project, using Sockets, TypeScript, Express, React, Node, and mongo.

## Setup

To run sternm, you'll need to run two separate processes: the server, and client transpiler.

Open two tabs, cd into `client/` with one, and `server/` with the other. From each, run `npm i` to install the necessary parts, then run `npm start` to start their respective processes.

Then navigate to `localhost:3000`

The third module, `shared/` does nothing on its own, but contains shared code used by both `client/` and `server/`. It does contain some tests, however.