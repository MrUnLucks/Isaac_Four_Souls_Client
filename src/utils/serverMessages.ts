export type ServerMessage =
  | { Ping: null }
  | { Chat: { message: string } }
  | { CreateRoom: { room_name: string; first_player_name: string } }
  | { DestroyRoom: { room_id: string } }
  | { JoinRoom: { player_name: string; room_id: string } }
  | { LeaveRoom: null }
  | { PlayerReady: null }
  | { TurnPass: null }

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
export function joinRoomMessage(player_name: string, room_id: string): string {
  const msg: ServerMessage = { JoinRoom: { player_name, room_id } }
  return JSON.stringify(msg)
}

// Function for LeaveRoom message
export function leaveRoomMessage(): string {
  const msg: ServerMessage = { LeaveRoom: null }
  return JSON.stringify(msg)
}

// Function for PlayerReady message
export function playerReadyMessage(): string {
  const msg: ServerMessage = { PlayerReady: null }
  return JSON.stringify(msg)
}

// Function for Ping message
export function passTurnMessage(): string {
  const msg: ServerMessage = { TurnPass: null }
  return JSON.stringify(msg)
}
