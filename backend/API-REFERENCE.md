# Pocketbase API Quick Reference

## Base URL
```
http://localhost:8090
```

## Collections

### Users Collection: `users`
Built-in authentication collection.

**Fields:**
- `id` (string, auto)
- `email` (string, unique)
- `verified` (boolean)
- `name` (string, optional)
- `avatar` (file, optional)

### Tickets Collection: `tickets`
Main ticketing system collection.

**Fields:**
- `id` (string, auto)
- `user_id` (relation to users)
- `title` (string, required)
- `description` (text)
- `customer` (string)
- `priority` (select: low|medium|high|urgent)
- `status` (select: todo|in-progress|waiting|completed)
- `type` (select: callback|task)
- `due_date` (date)
- `callback_time` (date)
- `completed_at` (date, auto-set)
- `created` (datetime, auto)
- `updated` (datetime, auto)

---

## Authentication Endpoints

### Register
```http
POST /api/collections/users/records
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123",
  "passwordConfirm": "password123",
  "name": "John Doe"
}
```

### Login
```http
POST /api/collections/users/auth-with-password
Content-Type: application/json

{
  "identity": "user@example.com",
  "password": "password123"
}

Response:
{
  "token": "...",
  "record": { ... }
}
```

### Refresh Token
```http
POST /api/collections/users/auth-refresh
Authorization: Bearer <token>
```

### Request Password Reset
```http
POST /api/collections/users/request-password-reset
Content-Type: application/json

{
  "email": "user@example.com"
}
```

---

## Tickets Endpoints

### Create Ticket
```http
POST /api/collections/tickets/records
Authorization: Bearer <token>
Content-Type: application/json

{
  "user_id": "<current_user_id>",
  "title": "Fix critical bug",
  "description": "Bug description here",
  "customer": "Acme Corp",
  "priority": "high",
  "status": "todo",
  "type": "task",
  "due_date": "2025-10-15"
}
```

### List Tickets (Paginated)
```http
GET /api/collections/tickets/records?page=1&perPage=20&sort=-created
Authorization: Bearer <token>

Response:
{
  "page": 1,
  "perPage": 20,
  "totalItems": 50,
  "totalPages": 3,
  "items": [...]
}
```

### Get All Tickets (No Pagination)
```http
GET /api/collections/tickets/records?perPage=500
Authorization: Bearer <token>
```

### Get Single Ticket
```http
GET /api/collections/tickets/records/<ticket_id>
Authorization: Bearer <token>
```

### Update Ticket
```http
PATCH /api/collections/tickets/records/<ticket_id>
Authorization: Bearer <token>
Content-Type: application/json

{
  "status": "completed",
  "priority": "low"
}
```

### Delete Ticket
```http
DELETE /api/collections/tickets/records/<ticket_id>
Authorization: Bearer <token>
```

---

## Filtering & Search

### Filter by Status
```http
GET /api/collections/tickets/records?filter=status="todo"
```

### Filter by Priority
```http
GET /api/collections/tickets/records?filter=priority="urgent"
```

### Filter by Multiple Conditions
```http
GET /api/collections/tickets/records?filter=status="todo" && priority="high"
```

### Search in Text Fields
```http
GET /api/collections/tickets/records?filter=title~"bug" || description~"bug"
```

### Date Filters
```http
# Overdue tickets
GET /api/collections/tickets/records?filter=due_date<"2025-10-02" && status!="completed"

# Upcoming callbacks (next 24 hours)
GET /api/collections/tickets/records?filter=callback_time>="2025-10-02" && callback_time<="2025-10-03"
```

### Complex Filters
```http
GET /api/collections/tickets/records?filter=(status="todo" || status="in-progress") && priority="urgent" && customer~"Acme"
```

---

## Sorting

```http
# Sort by created date (newest first)
GET /api/collections/tickets/records?sort=-created

# Sort by priority (ascending)
GET /api/collections/tickets/records?sort=priority

# Sort by multiple fields
GET /api/collections/tickets/records?sort=-priority,created
```

---

## Real-time Subscriptions

### WebSocket Connection
```javascript
// Connect to Pocketbase
const pb = new PocketBase('http://localhost:8090');

// Subscribe to all tickets
pb.collection('tickets').subscribe('*', (e) => {
  console.log(e.action); // create, update, delete
  console.log(e.record); // the ticket record
});

// Subscribe to specific ticket
pb.collection('tickets').subscribe('<ticket_id>', (e) => {
  console.log('Ticket changed:', e);
});

// Unsubscribe
pb.collection('tickets').unsubscribe('<ticket_id>');
pb.collection('tickets').unsubscribe(); // unsubscribe from all
```

---

## Filter Operators

| Operator | Description | Example |
|----------|-------------|---------|
| `=` | Equals | `status="todo"` |
| `!=` | Not equals | `status!="completed"` |
| `>` | Greater than | `due_date>"2025-10-01"` |
| `<` | Less than | `due_date<"2025-10-31"` |
| `>=` | Greater or equal | `due_date>="2025-10-01"` |
| `<=` | Less or equal | `due_date<="2025-10-31"` |
| `~` | Contains (case-insensitive) | `title~"bug"` |
| `!~` | Not contains | `title!~"test"` |
| `?=` | Array contains | `tags?="important"` |
| `?!=` | Array not contains | `tags?!="spam"` |
| `&&` | AND | `status="todo" && priority="high"` |
| `\|\|` | OR | `status="todo" \|\| status="in-progress"` |

