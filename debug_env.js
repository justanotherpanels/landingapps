require('dotenv').config({ override: true });
const dbUrl = process.env.DATABASE_URL;
if (!dbUrl) {
  console.log('MISSING');
} else {
  console.log('FOUND');
  console.log('TYPE_STARTS_WITH:', dbUrl.split(':')[0]);
}
