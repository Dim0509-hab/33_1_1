import jwt from 'jsonwebtoken';

export const signAccess = (payload) =>
  jwt.sign(payload, process.env.JWT_ACCESS_SECRET, { expiresIn: process.env.ACCESS_TTL || '15m' });

export const signRefresh = (payload) =>
  jwt.sign(payload, process.env.JWT_REFRESH_SECRET, { expiresIn: process.env.REFRESH_TTL || '7d' });

export const signVerify = (payload) =>
  jwt.sign(payload, process.env.JWT_VERIFY_SECRET, { expiresIn: '1d' });

export const verifyRefresh = (token) =>
  jwt.verify(token, process.env.JWT_REFRESH_SECRET);
export const verifyEmailToken = (token) =>
  jwt.verify(token, process.env.JWT_VERIFY_SECRET);
