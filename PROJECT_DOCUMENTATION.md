# MetaMeet - 2D Metaverse Platform

## Project Overview

**MetaMeet** is a GatherTown-inspired 2D metaverse platform designed for virtual meetings, collaboration, and social interaction. Built as a full-stack TypeScript application, it enables users to create customizable virtual spaces, interact in real-time, and engage in proximity-based communication.

### Project Status
- **Version**: 1.0.0
- **Status**: Active Development
- **Last Updated**: November 2024
- **Primary Use Case**: Academic demonstration and virtual collaboration

### Key Features
- ✅ Real-time multiplayer interaction
- ✅ User authentication and authorization (JWT)
- ✅ Custom space creation and management
- ✅ 2D canvas-based metaverse rendering
- ✅ WebSocket-powered real-time movement
- ✅ Cyberpunk-themed modern UI
- ✅ User profile management
- ✅ PostgreSQL database with Prisma ORM
- 🚧 Proximity-based video calling (planned)
- 🚧 Interactive objects and furniture (planned)
- 🚧 Spatial audio system (planned)

---

## Architecture Overview

### Monorepo Structure

MetaMeet uses a **Turborepo monorepo** architecture with multiple applications and shared packages, enabling efficient code sharing and parallel development.

```
┌─────────────────────────────────────────────────────────────┐
│                      MetaMeet Platform                       │
└─────────────────────────────────────────────────────────────┘
                              │
        ┌─────────────────────┼─────────────────────┐
        │                     │                     │
   ┌────▼────┐          ┌─────▼─────┐        ┌─────▼─────┐
   │ Frontend│          │    HTTP   │        │ WebSocket │
   │  (Vite) │◄────────►│   Server  │◄──────►│  Server   │
   │  React  │   REST   │  Express  │  Auth  │    (ws)   │
   └────┬────┘          └─────┬─────┘        └─────┬─────┘
        │                     │                     │
        │                     └──────────┬──────────┘
        │                                │
        │                          ┌─────▼─────┐
        └─────────────────────────►│ PostgreSQL│
                                   │  Database │
                                   │  (Prisma) │
                                   └───────────┘
```

### Service Communication

**Frontend ↔ HTTP Server**
- RESTful API calls for CRUD operations
- JWT token authentication
- JSON request/response format

**Frontend ↔ WebSocket Server**
- Real-time bidirectional communication
- Movement updates and position synchronization
- Room state management

**HTTP Server ↔ Database**
- Prisma ORM for type-safe queries
- Connection pooling
- Migration management

**WebSocket Server ↔ Database**
- User validation and space lookups
- Shared Prisma client from `@repo/db` package

---

## Technology Stack

### Frontend Technologies

| Technology | Version | Purpose |
|------------|---------|---------|
| **React** | 18.3.1 | UI framework with hooks and components |
| **TypeScript** | 5.6.2 | Type-safe development |
| **Vite** | 5.4.10 | Fast build tool and dev server |
| **React Router DOM** | 6.30.1 | Client-side routing |
| **Tailwind CSS** | 3.4.18 | Utility-first CSS framework |
| **HTML5 Canvas** | Native | 2D metaverse rendering |
| **Custom CSS** | - | Cyberpunk theme styling |

**Frontend Features:**
- Component-based architecture
- TypeScript for type safety
- Hot Module Replacement (HMR)
- CSS modules + Tailwind utilities
- Responsive design
- Custom animations and transitions

### Backend Technologies

| Technology | Version | Purpose |
|------------|---------|---------|
| **Express.js** | 4.21.1 | HTTP server framework |
| **ws** | 8.18.0 | WebSocket server library |
| **TypeScript** | 5.6.3 | Type-safe backend code |
| **PostgreSQL** | - | Relational database |
| **Prisma** | 5.21.1 | Modern ORM and type-safe DB client |
| **jsonwebtoken** | 9.0.2 | JWT authentication |
| **Zod** | 3.23.8 | Schema validation |
| **esbuild** | 0.24.0 | Fast bundler for backend |

**Backend Features:**
- RESTful API architecture
- WebSocket real-time communication
- JWT-based authentication
- Type-safe database queries
- Schema validation with Zod
- Environment-based configuration

### Infrastructure & Tooling

