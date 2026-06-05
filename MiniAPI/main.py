# main.py — Mini API REST JSON com FastAPI

# FastAPI é o framework que cria a API (rotas, validação, docs)
from fastapi import FastAPI, HTTPException
# Pydantic (incluso no FastAPI) define "modelos" para validar JSON de entrada/saída
from pydantic import BaseModel

# Instancia o app FastAPI (pense como: "ligar" o servidor web)
app = FastAPI(title="Mini API Zoo", version="1.0.0")

# ======== MODELOS (esquemas JSON) ========

# Modelo de entrada (o cliente envia isso no corpo da requisição)
class AnimalIn(BaseModel):
    tipo: str
    nome: str

# Modelo de saída (o servidor responde isso — inclui o id gerado)
class AnimalOut(AnimalIn):
    id: int

# ======== "BANCO" EM MEMÓRIA (para começar simples) ========

# dicionário id -> AnimalOut (isso "simula" um banco de dados por enquanto)
db: dict[int, AnimalOut] = {}
# contador simples para gerar IDs automáticos
next_id: int = 1

# ======== ROTAS (endpoints REST) ========

@app.get("/ping")
def ping():
    """Rota mínima para testar se o servidor está de pé."""
    return {"status": "ok"}  # JSON de resposta

@app.post("/animais", response_model=AnimalOut, status_code=201)
def criar_animal(dados: AnimalIn):
    """
    CREATE (POST): Recebe JSON com 'tipo' e 'nome',
    gera um 'id' e guarda no 'db'.
    """
    global next_id
    novo_id = next_id
    next_id += 1

    # monta o objeto de saída (inclui id)
    animal = AnimalOut(id=novo_id, **dados.dict())
    # persiste em memória
    db[novo_id] = animal
    # retorna JSON do animal criado
    return animal

@app.get("/animais", response_model=list[AnimalOut])
def listar_animais():
    """READ (GET): Lista todos os animais cadastrados."""
    return list(db.values())

@app.get("/animais/{animal_id}", response_model=AnimalOut)
def obter_animal(animal_id: int):
    """READ (GET por id): Retorna um único animal ou 404 se não existir."""
    animal = db.get(animal_id)
    if not animal:
        # HTTPException = forma correta de responder com códigos de erro
        raise HTTPException(status_code=404, detail="Animal não encontrado")
    return animal
