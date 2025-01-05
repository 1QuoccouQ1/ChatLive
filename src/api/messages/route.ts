import { NextResponse } from 'next/server'

// This is a mock database. In a real application, you'd use a proper database.
let messages = [
  { id: 1, sender: 'John', content: "Hi everyone, how's the project coming along?" },
  { id: 2, sender: 'Sarah', content: "Great progress! I've finished the design mockups." },
  { id: 3, sender: 'Mike', content: "Awesome! I'm halfway through the backend implementation." },
  { id: 4, sender: 'Emily', content: "I've started on the documentation. Let me know if you need any help!" },
]

export async function GET() {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 1000))
  return NextResponse.json(messages)
}

export async function POST(request: Request) {
  const { sender, content } = await request.json()
  const newMessage = {
    id: messages.length + 1,
    sender,
    content
  }
  messages.push(newMessage)
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 1000))
  return NextResponse.json(newMessage)
}

