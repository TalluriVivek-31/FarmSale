import { Router, Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import { db, User } from '../db/database';

export const authRouter = Router();

// Register new user
authRouter.post('/register', (req: Request, res: Response) => {
  const { email, password, role, name, phone, state, district, organizationName, fpoName, businessType, preferredLanguage } = req.body;

  if (!email || !password || !role || !name) {
    return res.status(400).json({ error: 'Name, email, password, and role are required.' });
  }

  // Admin cannot be registered publicly
  if (role === 'admin') {
    return res.status(403).json({ error: 'Administrative accounts cannot be registered publicly.' });
  }

  const rawDb = db.getRaw();
  const existingUser = rawDb.users.find((u) => u.email.toLowerCase() === email.toLowerCase());
  if (existingUser) {
    return res.status(409).json({ error: 'An account with this email address already exists.' });
  }

  const passwordHash = bcrypt.hashSync(password, 10);
  const newUserId = `user-${Date.now()}`;

  const newUser: User = {
    id: newUserId,
    email: email.toLowerCase(),
    passwordHash,
    role,
    name,
    phone: phone || '',
    createdAt: new Date().toISOString()
  };

  rawDb.users.push(newUser);

  // Initialize role-specific profile
  if (role === 'farmer') {
    rawDb.farmerProfiles.push({
      userId: newUserId,
      state: state || '',
      district: district || '',
      totalAcres: 0,
      irrigatedAcres: 0,
      preferredLanguage: preferredLanguage || 'English',
      onboardingCompleted: false
    });
  } else if (role === 'buyer') {
    rawDb.buyerProfiles.push({
      userId: newUserId,
      organizationName: organizationName || name,
      contactPerson: name,
      businessType: businessType || 'Institutional Buyer',
      location: district || '',
      district: district || '',
      state: state || ''
    });
  } else if (role === 'fpo') {
    rawDb.fpoProfiles.push({
      userId: newUserId,
      fpoName: fpoName || name,
      registrationNumber: `REG-${Date.now().toString().slice(-6)}`,
      contactPerson: name,
      memberCount: 0,
      district: district || '',
      state: state || ''
    });
  }

  db.save();

  // Return clean user object
  return res.status(201).json({
    message: 'Account registered successfully.',
    user: {
      id: newUser.id,
      email: newUser.email,
      name: newUser.name,
      role: newUser.role,
      phone: newUser.phone
    },
    token: `token-${newUser.id}-${Date.now()}`
  });
});

// Login
authRouter.post('/login', (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required.' });
  }

  const rawDb = db.getRaw();
  const user = rawDb.users.find((u) => u.email.toLowerCase() === email.toLowerCase());

  if (!user) {
    return res.status(401).json({ error: 'Invalid email or password.' });
  }

  const passwordValid = bcrypt.compareSync(password, user.passwordHash);
  if (!passwordValid) {
    return res.status(401).json({ error: 'Invalid email or password.' });
  }

  let profileData: any = {};
  if (user.role === 'farmer') {
    profileData = rawDb.farmerProfiles.find((p) => p.userId === user.id) || { onboardingCompleted: false };
  } else if (user.role === 'buyer') {
    profileData = rawDb.buyerProfiles.find((p) => p.userId === user.id) || {};
  } else if (user.role === 'fpo') {
    profileData = rawDb.fpoProfiles.find((p) => p.userId === user.id) || {};
  }

  return res.json({
    message: 'Login successful.',
    user: {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
      phone: user.phone,
      profile: profileData
    },
    token: `token-${user.id}-${Date.now()}`
  });
});

// Forgot password simulation
authRouter.post('/forgot-password', (req: Request, res: Response) => {
  const { email } = req.body;
  if (!email) {
    return res.status(400).json({ error: 'Email address is required.' });
  }

  return res.json({
    message: `Password reset instructions have been dispatched to ${email} if the account exists.`
  });
});

// Get test users for developer & hackathon evaluation environment
authRouter.get('/test-accounts', (_req: Request, res: Response) => {
  const rawDb = db.getRaw();
  const testUsers = rawDb.users.slice(0, 4).map((u) => ({
    id: u.id,
    email: u.email,
    name: u.name,
    role: u.role
  }));
  return res.json({ testAccounts: testUsers });
});
