# ============================================
# ZOO CRUD com UI (Streamlit) + POO + JSON
# - Abstração / Encapsulamento / Herança / Polimorfismo
# - Persistência em arquivo JSON
# - UI com Streamlit: criar, listar, filtrar, atualizar, deletar
# ============================================

from abc import ABC, abstractmethod
from typing import List, Optional, Dict
from pathlib import Path
import json

import streamlit as st
import pandas as pd

# ---------------------------
# Caminho do arquivo de dados
# ---------------------------
DATA_FILE = Path(__file__).parent / "zoo_data.json"


# ---------------------------
# MODELO (POO)
# ---------------------------

class Animal(ABC):
    """Classe base (abstração): define contrato mínimo dos animais."""
    def __init__(self, _id: int, nome: str):
        self._id = _id
        self.nome = nome  # usa o setter (validação)

    @property
    def id(self) -> int:
        return self._id  # somente leitura

    @property
    def nome(self) -> str:
        return self._nome

    @nome.setter
    def nome(self, valor: str) -> None:
        # Encapsulamento: valida e normaliza nome
        if not valor or not valor.strip():
            raise ValueError("O nome do animal não pode ser vazio.")
        self._nome = valor.strip().title()

    @property
    @abstractmethod
    def tipo(self) -> str:
        """Cada subclasse expõe seu tipo (ex.: 'Gato')."""
        pass

    @abstractmethod
    def som_texto(self) -> str:
        """Retorna o som do animal como string (útil para UI)."""
        pass

    def __str__(self) -> str:
        return f"[{self.id}] {self.tipo}: {self.nome}"

    def to_dict(self) -> Dict:
        """Serializa para JSON."""
        return {"id": self.id, "nome": self.nome, "tipo": self.tipo}


# ---- HERANÇA + POLIMORFISMO ----

class Cachorro(Animal):
    @property
    def tipo(self) -> str:
        return "Cachorro"

    def som_texto(self) -> str:
        return f"O {self.tipo} {self.nome} diz: Au au!"


class Gato(Animal):
    @property
    def tipo(self) -> str:
        return "Gato"

    def som_texto(self) -> str:
        return f"O {self.tipo} {self.nome} diz: Miau!"


class Passaro(Animal):
    @property
    def tipo(self) -> str:
        return "Pássaro"

    def som_texto(self) -> str:
        return f"O {self.tipo} {self.nome} diz: Piu piu!"


# ---------------------------
# REPOSITÓRIO / SERVIÇO
# ---------------------------

class Zoologico:
    """Gerencia lista de animais + CRUD + persistência JSON."""
    def __init__(self):
        self._animais: List[Animal] = []
        self._proximo_id: int = 1
        self._carregar()

    # ---------- Persistência ----------
    def _carregar(self) -> None:
        if not DATA_FILE.exists():
            return
        try:
            payload = json.loads(DATA_FILE.read_text(encoding="utf-8"))
            self._proximo_id = int(payload.get("proximo_id", 1))
            self._animais = [self._factory_from_dict(d) for d in payload.get("animais", [])]
            # Ajuste defensivo: garante sequência de IDs
            if self._animais:
                maior_id = max(a.id for a in self._animais)
                self._proximo_id = max(self._proximo_id, maior_id + 1)
        except Exception as e:
            st.warning(f"Falha ao carregar dados: {e}")
            self._animais, self._proximo_id = [], 1

    def _salvar(self) -> None:
        try:
            payload = {
                "proximo_id": self._proximo_id,
                "animais": [a.to_dict() for a in self._animais],
            }
            DATA_FILE.write_text(json.dumps(payload, ensure_ascii=False, indent=2), encoding="utf-8")
        except Exception as e:
            st.warning(f"Falha ao salvar dados: {e}")

    # ---------- Fábrica ----------
    def _factory_from_dict(self, d: Dict) -> Animal:
        _id = int(d["id"])
        nome = str(d["nome"])
        tipo = str(d["tipo"]).lower()
        if tipo == "cachorro":
            return Cachorro(_id, nome)
        if tipo == "gato":
            return Gato(_id, nome)
        if tipo in ("pássaro", "passaro", "passáro"):
            return Passaro(_id, nome)
        raise ValueError(f"Tipo desconhecido no arquivo: {d['tipo']}")

    # ---------- Util ----------
    def _novo_id(self) -> int:
        atual = self._proximo_id
        self._proximo_id += 1
        return atual

    # ---------- CRUD ----------
    def criar(self, tipo: str, nome: str) -> Animal:
        tipo = tipo.lower().strip()
        _id = self._novo_id()
        if tipo == "cachorro":
            obj = Cachorro(_id, nome)
        elif tipo == "gato":
            obj = Gato(_id, nome)
        elif tipo in ("pássaro", "passaro", "passáro"):
            obj = Passaro(_id, nome)
        else:
            raise ValueError("Tipo inválido. Use: Cachorro, Gato ou Pássaro.")
        self._animais.append(obj)
        self._salvar()
        return obj

    def listar(self) -> List[Animal]:
        return list(self._animais)

    def buscar(self, _id: int) -> Optional[Animal]:
        return next((a for a in self._animais if a.id == _id), None)

    def atualizar_nome(self, _id: int, novo_nome: str) -> bool:
        a = self.buscar(_id)
        if not a:
            return False
        a.nome = novo_nome
        self._salvar()
        return True

    def deletar(self, _id: int) -> bool:
        a = self.buscar(_id)
        if not a:
            return False
        self._animais.remove(a)
        self._salvar()
        return True

    def sons(self) -> List[str]:
        """Polimorfismo: todos respondem a 'som_texto' do próprio tipo."""
        return [a.som_texto() for a in self._animais] if self._animais else ["Nenhum animal cadastrado."]


