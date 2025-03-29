# PayPlus Payment App

A full-stack payment application that allows users to transfer money, check balances, and view transaction history.

## Features

- User Authentication (Sign up, Sign in)
- Balance Checking
- Money Transfer
- Transaction History
- User Search

## Technology Stack

- **Frontend:** React.js with Tailwind CSS
- **Backend:** Node.js, Express.js
- **Database:** MongoDB Atlas

## Getting Started

### Prerequisites

- Node.js (v14+ recommended)
- MongoDB (local or Atlas connection)

### Installation

1. Clone the repository
   ```
   git clone <repository-url>
   ```

2. Install dependencies for backend
   ```
   cd backend
   npm install
   ```

3. Install dependencies for frontend
   ```
   cd ../frontend
   npm install
   ```

4. Create a `.env` file in the backend directory with the following content:
   ```
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_secret_key
   ```

### Running the App

1. Start the backend server
   ```
   cd backend
   npm run dev
   ```

2. Start the frontend development server
   ```
   cd frontend
   npm start
   ```

3. Access the app in your browser at `http://localhost:3000`

## Transaction History Feature

The application includes a transaction history feature that displays all money transfers you've sent and received.

### Viewing Transaction History

1. Log in to your account
2. On the dashboard, click the "History" button (clock icon)
3. The transaction history modal will open, displaying all your transactions
4. Outgoing payments are shown in red, while incoming payments are shown in green

### Seeding Test Transactions (for development)

To generate sample transaction data (useful for testing):

```
cd backend
npm run seed:transactions
```

To override existing transactions:

```
npm run seed:transactions:force
```

## API Endpoints

### Authentication
- `POST /api/v1/user/signup` - Create a new user account
- `POST /api/v1/user/signin` - Sign in to an existing account

### Account
- `GET /api/v1/account/balance` - Get account balance
- `POST /api/v1/account/transfer` - Transfer money to another user
- `GET /api/v1/account/transactions` - Get transaction history

### User
- `GET /api/v1/user/bulk` - Search for users

## License

This project is licensed under the MIT License.