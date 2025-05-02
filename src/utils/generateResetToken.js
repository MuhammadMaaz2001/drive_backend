import crypto from 'crypto';

export const generateResetToken = () => {
  const resetToken = crypto.randomBytes(32).toString('hex');
  const hashedToken = crypto.createHash('sha256').update(resetToken).digest('hex');
  const expire = Date.now() + 10 * 60 * 1000; // 10 mins

  return { resetToken, hashedToken, expire };
};
