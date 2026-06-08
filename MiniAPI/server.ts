import app from './app';

const PORT = process.env.PORT ?? 3000;

app.listen(PORT, () => {
  console.log(`\n🚀 MiniAPI rodando em http://localhost:${PORT}`);
  console.log('Endpoints disponíveis:');
  console.log('  GET    /products');
  console.log('  GET    /products?category=eletronicos');
  console.log('  GET    /products/:id');
  console.log('  POST   /orders');
  console.log('  PATCH  /orders/:id');
  console.log('  DELETE /orders/:id\n');
});
