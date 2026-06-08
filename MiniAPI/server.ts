import app from './app';

const PORT = process.env.PORT ?? 3000;

app.listen(PORT, () => {
  console.log(`\n🚀 MiniAPI rodando em http://localhost:${PORT}`);
  console.log('--- Autenticação ---');
  console.log('  POST   /auth/login              { email, password }');
  console.log('--- Categories (GET público / escrita requer admin JWT) ---');
  console.log('  GET    /category                ?page=1&size=10');
  console.log('  GET    /category/:id');
  console.log('  POST   /category                [admin]');
  console.log('  PUT    /category/:id            [admin]');
  console.log('  DELETE /category/:id            [admin]');
  console.log('--- Products (GET público / escrita requer admin JWT) ---');
  console.log('  GET    /products                ?page=1&size=10');
  console.log('  GET    /products/:id');
  console.log('  POST   /products                [admin]');
  console.log('  PUT    /products/:id            [admin]');
  console.log('  DELETE /products/:id            [admin]');
  console.log('--- Seed: admin@api.com / admin123 ---\n');
});
