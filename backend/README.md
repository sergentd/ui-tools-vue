# Pocketbase Backend for UI Tools Atelier

## Quick Start

1. **Start Pocketbase**:
   ```bash
   ./start.bat
   ```

2. **Access Admin UI**:
   - Open http://localhost:8090/_/
   - Create your admin account on first run

3. **API Endpoint**:
   - http://localhost:8090/api/

## Collections

### tickets
Main collection for the ticketing system.

**Fields**:
- `user_id` (relation) - Owner of the ticket
- `title` (text) - Ticket title
- `description` (text) - Full description
- `customer` (text) - Customer name
- `priority` (select) - low, medium, high, urgent
- `status` (select) - todo, in-progress, waiting, completed
- `type` (select) - callback, task
- `due_date` (date) - When ticket is due
- `callback_time` (date) - When to call back (required for callback type)
- `completed_at` (date) - Auto-set when status = completed

**Access Rules**:
- Users can only see/edit their own tickets
- Authentication required for all operations

## Business Logic (Hooks)

1. **Auto-set completed_at**: Automatically sets timestamp when status changes to 'completed'
2. **Callback validation**: Ensures callback_time is set for callback-type tickets

## Environment Variables

Create a `.env` file in the backend directory:

```env
# Optional: customize settings
PB_DATA_DIR=./pb_data
PB_PUBLIC_DIR=./pb_public
```

## Development

### Running in Development Mode
```bash
pocketbase.exe serve --http="0.0.0.0:8090" --dev
```

### Creating Migrations
Migrations are in `pb_migrations/` directory. They run automatically on startup.

### Hooks
Business logic hooks are in `pb_hooks/` directory. They execute on record lifecycle events.

## API Usage

### Authentication
```javascript
import PocketBase from 'pocketbase';

const pb = new PocketBase('http://localhost:8090');

// Register
await pb.collection('users').create({
  email: 'user@example.com',
  password: 'password123',
  passwordConfirm: 'password123'
});

// Login
const authData = await pb.collection('users').authWithPassword(
  'user@example.com',
  'password123'
);
```

### Tickets CRUD
```javascript
// Create ticket
const ticket = await pb.collection('tickets').create({
  title: 'Fix bug',
  description: 'Description here',
  priority: 'high',
  status: 'todo',
  type: 'task',
  user_id: pb.authStore.model.id
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
```

### Real-time Subscriptions
```javascript
// Subscribe to ticket changes
pb.collection('tickets').subscribe('*', (e) => {
  console.log('Ticket changed:', e.action, e.record);
});
```

## Production Deployment

1. **Build Frontend**: `npm run build`
2. **Copy dist to pb_public**: `cp -r dist backend/pb_public`
3. **Run Pocketbase**: `pocketbase serve --http="0.0.0.0:8090"`

## Backup

Pocketbase automatically creates backups in `pb_data/backups/`.

Manual backup:
```bash
pocketbase.exe admin backup
```

## Migration Path

If you outgrow Pocketbase:
1. Export data via API
2. Migrate to PostgreSQL backend (Pocketbase supports PostgreSQL)
3. Or migrate to Supabase/custom solution

See POCKETBASE-ANALYSIS.md for detailed migration strategies.