| Tool | Version | Purpose |
|------|---------|---------|
| **Turborepo** | 2.2.3 | Monorepo orchestration |
| **pnpm** | 8.15.6 | Fast, disk-efficient package manager |
| **ESLint** | 9.13.0 | Code linting and style enforcement |
| **Prettier** | 3.2.5 | Code formatting |
| **TypeScript** | 5.5.4 | Shared TypeScript configuration |
| **Node.js** | ≥18 | JavaScript runtime |

**Infrastructure Benefits:**
- Workspace-based dependency management
- Parallel task execution with Turborepo
- Shared configurations across packages
- Fast, cached builds
- Type-safe monorepo

---

## Project Structure

```
PBL/
├── metaverse/                          # Main monorepo
│   ├── apps/                           # Application packages
│   │   ├── frontend/                   # React frontend application
│   │   │   ├── src/
│   │   │   │   ├── App.tsx            # Main app component with routing
│   │   │   │   ├── main.tsx           # Application entry point
│   │   │   │   ├── Game.tsx           # 2D Canvas metaverse renderer
│   │   │   │   ├── LandingPage.tsx    # Marketing landing page
│   │   │   │   ├── LandingPage.css    # Landing page styles
│   │   │   │   ├── Login.tsx          # User login page
│   │   │   │   ├── Signup.tsx         # User registration page
│   │   │   │   ├── Auth.css           # Authentication styles
│   │   │   │   ├── Dashboard.tsx      # Space management dashboard
│   │   │   │   ├── Dashboard.css      # Dashboard styles
│   │   │   │   ├── Profile.tsx        # User profile page
│   │   │   │   ├── Profile.css        # Profile styles
│   │   │   │   └── index.css          # Global styles + Tailwind
│   │   │   ├── index.html             # HTML entry point
│   │   │   ├── vite.config.ts         # Vite configuration
│   │   │   ├── tailwind.config.js     # Tailwind configuration
│   │   │   ├── postcss.config.js      # PostCSS configuration
│   │   │   └── package.json           # Frontend dependencies
│   │   │
│   │   ├── http/                       # Express HTTP API server
│   │   │   ├── src/
│   │   │   │   ├── index.ts           # Server entry point
│   │   │   │   ├── config.ts          # Configuration management
│   │   │   │   ├── scrypt.ts          # Password hashing utilities
│   │   │   │   ├── middleware/
│   │   │   │   │   └── user.ts        # JWT authentication middleware
│   │   │   │   ├── routes/
│   │   │   │   │   └── v1/
│   │   │   │   │       ├── index.ts   # Route aggregator
│   │   │   │   │       ├── user.ts    # User routes (signup, login)
│   │   │   │   │       └── space.ts   # Space CRUD routes
│   │   │   │   └── types/
│   │   │   │       └── index.ts       # Type definitions
│   │   │   └── package.json           # HTTP server dependencies
│   │   │
│   │   └── ws/                         # WebSocket server
│   │       ├── src/
│   │       │   ├── index.ts           # WebSocket server entry
│   │       │   ├── config.ts          # Configuration
│   │       │   ├── types.ts           # WebSocket message types
│   │       │   ├── User.ts            # User connection class
│   │       │   └── RoomManager.ts     # Room and user state management
│   │       └── package.json           # WebSocket dependencies
│   │
│   ├── packages/                       # Shared packages
│   │   ├── db/                         # Database package
│   │   │   ├── prisma/
│   │   │   │   └── schema.prisma      # Database schema
│   │   │   ├── src/
│   │   │   │   └── index.ts           # Prisma client export
│   │   │   └── package.json
│   │   │
│   │   ├── ui/                         # Shared UI components (future)
│   │   ├── typescript-config/          # Shared TS configs
│   │   └── eslint-config/              # Shared ESLint configs
│   │
│   ├── .env.example                    # Environment variables template
│   ├── turbo.json                      # Turborepo configuration
│   ├── pnpm-workspace.yaml             # pnpm workspace config
│   ├── package.json                    # Root package configuration
│   └── README.md                       # Basic README
│
├── IMPLEMENTATION_PLAN.md              # Detailed implementation roadmap
├── PROJECT_DOCUMENTATION.md            # This file
└── pages/                              # [UNUSED] Old component drafts
```

---

## Component Documentation

### Frontend Components

#### 1. **LandingPage.tsx**
**Purpose**: Marketing and entry point for the application

