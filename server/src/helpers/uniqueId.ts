import crypto from 'crypto';

export default function EightCharacterUniqueAlphanumericString(): string {
  const radix = 36; // base36: a-z and 0-9
  // 12 digit integer will result to an 8 char base36 string
  // Formula: Math.floor(Math.log(36) / Math.log(10) * 8) -> 12
  const randomInt: number = crypto.randomInt(100000000000, 999999999999)
  
  return randomInt.toString(radix)
}