---

## Expand Relations

```http
# Expand user_id to get user details
GET /api/collections/tickets/records?expand=user_id

Response:
{
  "items": [
    {
      "id": "...",
      "title": "...",
      "user_id": "user123",
      "expand": {
        "user_id": {
          "id": "user123",
          "email": "user@example.com",
          "name": "John Doe"
        }
      }
    }
  ]
}
```

---

## Error Responses

### 400 Bad Request
```json
{
  "code": 400,
  "message": "Failed to create record.",
  "data": {
    "title": {
      "code": "validation_required",
      "message": "Missing required value."
    }
  }
}
```

### 401 Unauthorized
```json
{
  "code": 401,
  "message": "The request requires valid record authorization token to be set."
}
```

### 403 Forbidden
```json
{
  "code": 403,
  "message": "You are not allowed to perform this request."
}
```

### 404 Not Found
```json
{
  "code": 404,
  "message": "The requested resource wasn't found."
}
```

---

## JavaScript SDK Examples

### Using the SDK (Recommended)

```javascript
import PocketBase from 'pocketbase';

const pb = new PocketBase('http://localhost:8090');

// Login
const authData = await pb.collection('users').authWithPassword(
  'user@example.com',
  'password123'
);

// Create ticket
const ticket = await pb.collection('tickets').create({
  user_id: pb.authStore.model.id,
  title: 'New ticket',
  status: 'todo',
  priority: 'medium',
  type: 'task'
});

// List tickets
const tickets = await pb.collection('tickets').getFullList({
  sort: '-created',
  filter: 'status != "completed"'
});

// Update ticket
await pb.collection('tickets').update(ticket.id, {
  status: 'completed'
});

// Delete ticket
await pb.collection('tickets').delete(ticket.id);

// Real-time
pb.collection('tickets').subscribe('*', (e) => {
  console.log('Change:', e.action, e.record);
});
```

---

## Useful Queries

### Get Overdue Tickets
```javascript
const today = new Date().toISOString().split('T')[0];
const overdue = await pb.collection('tickets').getFullList({
  filter: `due_date < "${today}" && status != "completed"`,
  sort: 'due_date'
});
```

### Get Urgent Tickets
```javascript
const urgent = await pb.collection('tickets').getFullList({
  filter: 'priority = "urgent" && status != "completed"',
  sort: '-created'
});
```

### Get Tickets by Customer
```javascript
const tickets = await pb.collection('tickets').getFullList({
  filter: `customer ~ "Acme"`,
  sort: '-created'
});
```

### Get Upcoming Callbacks
```javascript
const now = new Date().toISOString();
const tomorrow = new Date(Date.now() + 24*60*60*1000).toISOString();

const callbacks = await pb.collection('tickets').getFullList({
  filter: `type = "callback" && callback_time >= "${now}" && callback_time <= "${tomorrow}" && status != "completed"`,
  sort: 'callback_time'
});
```

### Statistics (Client-side)
```javascript
const allTickets = await pb.collection('tickets').getFullList();

const stats = {
  total: allTickets.length,
  byStatus: {},
  byPriority: {},
  overdue: 0
};

allTickets.forEach(ticket => {
  stats.byStatus[ticket.status] = (stats.byStatus[ticket.status] || 0) + 1;
  stats.byPriority[ticket.priority] = (stats.byPriority[ticket.priority] || 0) + 1;

  if (ticket.due_date && ticket.due_date < today && ticket.status !== 'completed') {
    stats.overdue++;
  }
});
```

---

## Admin UI

Access the admin dashboard at:
```
http://localhost:8090/_/
```

Features:
- ✅ Manage collections
- ✅ View/edit records
- ✅ Configure access rules
- ✅ View logs
- ✅ Manage users
- ✅ Backup/restore
- ✅ Settings

---

## Environment Variables

Set in `.env` file:

```env
VITE_POCKETBASE_URL=http://localhost:8090
```

---

## Production Deployment

When deploying to production:

1. Change `VITE_POCKETBASE_URL` to your production URL
2. Set up HTTPS (Pocketbase supports Let's Encrypt)
3. Configure email SMTP settings
4. Set up regular backups
5. Consider using PostgreSQL instead of SQLite for better concurrency

Example production command:
```bash
pocketbase serve --http="0.0.0.0:8090" --https
```

---

## Backup & Restore

### Create Backup
```bash
pocketbase.exe admin backup
```

### Restore Backup
```bash
pocketbase.exe admin restore <backup_file>
```

Automatic backups are created in `pb_data/backups/` daily.

---

## Performance Tips

1. **Use indexes** - Already configured on frequently queried fields
2. **Limit results** - Use `perPage` parameter to limit results
3. **Use filters** - Filter on the server, not client-side
4. **Expand wisely** - Only expand relations when needed
5. **Cache results** - Store frequently accessed data in Pinia stores
6. **Real-time for updates only** - Don't rely on real-time for initial data load

---

For more details, see:
- Official docs: https://pocketbase.io/docs
- JavaScript SDK: https://github.com/pocketbase/js-sdk