**Features:**
- Cyberpunk-themed hero section with parallax effects
- Animated floating particles background
- Glitch text effects on title
- Feature showcase cards
- Call-to-action buttons (Login/Signup navigation)
- Footer with links and social media
- Responsive design for mobile/desktop

**Styling**: `LandingPage.css` with custom animations

**Routes**: `/`

---

#### 2. **Login.tsx**
**Purpose**: User authentication interface

**Features:**
- Email and password input fields
- Password visibility toggle (eye icon)
- Form validation
- JWT token storage on success
- Navigation to Dashboard after login
- Link to Signup page

**Styling**: `Auth.css` (shared with Signup)

**Routes**: `/login`

**API Integration**: 
- `POST /api/v1/user/signin`

---

#### 3. **Signup.tsx**
**Purpose**: New user registration

**Features:**
- Username, email, and password fields
- Password confirmation with visibility toggle
- Client-side validation
- Account creation with automatic login
- Navigation to Dashboard after signup
- Link to Login page

**Styling**: `Auth.css`

**Routes**: `/signup`

**API Integration**: 
- `POST /api/v1/user/signup`

---

#### 4. **Dashboard.tsx**
**Purpose**: Central hub for space management

**Features:**
- Navigation bar with logo and profile dropdown
- Tab system (Last Visited / Created Spaces)
- Search functionality for spaces
- Grid of space cards with thumbnails
- User count badges on spaces
- Space menu with delete option
- "Create New Space" card with modal
- Create space modal with form
- Profile dropdown (Profile, Settings, Logout)
- Corner UI decorative elements
- Real-time space filtering

**Styling**: `Dashboard.css` with cyberpunk theme

**Routes**: `/dashboard`

**State Management:**
- Spaces list
- Active tab
- Search query
- Modal visibility
- Selected space menu

---

#### 5. **Profile.tsx**
**Purpose**: User profile management and settings

**Features:**
- Avatar upload section (max 5MB, JPG/PNG/GIF)
- User information display (username, email, user ID)
- Copy-to-clipboard for user ID
- Editable bio section (max 200 characters)
- Privacy settings toggles
- Danger zone with account deletion
- Delete confirmation modal
- Back to Dashboard navigation

**Styling**: `Profile.css`

**Routes**: `/profile`

**Key Interactions:**
- Avatar image upload and preview
- Bio edit mode toggle
- Privacy checkbox changes
- Delete account confirmation

---

#### 6. **Game.tsx**
**Purpose**: 2D metaverse canvas renderer with real-time multiplayer

**Features:**
- HTML5 Canvas rendering
- Real-time WebSocket connection
- Player movement with arrow keys
- User position synchronization
- Room state management
- Multiple user rendering
- Collision detection (planned)
- Object rendering (planned)

**Technical Details:**
- Canvas size: 500x500px
- Grid-based movement (8x8)
- WebSocket messages for join/move/leave
- Frame-by-frame rendering
- Player visualization with colors

**Routes**: `/arena`

**WebSocket Events:**
- `join` - Join a space
- `move` - Send movement data
- `user-joined` - New user notification
- `movement` - Receive other users' positions
- `user-left` - User disconnection

---

### Backend Services

#### HTTP Server (`apps/http`)

**Endpoints:**

**User Routes** (`/api/v1/user`)
```typescript
POST /signup
  Body: { username: string, password: string, type: "user" | "admin" }
  Returns: { token: string, userId: string }

POST /signin  
  Body: { username: string, password: string }
  Returns: { token: string, userId: string }

GET /metadata
  Headers: { authorization: "Bearer <token>" }
  Returns: { userId: string, avatarId?: string }

POST /metadata/bulk
  Body: { ids: string[] }
  Returns: { avatars: { userId: string, avatarId?: string }[] }
```

**Space Routes** (`/api/v1/space`)
```typescript
POST /
  Headers: { authorization: "Bearer <token>" }
  Body: { name: string, dimensions: string, mapId?: string }
  Returns: { spaceId: string }

DELETE /:spaceId
  Headers: { authorization: "Bearer <token>" }
  Returns: { message: "Space deleted" }

GET /all
  Headers: { authorization: "Bearer <token>" }
  Returns: { spaces: Space[] }

GET /:spaceId
  Returns: { dimensions: string, elements: Element[] }
```

**Middleware:**
- JWT authentication middleware
- Request validation with Zod
- Error handling
- CORS configuration

---

