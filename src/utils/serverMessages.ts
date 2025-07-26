export type ServerMessage =
  | { Ping: null }
  | { Chat: { message: string } }
  | { CreateRoom: { room_name: string; first_player_name: string } }
  | { DestroyRoom: { room_id: string } }
  | { JoinRoom: { connection_id: string; player_name: string; room_id: string } }
  | { LeaveRoom: { connection_id: string } }
  | { PlayerReady: { player_id: string } }

// Function for Ping message
export function pingMessage(): string {
  const msg: ServerMessage = { Ping: null }
  return JSON.stringify(msg)
}

// Function for Chat message
export function chatMessage(message: string): string {
  const msg: ServerMessage = { Chat: { message } }
  return JSON.stringify(msg)
}

// Function for CreateRoom message
export function createRoomMessage(roomName: string, firstPlayerName: string): string {
  const msg: ServerMessage = {
    CreateRoom: { room_name: roomName, first_player_name: firstPlayerName },
  }
  return JSON.stringify(msg)
}

// Function for DestroyRoom message
export function destroyRoomMessage(room_id: string): string {
  const msg: ServerMessage = { DestroyRoom: { room_id } }
  return JSON.stringify(msg)
}

// Function for JoinRoom message
export function joinRoomMessage(
  connection_id: string,
  player_name: string,
  room_id: string,
): string {
  const msg: ServerMessage = { JoinRoom: { connection_id, player_name, room_id } }
  return JSON.stringify(msg)
}

// Function for LeaveRoom message
export function leaveRoomMessage(connection_id: string): string {
  const msg: ServerMessage = { LeaveRoom: { connection_id } }
  return JSON.stringify(msg)
}

// Function for PlayerReady message
export function playerReadyMessage(player_id: string): string {
  const msg: ServerMessage = { PlayerReady: { player_id } }
  return JSON.stringify(msg)
}
