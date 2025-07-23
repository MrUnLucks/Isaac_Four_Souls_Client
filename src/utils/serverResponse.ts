export function serverError() {
  return {
    player_not_found: 'PlayerNotFound',
    room_not_found: 'RoomNotFound',
    unknown_response: 'UnknownResponse',
  } as const
}

// ServerResponse enum as function
export function serverResponse() {
  return {
    pong: () => ({ Pong: {} }),

    chat_message: (player_name: string, message: string) => ({
      ChatMessage: {
        player_name,
        message,
      },
    }),

    room_created: (room_id: string, player_id: string) => ({
      RoomCreated: {
        room_id,
        player_id,
      },
    }),

    room_destroyed: () => ({ RoomDestroyed: {} }),

    player_joined: (player_name: string, player_id: string) => ({
      PlayerJoined: {
        player_name,
        player_id,
      },
    }),

    player_left: (player_name: string) => ({
      PlayerLeft: {
        player_name,
      },
    }),

    players_ready: (players_ready: Set<string>) => ({
      PlayersReady: {
        players_ready,
      },
    }),

    game_started: () => ({ GameStarted: {} }),

    error: (message: ReturnType<typeof serverError>[keyof ReturnType<typeof serverError>]) => ({
      Error: {
        message,
      },
    }),
  } as const
}