#### WebSocket Server (`apps/ws`)

**Connection Flow:**
```
1. Client connects with JWT token in query
2. Server validates token
3. Client sends "join" message with spaceId
4. Server adds user to room
5. Server broadcasts user positions
6. Client sends "move" messages
7. Server broadcasts to other users in room
8. On disconnect, server removes user and notifies room
```

**Message Types:**
```typescript
// Client → Server
{
  type: "join",
  payload: { spaceId: string, token: string }
}

{
  type: "move",
  payload: { x: number, y: number }
}

// Server → Client
{
  type: "space-joined",
  payload: { 
    spawn: { x: number, y: number },
    users: [{ userId: string, x: number, y: number }]
  }
}

{
  type: "user-joined",
  payload: { userId: string, x: number, y: number }
}

{
  type: "movement",
  payload: { x: number, y: number, userId: string }
}

{
  type: "user-left",
  payload: { userId: string }
}
```

**RoomManager Class:**
- Manages multiple rooms/spaces
- Tracks users in each room
- Broadcasts messages to room members
- Handles user join/leave logic

---

## Database Schema

### Prisma Models

```prisma
model User {
  id       String   @id @unique @default(cuid())
  username String   @unique
  password String
  avatarId String?
  spaces   Space[]
  avatar   Avatar?  @relation(fields: [avatarId], references: [id])
}

model Space {
  id          String          @id @unique @default(cuid())
  name        String
  width       Int
  height      Int
  thumbnail   String?
  creatorId   String
  creator     User            @relation(fields: [creatorId], references: [id])
  elements    spaceElements[]
}

model spaceElements {
  id        String  @id @unique @default(cuid())
  elementId String
  spaceId   String
  x         Int
  y         Int
  space     Space   @relation(fields: [spaceId], references: [id])
  element   Element @relation(fields: [elementId], references: [id])
}

model Element {
  id          String          @id @unique @default(cuid())
  width       Int
  height      Int
  static      Boolean
  imageUrl    String
  spaces      spaceElements[]
  mapElements MapElements[]
}

model Map {
  id          String        @id @unique @default(cuid())
  width       Int
  height      Int
  name        String
  thumbnail   String
  mapElements MapElements[]
}

model MapElements {
  id        String  @id @unique @default(cuid())
  mapId     String
  elementId String
  x         Int?
  y         Int?
  map       Map     @relation(fields: [mapId], references: [id])
  element   Element @relation(fields: [elementId], references: [id])
}

model Avatar {
  id       String  @id @unique @default(cuid())
  imageUrl String?
  name     String?
  users    User[]
}
```

### Entity Relationships

```
User ──┬─< Space (creator)
       └─> Avatar (optional)

Space ──> spaceElements ──> Element

Map ──> MapElements ──> Element

Element ──┬─< spaceElements
          └─< MapElements
```

---

## Development Setup

### Prerequisites
- Node.js ≥18
- PostgreSQL database
- pnpm (recommended) or npm

### Installation

1. **Clone the repository**
```bash
git clone <repository-url>
cd PBL/metaverse
```

2. **Install dependencies**
```bash
pnpm install
```

3. **Set up environment variables**

Create `.env` file in `packages/db/`:
```env
DATABASE_URL="postgresql://user:password@localhost:5432/metaverse"
```

Create `.env` file in `apps/http/`:
```env
JWT_SECRET="your-secret-key-here"
PORT=3000
```

Create `.env` file in `apps/ws/`:
```env
JWT_SECRET="your-secret-key-here"
PORT=8080
```

4. **Set up database**
```bash
cd packages/db
pnpm prisma migrate dev
pnpm prisma generate
```

5. **Build all packages**
```bash
pnpm build
```

### Running Development Servers

**Run all services simultaneously:**
```bash
pnpm dev
```

**Or run individually:**

**Frontend:**
```bash
cd apps/frontend
pnpm dev
# Runs on http://localhost:5173
```

**HTTP Server:**
```bash
cd apps/http
pnpm dev
# Runs on http://localhost:3000
```

**WebSocket Server:**
```bash
cd apps/ws
pnpm dev
# Runs on ws://localhost:8080
```

### Building for Production

```bash
# Build all apps and packages
pnpm build

# Frontend build output: apps/frontend/dist
# HTTP server: apps/http/dist
# WebSocket server: apps/ws/dist
```

### Running Tests

