/* eslint-disable @typescript-eslint/no-explicit-any */


export interface IEvent {
  seatLayout: SeatLayout
  _id: string
  title: string
  description: string
  slug: string
  date: string
  location: string
  category: string
  mode: string
  organizer: Organizer
  minParticipants: number
  maxParticipants: number
  status: string
  isDeleted: boolean
  zones: any[]
  createdAt: string
  updatedAt: string
  image?: string
}

export interface SeatLayout {
  rows: number
  cols: number
  basePrice: number
  matrix: number[][]
}

export interface Organizer {
  _id: string
  name: string
  email: string
}
