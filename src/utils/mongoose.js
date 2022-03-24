import { connect, connection, disconnect, connections } from 'mongoose'

const conn = {
  isConnected: false
}

export async function dbConnect () {
  if (conn.isConected) return

  if (connections.length > 0) {
    connection.isConnected = connections[0].readyState
    if (connection.isConnected === 1) {
      console.log('use previous connection')
      return
    }
    await disconnect()
  }
  const db = await connect(process.env.MONGO_URL)
  conn.isConnected = db.connections[0].readyState

  console.log(conn.isConnected)
}

connection.on('connected', () => {
  console.log('Mongodb connected to db')
})

connection.on('error', (err) => {
  console.error('Mongodb connected to', err.message)
})