```bash
pnpm lint        # Lint all packages
pnpm format      # Format code with Prettier
```

---

## Design System

### Color Palette (Cyberpunk Theme)

**Primary Colors:**
- Cyan: `#00ffff` - Primary accent, links, active states
- Magenta: `#ff006e` - Secondary accent, danger actions
- Purple: `#8338ec` - Tertiary accent, gradients

**Backgrounds:**
- Dark Primary: `#1a1a2e` - Main background
- Dark Secondary: `#16213e` - Card backgrounds
- Dark Tertiary: `#0f1729` - Deep backgrounds

**Text:**
- Primary: `#e0e0e0` - Main text
- Secondary: `#b8b8d1` - Muted text
- Accent: `#00ffff` - Highlighted text

### Typography

**Fonts:**
- Headings: `Press Start 2P` - Pixel/retro font
- Body: `Space Mono` - Monospace font
- Code: `Space Mono`

**Font Sizes:**
- Titles: 2rem - 3rem
- Headings: 1.5rem - 2rem
- Body: 1rem
- Small: 0.875rem

### UI Components

**Buttons:**
- Primary: Cyan gradient with glow effect
- Secondary: Transparent with cyan border
- Danger: Magenta with glow effect
- Hover: Translatey(-2px) with enhanced glow

**Cards:**
- Background: `rgba(26, 26, 46, 0.7)`
- Border: 2px solid cyan/20% opacity
- Border radius: 16px
- Backdrop filter: blur(10px)
- Hover: Transform scale + glow

**Inputs:**
- Background: `rgba(10, 14, 39, 0.6)`
- Border: 2px solid cyan/20%
- Focus: Full cyan border + glow
- Placeholder: Muted gray

**Animations:**
- Glitch effects on titles
- Floating particles
- Pulse animations on corners
- Fade-in-up for content
- Smooth transitions (300ms)

---

## API Documentation

### Authentication

All authenticated endpoints require JWT token in header:
```
Authorization: Bearer <token>
```

### Error Responses

Standard error format:
```json
{
  "error": "Error message description"
}
```

**Status Codes:**
- 200: Success
- 400: Bad request / validation error
- 401: Unauthorized / invalid token
- 403: Forbidden
- 404: Not found
- 500: Internal server error

---

## WebSocket Protocol

### Connection

```javascript
const ws = new WebSocket('ws://localhost:8080?token=<jwt_token>');
```

### Message Format

All messages follow this structure:
```typescript
{
  type: string,
  payload: object
}
```

### Client Events

**Join Space:**
```json
{
  "type": "join",
  "payload": {
    "spaceId": "space_id_here",
    "token": "jwt_token_here"
  }
}
```

**Move:**
```json
{
  "type": "move",
  "payload": {
    "x": 5,
    "y": 3
  }
}
```

### Server Events

**Space Joined:**
```json
{
  "type": "space-joined",
  "payload": {
    "spawn": { "x": 0, "y": 0 },
    "users": [
      { "userId": "user1", "x": 2, "y": 3 }
    ]
  }
}
```

**User Joined:**
```json
{
  "type": "user-joined",
  "payload": {
    "userId": "user_id",
    "x": 0,
    "y": 0
  }
}
```

**Movement:**
```json
{
  "type": "movement",
  "payload": {
    "x": 5,
    "y": 3,
    "userId": "user_id"
  }
}
```

**User Left:**
```json
{
  "type": "user-left",
  "payload": {
    "userId": "user_id"
  }
}
```

---

## Security Considerations

### Authentication
- Passwords hashed using scrypt with salt
- JWT tokens with expiration
- Token validation on every WebSocket message
- Secure token storage (localStorage with HTTPS in production)

### Input Validation
- Zod schema validation on all inputs
- SQL injection prevention via Prisma ORM
- XSS prevention via React's built-in escaping
- CORS configuration for API access

### Database Security
- Prepared statements via Prisma
- Connection pooling
- Environment-based credentials
- No sensitive data in logs

---

## Performance Optimizations

### Frontend
- Vite's fast HMR for development
- Code splitting via dynamic imports
- Lazy loading for routes
- Optimized Canvas rendering (RAF loop)
- Debounced search inputs
- Memoized components (where applicable)

### Backend
- esbuild for fast bundling
- Connection pooling for database
- Efficient WebSocket message broadcasting
- Room-based message routing (not global)
- Indexed database queries

