# 🎫 Velotix - High-Performance Event Ticketing Platform (Client)

#####

![Velotix Homepage](https://velotix-web.vercel.app/velotixbanner.png)

##### 


## 🚀 Project Overview

Velotix is a full-stack, high-performance event ticketing system designed to handle high concurrency and ensure financial integrity during seat booking. This frontend client, built with Next.js, provides a modern, responsive, and secure user experience for event discovery, seat selection, and ticket management.

The platform supports multiple user roles (User, Host, Admin, Super Admin) with segregated dashboard access and role-based permissions.

## ✨ Core Features & Functionality

### 1. Concurrency-Safe Booking Engine

- Real-time Seat Locking: Users can select seats on an interactive map, locking the seat across all clients in real-time (via Socket.io integration).

- Atomic Transactions: Integrated with a secure backend to prevent double-booking using database transactions.

- Payment Flow: Initiates secure payments via SSLCommerz and handles callback for success/fail states.

### 2. User & Authentication

- Role-Based Access Control (RBAC): Separate layouts and permissions for Users, Hosts, and Admins.

- Secure Authentication: JWT-based authentication with RTK Query's baseQueryWithRefresh for automatic token renewal.

- Google OAuth Sync: Implemented Google login/signup functionality.

### 3. Dashboard Management

- Admin/Super Admin Management: Comprehensive tables (/dashboard/administrator/users) to view and manage all users.

- Secure Status Update: Modals for updating user roles and account status with hierarchy protection (Admins cannot modify Super Admins).

- Host Management: Dedicated sections for Hosts to create new events and view their specific event bookings.

- User Bookings: Users can view their purchased tickets (/user/my-bookings).

### 4. Ticket Delivery & Validation

- Ticket View: Confirmation page and a modal (ticket-view-dialog.tsx) to display confirmed tickets.

- QR Code Integration: Fetches a secure Base64 QR code image for physical ticket validation.

### 💻 Technology Stack
~~~
Category                              Technology                                Key Component / Implementation

Framework                             Next.js (App Router)                      Hybrid Rendering (SSR/Client Components), Route Protection

Styling                               Tailwind CSS                              Utility-first, Custom Theming

UI Library                            Shadcn UI                                 Accessible, headless components (Dialog, Table, Form, Select)

State Management                      Redux Toolkit + RTK Query                 Centralized state, Advanced API caching, Token Refresh

Forms                                 React Hook Form + Zod                     Schema validation and form management

Deployment                            Vercel, Render                            Continuous Integration/Deployment
~~~

## ⚙️ Getting Started

This is a Next.js project bootstrapped with create-next-app.

#### Prerequisites

- Node.js (v18+)

- bun (or npm/yarn)

- Access to the Velotix Backend server (running locally or deployed).

## Installation Steps

###### 1. Clone the Repository:

```
git clone https://github.com/codewithsaidul/velotix-web
cd velotix-web
```

###### 2. Install Dependencies (using bun):

```
bun install
```

###### 3. Configure Environment Variables: Create a ```.env.local ``` file in the root directory and add the following variables:


~~~
# --- Backend Connection ---
NEXT_PUBLIC_API_BASE_URL=http://localhost:5000/api/v1 

# --- Google OAuth (for integration) ---
NEXT_PUBLIC_GOOGLE_CLIENT_ID=... 
~~~

###### 4.Running the Server

First, run the development server:

```
bun run dev
# or
npm run dev
# or
yarn dev
# or
pnpm dev

```
Open http://localhost:3000 with your browser to see the result.

## 🔑 Access Credentials

To review the full functionality, please use the following credentials:
~~~
Role                         Email                                       Password

Super Admin                  admin@ticketflow.com                        Ad@@1234

Host                         event@gmail.com                             12345678

User                         user@gmail.com                              12345678
~~~

## 💡 Learn More

- Next.js Documentation - learn about Next.js features and API.

- Learn Next.js - an interactive Next.js tutorial.

## 🚀 Deploy on Vercel

The easiest way to deploy your Next.js app is to use the Vercel Platform from the creators of Next.js.

Check out our Next.js deployment documentation for more details.