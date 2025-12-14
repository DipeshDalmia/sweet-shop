require('dotenv').config();
process.env.NODE_ENV;
process.env.JWT_SECRET;

const request = require('supertest');
const app = require('../app');
const Sweet = require('../models/sweetModel');
const User = require('../models/userModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Helper function to get auth token
const getAuthToken = async (role = 'user') => {
  const hashedPassword = await bcrypt.hash('password123', 4); // faster for tests
  const user = await User.create({
    name: `${role} User`,
    email: `${role}@example.com`,
    password: hashedPassword,
    role
  });

  return jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: '1d' }
  );
};

describe('Sweet Endpoints', () => {
  let userToken;
  let adminToken;

  // Create users + tokens ONCE
  beforeAll(async () => {
    await User.deleteMany({});
    userToken = await getAuthToken('user');
    adminToken = await getAuthToken('admin');
  });

  // Clean sweets after each test
  afterEach(async () => {
    await Sweet.deleteMany({});
  });

  /* -------------------- ADD SWEET -------------------- */
  describe('POST /api/sweets - Add Sweet', () => {
    it('should add a new sweet successfully', async () => {
      const sweetData = {
        name: 'Chocolate Bar',
        category: 'Chocolate',
        price: 50,
        quantity: 100
      };

      const response = await request(app)
        .post('/api/sweets')
        .set('Authorization', `Bearer ${userToken}`)
        .send(sweetData)
        .expect(201);

      expect(response.body.name).toBe('Chocolate Bar');
      expect(response.body.category).toBe('Chocolate');
      expect(response.body.price).toBe(50);
      expect(response.body.quantity).toBe(100);
    });

    it('should return 400 if required fields are missing', async () => {
      const response = await request(app)
        .post('/api/sweets')
        .set('Authorization', `Bearer ${userToken}`)
        .send({ name: 'Chocolate Bar' })
        .expect(400);

      expect(response.body.message).toBe('All fields are required');
    });

    it('should return 400 if price is invalid', async () => {
      const response = await request(app)
        .post('/api/sweets')
        .set('Authorization', `Bearer ${userToken}`)
        .send({
          name: 'Chocolate Bar',
          category: 'Chocolate',
          price: -10,
          quantity: 100
        })
        .expect(400);

      expect(response.body.message).toBe('Price and quantity must be valid numbers');
    });

    it('should return 401 if token is missing', async () => {
      await request(app)
        .post('/api/sweets')
        .send({
          name: 'Chocolate Bar',
          category: 'Chocolate',
          price: 50,
          quantity: 100
        })
        .expect(401);
    });
  });

  /* -------------------- GET SWEETS -------------------- */
  describe('GET /api/sweets - Get All Sweets', () => {
    beforeEach(async () => {
      await Sweet.create([
        { name: 'Sweet 1', category: 'Candy', price: 10, quantity: 50 },
        { name: 'Sweet 2', category: 'Chocolate', price: 20, quantity: 30 }
      ]);
    });

    it('should get all sweets successfully', async () => {
      const response = await request(app)
        .get('/api/sweets')
        .set('Authorization', `Bearer ${userToken}`)
        .expect(200);

      expect(response.body).toHaveLength(2);
    });

    it('should return 401 if token is missing', async () => {
      await request(app).get('/api/sweets').expect(401);
    });
  });

  /* -------------------- SEARCH SWEETS -------------------- */
  describe('GET /api/sweets/search - Search Sweets', () => {
    beforeEach(async () => {
      await Sweet.create([
        { name: 'Chocolate Bar', category: 'Chocolate', price: 50, quantity: 100 },
        { name: 'Gummy Bears', category: 'Candy', price: 30, quantity: 80 },
        { name: 'Dark Chocolate', category: 'Chocolate', price: 70, quantity: 50 }
      ]);
    });

    it('should search sweets by name', async () => {
      const response = await request(app)
        .get('/api/sweets/search')
        .set('Authorization', `Bearer ${userToken}`)
        .query({ name: 'Chocolate' })
        .expect(200);

      expect(response.body.length).toBeGreaterThan(0);
    });
  });

  /* -------------------- UPDATE SWEET -------------------- */
  describe('PUT /api/sweets/:id - Update Sweet', () => {
    let sweetId;

    beforeEach(async () => {
      const sweet = await Sweet.create({
        name: 'Original Sweet',
        category: 'Candy',
        price: 25,
        quantity: 50
      });
      sweetId = sweet._id.toString();
    });

    it('should update sweet successfully', async () => {
      const response = await request(app)
        .put(`/api/sweets/${sweetId}`)
        .set('Authorization', `Bearer ${userToken}`)
        .send({ name: 'Updated Sweet', price: 30, quantity: 60 })
        .expect(200);

      expect(response.body.name).toBe('Updated Sweet');
    });
  });

  /* -------------------- DELETE SWEET -------------------- */
  describe('DELETE /api/sweets/:id - Delete Sweet', () => {
    let sweetId;

    beforeEach(async () => {
      const sweet = await Sweet.create({
        name: 'Sweet to Delete',
        category: 'Candy',
        price: 20,
        quantity: 30
      });
      sweetId = sweet._id.toString();
    });

    it('should delete sweet successfully (admin only)', async () => {
      const response = await request(app)
        .delete(`/api/sweets/${sweetId}`)
        .set('Authorization', `Bearer ${adminToken}`)
        .expect(200);

      expect(response.body.message).toBe('Sweet deleted');
    });

    it('should return 403 if user is not admin', async () => {
      await request(app)
        .delete(`/api/sweets/${sweetId}`)
        .set('Authorization', `Bearer ${userToken}`)
        .expect(403);
    });
  });
});
