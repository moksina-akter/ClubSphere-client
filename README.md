# ClubSphere – Membership & Event Management for Local Clubs

## Project Overview

ClubSphere is a full-stack MERN web application designed to help people discover, join, and manage local clubs (e.g., photography clubs, hiking groups, book clubs, tech clubs). Through ClubSphere:

- **Members** can browse clubs & events, join clubs (free or paid), and manage their memberships and event registrations.
- **Club Managers** can create and manage their clubs and events, set membership fees, and view member lists.
- **Admins** oversee the entire platform, approve/reject clubs, promote/demote users, and monitor payments/statistics.

---

## Live Site

[Insert your live site link here]

---

## Admin Account (For Testing)

- **Email:** Hiya@gmail.com
- **Password:** Admin@123

---

## Key Features

### Public User Features

- Browse clubs by category and location
- View upcoming events and event details
- Search and filter clubs and events
- Register/Login with email/password or Google

### Member Dashboard

- Overview of clubs joined and events registered
- My Clubs: see active memberships, join dates, expiry
- My Events: registered events list with status
- Payment history (membership & event payments)

### Club Manager Dashboard

- Manage their clubs (Create/Update/Delete)
- Manage club members (view list, set membership expired)
- Manage events (Create/Update/Delete)
- View event registrations
- View payments received

### Admin Dashboard

- Overview of total users, clubs, memberships, events, and payments
- Manage users: change roles (member, clubManager, admin)
- Manage clubs: approve/reject pending clubs
- View all payments and transactions
- Charts/graphs for analytics

### Other Features

- Full CRUD operations on clubs and events
- Stripe payment integration for paid memberships and events
- Responsive design (mobile, tablet, desktop)
- Loading spinner/skeletons while fetching data
- Friendly error/404 pages
- Framer Motion animations for dynamic sections

---

## Database Design (MongoDB Collections)

| Collection             | Purpose                                                            |
| ---------------------- | ------------------------------------------------------------------ |
| **users**              | Store all registered users with roles (admin, clubManager, member) |
| **clubs**              | Club information with manager, status, membershipFee               |
| **memberships**        | Track user memberships, status, payment                            |
| **events**             | Event info linked to club, isPaid, maxAttendees                    |
| **eventRegistrations** | Track who registered for which event, payment info                 |
| **payments**           | Membership/event payments, Stripe transaction info                 |

---

## Technology Stack

- **Frontend:** React, React Router, React Hook Form, TanStack Query, Framer Motion, Tailwind/DaisyUI
- **Backend:** Node.js, Express.js
- **Database:** MongoDB
- **Authentication:** Firebase Auth (Email/Password + Google)
- **Payment:** Stripe (Test Mode)
- **Deployment:** Vercel / Netlify (client), Render / Railway / Heroku (server)

---

## Important NPM Packages Used

- `react`, `react-dom`, `react-router-dom`
- `react-hook-form`
- `@tanstack/react-query`
- `firebase`
- `axios`
- `stripe`
- `express`, `cors`, `mongodb`
- `dotenv`
- `framer-motion`
- `sweetalert2`

---

## Environment Variables

- **Firebase Config** (stored in `.env`):
