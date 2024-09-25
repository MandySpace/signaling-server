# WebRTC Signaling Server

This is a simple signaling server for WebRTC applications, built with Node.js, Express, and Socket.IO. It facilitates the exchange of session information between peers, enabling them to establish direct peer-to-peer connections for real-time communication.

## Features

- Room-based signaling
- Support for WebRTC offer/answer exchange
- ICE candidate relaying
- Cross-Origin Resource Sharing (CORS) enabled

## Installation

1. Clone the repository:

   ```
   git clone https://github.com/your-username/webrtc-signaling-server.git
   ```

2. Navigate to the project directory:

   ```
   cd webrtc-signaling-server
   ```

3. Install the dependencies:
   ```
   npm install
   ```

## Usage

1. Start the server:

   ```
   npm start
   ```

2. The server will start running on `http://localhost:3001` (or the port specified in your environment variables).

3. In your WebRTC client application, connect to the signaling server using Socket.IO. For example:

   ```javascript
   const socket = io("http://localhost:3001");
   ```

4. Use the following events to communicate with the server:
   - `join`: Join a room
   - `offer`: Send a WebRTC offer
   - `answer`: Send a WebRTC answer
   - `ice-candidate`: Send an ICE candidate

## API

### Socket.IO Events

- `join`: Join a room

  ```javascript
  socket.emit("join", roomId);
  ```

- `offer`: Send a WebRTC offer

  ```javascript
  socket.emit("offer", offer, targetId);
  ```

- `answer`: Send a WebRTC answer

  ```javascript
  socket.emit("answer", answer, targetId);
  ```

- `ice-candidate`: Send an ICE candidate
  ```javascript
  socket.emit("ice-candidate", candidate, targetId);
  ```

## Configuration

The server uses the following environment variables:

- `PORT`: The port on which the server will run (default: 3000)

You can set these variables in a `.env` file in the root of your project.

## Contributing

Contributions to this project are welcome. Please follow these steps:

1. Fork the repository
2. Create a new branch: `git checkout -b feature-branch-name`
3. Make your changes and commit them: `git commit -m 'Add some feature'`
4. Push to the original branch: `git push origin feature-branch-name`
5. Create the pull request

Alternatively, see the GitHub documentation on [creating a pull request](https://help.github.com/articles/creating-a-pull-request/).

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.

## Acknowledgements

- [Socket.IO](https://socket.io/)
- [Express](https://expressjs.com/)
- [WebRTC](https://webrtc.org/)
