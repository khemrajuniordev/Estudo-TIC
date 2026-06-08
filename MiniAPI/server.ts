import app from './app';

const PORT = process.env.PORT ?? 3000;

app.listen(PORT, () => {
  console.log(`\n🚀 MiniAPI rodando em http://localhost:${PORT}`);
  console.log('Endpoints disponíveis:');
  console.log('  GET    /category              (paginação: ?page=1&size=10)');
  console.log('  GET    /category/:id          (UUID)');
  console.log('  POST   /category');
  console.log('  PUT    /category/:id');
  console.log('  DELETE /category/:id');
  console.log('  ---');
  console.log('  GET    /products              (filtro: ?category=<uuid>)');
  console.log('  POST   /products');
  console.log('  DELETE /products/:id');
  console.log('  ---');
  console.log('  POST   /orders');
  console.log('  PATCH  /orders/:id');
  console.log('  DELETE /orders/:id\n');
});
