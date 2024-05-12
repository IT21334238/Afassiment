const request = require('supertest');
const app = require('../app'); // Importing only the app object
const http = require('http');
const User = require('../models/User');

// Create server using the app object
const server = http.createServer(app);

describe('User Controller', () => {
  beforeEach(async () => {
    // Clear the User collection before each test
    await User.deleteMany();
  });

  describe('POST /api/users/register', () => {
    it('should register a new user', async () => {
      const userData = {
        name: 'Test User',
        email: 'test@example.com',
        password: 'password',
        role: 'student'
      };

      const response = await request(server) // Use server instead of app
        .post('/api/users/register')
        .send(userData);

      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty('message', 'User registered successfully');
    });

    it('should return 400 if email is already registered', async () => {
      // Create a user with the same email
      await User.create({
        name: 'Existing User',
        email: 'test@example.com',
        password: 'password',
        role: 'student'
      });

      const userData = {
        name: 'Test User',
        email: 'test@example.com',
        password: 'password',
        role: 'student'
      };

      const response = await request(server) // Use server instead of app
        .post('/api/users/register')
        .send(userData);

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty('message', 'Email already registered');
    });
  });

  describe('POST /api/users/login', () => {
    // it('should login with valid credentials', async () => {
    //   // Create a user
    //   await User.create({
    //     name: 'Test User',
    //     email: 'test@example.com',
    //     password: '$2a$10$5XmMdJiDWqSYFqhZ1fjLyeXKfg2DYZgK18EKzI6ogmDyjtYb0E43W', // hashed password for 'password'
    //     role: 'student'
    //   });

    //   const loginData = {
    //     email: 'test@example.com',
    //     password: 'password'
    //   };

    //   const response = await request(server) // Use server instead of app
    //     .post('/api/users/login')
    //     .send(loginData);

    //   expect(response.status).toBe(200);
    //   expect(response.body).toHaveProperty('token');
    // });

    it('should return 400 if credentials are invalid', async () => {
      const loginData = {
        email: 'nonexistent@example.com',
        password: 'invalidpassword'
      };

      const response = await request(server) // Use server instead of app
        .post('/api/users/login')
        .send(loginData);

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty('message', 'Invalid email or password');
    });
  });
});

