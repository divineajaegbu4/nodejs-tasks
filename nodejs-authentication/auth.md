# Authentication Workflow (JWT)
### 1️⃣ User Sign-Up (Registration) – Not authentication yet

User enters email and password

Browser sends the data to the server (POST /register)

**Server:**

validates input

hashes the password (never store plain passwords)

saves the email and hashed password in the database

Server responds: “User created”

No JWT is generated at this step

Sign-up = creating a user. Authentication only happens when logging in.

### 2️⃣ User Login (Authentication)

User enters email and password

Browser sends credentials to the server (POST /login)

**Server:**

looks up the email in the database

compares password (hashed)

If credentials are invalid → reject login
If credentials are valid → proceed

### 3️⃣ JWT Generation

Server creates a JWT containing payload (claims like userId, role)

Server signs the JWT using:

secret key (server-only)

algorithm (from JWT header, e.g., HS256)

Server sends the entire JWT to the browser

stored in HTTP-only cookie or Authorization header

Signature ensures token integrity — the payload cannot be tampered with.

### 4️⃣ Accessing Protected Routes

Browser sends the entire JWT with each request to protected routes

**Server:**

extracts header + payload

verifies signature using secret key and algorithm

If verification succeeds → server trusts the payload → user is authenticated

If verification fails → request is rejected → user is unauthenticated

**NB:** During verification, the server re-creates the signature using the secret key and compares it with the token’s signature.

### 5️⃣ JWT Structure Reminder
HEADER . PAYLOAD . SIGNATURE


Header → token type + algorithm

Payload → claims about the user

**Signature** → proof that token was created by server and has not been changed OR tampered.

### 6️⃣ Signature Details

Signature is created by joining encoded(header) + "." + encoded(payload)

Signed with secret key + algorithm

On verification, server recalculates signature and compares with what the browser sent

Match → user authenticated

NB: iat shows when the token was generated, not when the user account was created.

### Difference Between Validating and Verifying a JWT
**validation** ensures the token is well-formed and contains enforceable claims; **verification** ensures the token is genuine and unmodified.

### Difference blw Authentication and Authorization

**Authentication** is about confirming your identity.

👉 It answers the question: “Are you really who you say you are?”

Examples:

- Logging in with email + password

- Signing in with Google

- Verifying a JWT token

- Using OTP / fingerprint

✅ Result: The system knows who you are

📌 Example:

You log in with divine@gmail.com and password → server verifies → authenticated


### 🚪 Authorization (WHAT can you do?)

Authorization is about permissions.

👉 It answers the question: “What are you allowed to do?”

Examples:

- Can you access admin dashboard?

- Can you delete a post?

- Can you view another user’s data?

✅ Result: The system knows what you’re allowed to access

📌 Example:

You are logged in, but you are a user, not an admin → access denied

### Node.js Express Architecture with Authentication & Authorization

Request
 ↓
Route
 ↓
Authentication Middleware
 ↓
Authorization Middleware
 ↓
Controller
 ↓
Service
 ↓
Database
 ↓
Response

###  Typical Express Project Structure (REAL PROJECT)

src/
│
├── app.js
├── server.js
│
├── routes/
│   ├── auth.routes.js
│   ├── user.routes.js
│
├── controllers/
│   ├── auth.controller.js
│   ├── user.controller.js
│
├── services/
│   ├── auth.service.js
│   ├── user.service.js
│
├── middlewares/
│   ├── auth.middleware.js
│   ├── role.middleware.js
│   ├── error.middleware.js
│
├── models/
│   └── user.model.js
│
├── utils/
│   ├── jwt.js
│   └── hash.js
│
└── config/
    └── database.js

##### Services (Business Logic)

**📌 Services handle:**

- Logic

- DB calls

- Security rules


NB: This separation makes you professional 💼



### This is directory structure for our Node.js Express & MongoDB application:
NODE-JS-JWT-AUTH-MONGODB
│
├── app
│   ├── config
│   │   ├── auth.config.js
│   │   └── db.config.js
│   │
│   ├── controllers
│   │   ├── auth.controller.js
│   │   └── user.controller.js
│   │
│   ├── middleware
│   │   ├── authJwt.js
│   │   ├── index.js
│   │   └── verifySignUp.js
│   │
│   ├── models
│   │   ├── index.js
│   │   ├── role

CORS -> Cross-Origin Resource Sharing

Break it down:

Cross-Origin → Different website/domain/port
(e.g. localhost:3000 → localhost:5000)

Resource → Data or API

Sharing → Allowing access


#### Password check

Password is hashed with bcrypt

Compared with DB password

### 🔑 Final Summary (MEMORIZE THIS)

- Authentication → Who are you? (JWT, sessions)

- Authorization → What can you do? (roles, permissions)

- Middleware → Security gate

- Controller → Handles request/response

- Service → Business logic

- Model → Database layer