# ===================================================
# UI (Streamlit) — tudo abaixo é tela e interação
# ===================================================

st.set_page_config(page_title="ZOO CRUD • POO + JSON", page_icon="🐾", layout="centered")
st.title("🐾 ZOO CRUD — POO + JSON (Streamlit)")
st.caption("Abstração • Encapsulamento • Herança • Polimorfismo  |  Persistência em JSON")

# instância do serviço guardada na sessão (evita recarregar a cada interação)
if "zoo" not in st.session_state:
    st.session_state.zoo = Zoologico()
zoo: Zoologico = st.session_state.zoo

with st.sidebar:
    st.header("➕ Cadastrar Animal")
    tipo = st.selectbox("Tipo", ["Cachorro", "Gato", "Pássaro"])
    nome = st.text_input("Nome")
    if st.button("Cadastrar", type="primary"):
        try:
            novo = zoo.criar(tipo, nome)
            st.success(f"Cadastrado: {novo}")
        except Exception as e:
            st.error(f"Erro: {e}")

st.subheader("📋 Lista de animais")
col1, col2 = st.columns([2, 1])
with col1:
    filtro_tipo = st.selectbox("Filtrar por tipo", ["Todos", "Cachorro", "Gato", "Pássaro"])
with col2:
    busca = st.text_input("Busca por nome")

# monta DataFrame para exibir de forma amigável
dados = [{"ID": a.id, "Tipo": a.tipo, "Nome": a.nome} for a in zoo.listar()]
df = pd.DataFrame(dados)

# aplica filtros da UI
if not df.empty:
    if filtro_tipo != "Todos":
        df = df[df["Tipo"] == filtro_tipo]
    if busca:
        df = df[df["Nome"].str.contains(busca, case=False, na=False)]

st.dataframe(df, use_container_width=True, hide_index=True)

st.divider()
st.subheader("✏️ Atualizar / 🗑️ Deletar")

ids_disponiveis = [a.id for a in zoo.listar()]
if ids_disponiveis:
    alvo_id = st.selectbox("Selecione o ID do animal", ids_disponiveis)
    alvo = zoo.buscar(alvo_id)
    st.write(f"Selecionado: **[{alvo.id}] {alvo.tipo} — {alvo.nome}**")

    colA, colB = st.columns(2)
    with colA:
        novo_nome = st.text_input("Novo nome", value=alvo.nome, key=f"novo_nome_{alvo.id}")
        if st.button("Atualizar nome"):
            try:
                ok = zoo.atualizar_nome(alvo.id, novo_nome)
                st.success("Nome atualizado!" if ok else "ID não encontrado.")
            except Exception as e:
                st.error(f"Erro: {e}")

    with colB:
        if st.button("Deletar", type="secondary"):
            ok = zoo.deletar(alvo.id)
            if ok:
                st.success("Removido com sucesso.")
            else:
                st.error("ID não encontrado.")
else:
    st.info("Nenhum animal para atualizar/deletar.")

st.divider()
st.subheader("🔊 Emitir sons (polimorfismo)")
if st.button("Ouvir todo mundo 🐶🐱🐦"):
    for linha in zoo.sons():
        st.write("• " + linha)

st.caption("Dica: o arquivo **zoo_data.json** guarda seus dados.")
