# Admin Dashboard

Admin dashboard for managing VN Fashion website content.

## Installation

1. Install dependencies:
```bash
npm install
```

Required packages:
- react-router-dom
- lucide-react

## Running the Admin Dashboard

```bash
npm run dev
```

The admin dashboard will run on a separate port (typically http://localhost:5174 or similar).

## Features

### 1. Gallery Management (`/gallery`)
- Add/Edit/Delete gallery images
- Manage image details: Title, Image URL, Category, Description, Materials, Price

### 2. About Page Management (`/about`)
- Edit about text
- Update designer information (name, title, bio, image)

### 3. Achievements Management (`/achievements`)
- Add/Edit/Delete achievements
- Inline editing support

### 4. Timeline Management (`/timeline`)
- Add/Edit/Delete timeline items
- Manage: Year, Event, Description, Image, Event Date, Place, Creation Date

### 5. Services Management (`/services`)
- Add/Edit/Delete services
- Manage service details: Title, Image, Descriptions, Price

### 6. Categories Management (`/categories`)
- Add/Delete categories
- Cannot delete "All" category

### 7. Bookings Management (`/bookings`)
- View all bookings
- Auto-refreshes every 2 seconds
- Shows: First Name, Last Name, Email, Phone, Service/Design, Date, Time, Notes

### 8. Contacts Management (`/contacts`)
- View all contact messages
- Auto-refreshes every 2 seconds
- Shows: First Name, Last Name, Email, Phone, Message, Submitted At

## Data Storage

All data is stored in browser localStorage and persists across sessions.

## Responsive Design

- Mobile: Collapsible sidebar with overlay
- Tablet: Sidebar can be toggled
- Desktop: Sidebar always visible
