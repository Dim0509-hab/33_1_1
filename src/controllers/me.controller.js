import fs from 'fs';
import path from 'path';
import { profileSchema } from '../validators/profile.schema.js';
import { findById, updateProfile } from '../repositories/usersRepo.js';

export async function getMe(req, res) {
  const u = await findById(req.user.id);
  res.json({ id: u.id, email: u.email, email_visible: u.email_visible,
             email_verified: u.email_verified, nickname: u.nickname, avatar_url: u.avatar_url });
}

export async function patchMe(req, res) {
  const { error, value } = profileSchema.validate(req.body);
  if (error) return res.status(400).json({ message: error.message });

  let avatar_url;
  if (req.files?.avatar) {
    const f = req.files.avatar;
    const ext = path.extname(f.name || '') || '.png';
    const fileName = `u_${req.user.id}_${Date.now()}${ext}`;
    const dest = path.join('uploads', fileName);
    await f.mv(dest);
    avatar_url = `/uploads/${fileName}`;
  }

  try {
    const updated = await updateProfile(req.user.id, {
      nickname: value.nickname,
      email_visible: value.email_visible,
      avatar_url
    });
    res.json(updated);
  } catch (e) {
    // уникальность никнейма
    if (String(e?.message).includes('duplicate key') || String(e?.code) === '23505') {
      return res.status(409).json({ message: 'Никнейм занят' });
    }
    throw e;
  }
}
