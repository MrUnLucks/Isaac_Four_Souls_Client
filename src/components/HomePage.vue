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
import { ref } from 'vue'
import { useWebsocket } from '@/composables/useWebsocket'
import {
  joinRoomMessage,
  createRoomMessage,
  leaveRoomMessage,
  pingMessage,
  destroyRoomMessage,
} from '@/utils/serverMessages'

const { isConnected, sendMessage, socket } = useWebsocket()

const connectionId = ref('')
const playerName = ref('Player1')
const roomName = ref('TestRoom')
const roomId = ref('')
const playerId = ref('')
const errorMessage = ref('')
const messagesArray = ref<string[]>([])

socket.onmessage = (message) => {
  messagesArray.value.push(JSON.stringify(message.data))
  const connectionid = JSON.parse(message.data).Connection_id
  if (connectionid) {
    connectionId.value = connectionid
  }
  const roomcreated = JSON.parse(message.data).RoomCreated
  if (roomcreated) {
    roomId.value = roomcreated.room_id
    playerId.value = roomcreated.player_id
  }
  const playerjoined = JSON.parse(message.data).PlayerJoined
  if (playerjoined) {
    playerId.value = playerjoined.player_id
  }
  const error = JSON.parse(message.data).Error
  if (error) {
    errorMessage.value = error.message
  }
}

const message = ref('')
const send = () => {
  sendMessage(message.value)
}

const ping = () => {
  socket.send(pingMessage())
}

const createRoomHandler = () => {
  socket.send(createRoomMessage(roomName.value, playerName.value))
}

const destroyRoomHandler = () => {
  socket.send(destroyRoomMessage(roomId.value))
}

const joinRoomHandler = () => {
  socket.send(joinRoomMessage(connectionId.value, playerName.value, roomId.value))
}

const leaveRoomHandler = () => {
  socket.send(leaveRoomMessage(connectionId.value))
}
</script>

<style scoped></style>
