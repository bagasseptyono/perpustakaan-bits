# Perpustakaan Backend

Library Backend. Had User admin and member, had book and transaction borrow and return book.


## Backend
- NodeJS
- ExpressJS
- Prisma MySQL


## Documentation

Backend API Endpoint Documentation Available in here
[Documentation](https://documenter.getpostman.com/view/25519474/2sAXqzYef2)


## Run Locally

Clone the project

```bash
  git clone https://github.com/bagasseptyono/perpustakaan-bits.git
```

Go to the project directory

```bash
  cd perpustakaan-bits
```

Install dependencies

```bash
  npm install
```

Configure file .env

```bash
  cp .env.example .env
```

Install Migrate Database

```bash
  npm run generate
```
```bash
  npm run migrate
```
Seed Database Admin

```bash
  npm run seed
```

Start the server

```bash
  npm run start
```
    
