import { Category, Product } from "./models";
import { Role, User } from "./user";
import { Cart } from "./cart";

// --- Etapa 1: Models Base ---
const eletronicos: Category = { id: 1, name: "Eletrônicos" };
const perifericos: Category = { id: 2, name: "Periféricos" };

const notebook: Product = { id: 101, name: "Notebook Pro", price: 4500.0, category: eletronicos };
const mouse: Product    = { id: 102, name: "Mouse Gamer",  price:  250.0, category: perifericos };
const teclado: Product  = { id: 103, name: "Teclado RGB",  price:  380.0, category: perifericos };

// --- Etapa 2: Usuários com Role ---
const admin: User    = new User(1, "admin_user",    "admin@loja.com",    Role.ADMIN);
const cliente: User  = new User(2, "joao_cliente",  "joao@email.com",    Role.CUSTOMER);

// Linha abaixo causaria ERRO DE COMPILAÇÃO (descomente para verificar):
// const invalido: User = new User(3, "hacker", "x@x.com", "MANAGER");

console.log("=== Usuários ===");
console.log(`${admin.username} — Role: ${admin.role}`);
console.log(`${cliente.username} — Role: ${cliente.role}`);

// --- Etapa 3: Carrinho ---
const cart = new Cart();

cart.addItem(notebook, 1);
cart.addItem(mouse, 2);
cart.addItem(teclado, 1);

// Adiciona mouse novamente: deve acumular, não duplicar
cart.addItem(mouse, 1);

console.log("\n=== Carrinho ===");
cart.getItems().forEach((item) => {
  console.log(`  ${item.product.name} x${item.quantity} — R$ ${item.product.price * item.quantity}`);
});

console.log(`\nTotal de unidades : ${cart.getTotalItems()}`);
console.log(`Valor final       : R$ ${cart.getFinalPrice().toFixed(2)}`);
