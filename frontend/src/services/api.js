const BASE = "http://localhost:9000";

export async function login(data) {
    const res = await fetch(`${BASE}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
    });

    return res.json();
}

export async function register(data) {
    const res = await fetch(`${BASE}/api/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
    });

    return res.json();
}

export async function fetchRooms() {
  const token = localStorage.getItem("token")

  const res = await fetch("http://localhost:9000/api/rooms", {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })

  return res.json()
}

export async function fetchMessages(roomId) {

  const token = localStorage.getItem("token")

  const res = await fetch(
    `http://localhost:9000/api/chat/message/${roomId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  )

  return res.json()
}

export async function sendMessage(roomId, content) {
  const token = localStorage.getItem("token")

  const res = await fetch(
    `http://localhost:9000/api/chat/message`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({
        room: roomId,
        content
      })
    }
  )

  return res.json()
}
