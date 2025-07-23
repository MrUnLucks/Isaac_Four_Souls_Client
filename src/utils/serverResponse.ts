type WebSocketMessage =
  | { pong: null }
  | { chat: { player_name: string; message: string } }
  | { room_created: { room_id: string; player_id: string } }
  | { room_destroyed: null }
  | { player_joined: { player_name: string; player_id: string } }
  | { player_left: { player_name: string } }
  | { players_ready: { players_ready: boolean } }
  | { game_started: null }
  | { error: { message: string } }

export const handleMessage = (msg: MessageEvent<string>): WebSocketMessage => {
  return JSON.parse(msg.data)
}
