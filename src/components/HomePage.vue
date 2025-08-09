<template>
  <div class="websocket-demo">
    <div class="status">
      <p>Connection id: {{ connectionId }}</p>
      <span v-if="isConnected">✅ Connected</span>
      <span v-else>❌ Disconnected</span>
    </div>
    <br />
    <p>Current Room ID: {{ roomId }}</p>
    <p>Current player ID: {{ playerId }}</p>
    <p style="color: red">{{ errorMessage }}</p>

    <br />
    <div v-if="!playerId">
      <p>Player Name:</p>
      <input type="text" v-model="playerName" />
      <br />
      <p>Room name:</p>
      <input type="text" v-model="roomName" />
      <button @click="createRoomHandler">Create room</button>
      <button @click="destroyRoomHandler">Destroy room</button>
      <p>Room Id:</p>
      <input type="text" v-model="roomId" />
      <button @click="joinRoomHandler">Join room</button>
      <button @click="leaveRoomHandler">Leave room</button>
      <br />
      <br />
    </div>
    <div v-else>
      <button style="background-color: green" @click="ready">Ready</button>
      <p>Chat:</p>
      <textarea name="" id="" v-model="chatMessageObj"></textarea>
      <br />
      <button @click="sendChatMessageHandler">Send Message</button>
      <button @click="passTurn">Pass Turn</button>
      {{ turnOrder }}
    </div>
    <br />
    <br />
    <div class="controls">
      <button @click="ping">Send Ping</button>
      <p>Message:</p>
      <textarea name="" id="" v-model="message"></textarea>
      <br />
      <button @click="send" :disabled="!isConnected">Send Message</button>
    </div>
    <div class="messages">
      <h3>Received Messages:</h3>
      <div v-for="(msg, index) in messagesArray" :key="index" class="message">
        {{ msg }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import {
  joinRoomMessage,
  createRoomMessage,
  leaveRoomMessage,
  pingMessage,
  destroyRoomMessage,
  playerReadyMessage,
  chatMessage,
  passTurnMessage,
} from '@/utils/serverMessages'

const generateUniquePlayerName = () => {
  const timestamp = Date.now()
  const random = Math.floor(Math.random() * 1000)
  return `Player_${timestamp}_${random}`
}

//Temporary for testing purposes
const connectionId = ref('')
const playerName = ref(generateUniquePlayerName())
const roomName = ref('TestRoom')
const roomId = ref('')
const playerId = ref('')
const errorMessage = ref('')
const chatMessageObj = ref('')
const messagesArray = ref<string[]>([])
const isConnected = ref(false)
const turnOrder = ref([])
const isPlayerActive = ref(false)

let socket: WebSocket | null = null

onMounted(() => {
  socket = new WebSocket('ws://localhost:8080')

  socket.onopen = () => {
    console.log('WebSocket connected for this tab')
    isConnected.value = true
  }

  socket.onmessage = (messageEvent) => {
    console.log('Message received in this tab:', messageEvent.data)
    messagesArray.value.push(JSON.stringify(messageEvent.data))

    const data = JSON.parse(messageEvent.data)

    if (data.ConnectionId) {
      connectionId.value = data.ConnectionId.connection_id
    }

    if (data.RoomCreated) {
      // Handle room listings
    }

    if (data.TurnOrder) {
      turnOrder.value = data.TurnOrder
    }

    if (data.TurnChangeResult) {
      if (data.TurnChangeResult) {
        isPlayerActive.value = false
      }
    }

    if (data.PlayerJoined) {
      // Handle player connection o nfrontend
    }

    if (data.SelfJoined) {
      playerId.value = data.SelfJoined.player_id
      playerName.value = data.SelfJoined.player_name
    }

    if (data.FirstPlayerRoomCreated) {
      roomId.value = data.FirstPlayerRoomCreated.room_id
      playerId.value = data.FirstPlayerRoomCreated.player_id
    }

    if (data.Error) {
      errorMessage.value = JSON.stringify(data.Error.message)
    }
  }

  socket.onclose = () => {
    console.log('WebSocket disconnecteb')
    isConnected.value = false
  }
})

const message = ref('')
const send = () => {
  if (!socket) return
  socket.send(message.value)
}

const ping = () => {
  if (!socket) return
  socket.send(pingMessage())
}

const ready = () => {
  if (!socket) return
  socket.send(playerReadyMessage())
}

const createRoomHandler = () => {
  if (!socket) return
  socket.send(createRoomMessage(roomName.value, playerName.value))
}

const destroyRoomHandler = () => {
  if (!socket) return
  socket.send(destroyRoomMessage(roomId.value))
}

const sendChatMessageHandler = () => {
  if (!socket) return
  socket.send(chatMessage(chatMessageObj.value))
  chatMessageObj.value = ''
}

const joinRoomHandler = () => {
  if (!socket) return
  socket.send(joinRoomMessage(playerName.value, roomId.value))
}

const leaveRoomHandler = () => {
  if (!socket) return
  socket.send(leaveRoomMessage())
}

const passTurn = () => {
  if (!socket) return
  socket.send(passTurnMessage())
}
</script>

<style scoped></style>