### Infrastructure
- Turborepo task caching
- Parallel package builds
- pnpm's efficient node_modules structure
- Shared dependencies via workspace

---

## Future Enhancements

### Phase 1: Advanced Interactions
- [ ] Proximity-based video calling (WebRTC)
- [ ] Spatial audio system
- [ ] Collision detection for walls/objects
- [ ] Interactive furniture (sit on chairs)
- [ ] Clickable objects (whiteboards, screens)

### Phase 2: Visual Upgrades
- [ ] Isometric 2D perspective
- [ ] Sprite-based character animations
- [ ] Custom avatar selection
- [ ] Animated objects and decorations
- [ ] Dynamic lighting effects

### Phase 3: Space Designer
- [ ] Drag-and-drop space editor
- [ ] Furniture and decoration library
- [ ] Real-time preview
- [ ] Save/load space templates
- [ ] Custom tile sets

### Phase 4: Social Features
- [ ] Friend system
- [ ] Private messaging
- [ ] Emoji reactions
- [ ] Chat bubbles above avatars
- [ ] User status (online/offline/busy)

### Phase 5: Collaborative Tools
- [ ] Shared whiteboards
- [ ] Screen sharing
- [ ] File sharing
- [ ] Integrated mini-games
- [ ] Presentation mode

### Phase 6: Administration
- [ ] Space moderation tools
- [ ] User permission management
- [ ] Analytics dashboard
- [ ] Usage tracking
- [ ] Admin panel

---

## Troubleshooting

### Common Issues

**Issue: Database connection fails**
- Check PostgreSQL is running
- Verify DATABASE_URL in .env
- Run `pnpm prisma generate`

**Issue: WebSocket connection refused**
- Check WebSocket server is running on port 8080
- Verify JWT token is valid
- Check CORS configuration

**Issue: Frontend not connecting to backend**
- Verify HTTP server is running on port 3000
- Check API endpoint URLs in frontend code
- Verify CORS settings allow frontend origin

**Issue: Build fails**
- Run `pnpm install` to ensure dependencies
- Check TypeScript errors: `pnpm tsc --noEmit`
- Clear Turborepo cache: `rm -rf .turbo`

---

## Contributing

### Code Style
- TypeScript for all code
- ESLint for linting
- Prettier for formatting
- Meaningful variable names
- Comments for complex logic

### Commit Messages
- Use conventional commits format
- Examples: `feat:`, `fix:`, `docs:`, `refactor:`

### Pull Request Process
1. Create feature branch from `main`
2. Make changes with clear commits
3. Run `pnpm lint` and `pnpm build`
4. Submit PR with description
5. Wait for review and approval

---

## License

[Specify license here]

---

## Contact & Support

**Project Maintainer**: [Your Name]
**Email**: [Your Email]
**Repository**: [Repository URL]

---

## Acknowledgments

- Inspired by GatherTown's virtual space concept
- Built with modern web technologies
- Turborepo for monorepo management
- Prisma for database management

---

## Appendix

### Environment Variables Reference

**Database (`packages/db/.env`)**
```env
DATABASE_URL="postgresql://user:password@localhost:5432/dbname"
```

**HTTP Server (`apps/http/.env`)**
```env
JWT_SECRET="your-secret-key"
PORT=3000
CORS_ORIGIN="http://localhost:5173"
```

**WebSocket Server (`apps/ws/.env`)**
```env
JWT_SECRET="your-secret-key"
PORT=8080
```

### Useful Commands

```bash
# Monorepo commands
pnpm build          # Build all packages
pnpm dev            # Run all dev servers
pnpm lint           # Lint all packages
pnpm format         # Format all code

# Database commands
cd packages/db
pnpm prisma migrate dev    # Create migration
pnpm prisma generate       # Generate client
pnpm prisma studio         # Open Prisma Studio
pnpm prisma db push        # Push schema changes

# Individual app commands
cd apps/frontend
pnpm dev            # Start frontend dev server
pnpm build          # Build frontend for production

cd apps/http
pnpm dev            # Start HTTP server
pnpm build          # Build HTTP server

cd apps/ws
pnpm dev            # Start WebSocket server
pnpm build          # Build WebSocket server
```

---

**Document Version**: 1.0  
**Last Updated**: November 13, 2024  
**Maintained By**: MetaMeet Development Team
