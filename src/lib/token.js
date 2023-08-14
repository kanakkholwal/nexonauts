const crypto = require('crypto');

// Function to generate a random JWT secret key
function generateJWTSecretKey() {
  const secretKeyLength = 26; // You can adjust the length as needed
  return crypto.randomBytes(secretKeyLength).toString('hex');
}

// Generate the JWT secret key
const jwtSecretKey = generateJWTSecretKey();
console.log('JWT Secret Key:', jwtSecretKey);

