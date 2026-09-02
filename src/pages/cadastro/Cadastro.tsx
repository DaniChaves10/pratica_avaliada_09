import { useState } from 'react';
import type { ChangeEvent, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';
import type Usuario from '../../models/Usuario';
import { cadastrarUsuario } from '../../services/Service';
import { toast } from "react-toastify";

export default function Cadastro() {
  const navigate = useNavigate();

  const [confirmarSenha, setConfirmarSenha] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [usuario, setUsuario] = useState<Usuario>({
    id: 0,
    nome: '',
    usuario: '',
    senha: '',
    foto: '',
    dataNascimento: '',
  });

  function atualizarEstado(e: ChangeEvent<HTMLInputElement>) {
    setUsuario({
      ...usuario,
      [e.target.name]: e.target.value,
    });
  }

  function handleConfirmarSenha(e: ChangeEvent<HTMLInputElement>) {
    setConfirmarSenha(e.target.value);
  }

  // Validação de Idade usando Dayjs
  function validarMaioridade(dataNascimento: string): boolean {
    if (!dataNascimento) return false;
    
    const hoje = dayjs();
    const dataNasc = dayjs(dataNascimento);
    const idade = hoje.diff(dataNasc, 'year');

    return idade >= 18;
  }

  async function cadastrar(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    // 1. Validação do tamanho da senha
    if (!usuario.senha || usuario.senha.length < 8) {
      toast.warning('A senha deve ter no mínimo 8 caracteres.');
      return;
    }

    // 2. Validação da confirmação de senha
    if (usuario.senha !== confirmarSenha) {
      toast.error('As senhas informadas não coincidem.');
      return;
    }

    // 3. Validação da idade mínima (+18 anos)
    if (!validarMaioridade(usuario.dataNascimento || '')) {
      toast.error('É necessário ter pelo menos 18 anos para se cadastrar.');
      return;
    }

    setIsLoading(true);

    try {
      await cadastrarUsuario(`/usuarios/cadastrar`, usuario, setUsuario);
      toast.success('Usuário cadastrado com sucesso!');
      navigate('/login');
    } catch (error) {
      toast.error('Erro ao cadastrar o Usuário! Verifique os dados informados.');
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 h-screen place-items-center font-bold">
      <div className="fundoCadastro hidden lg:block"></div>
      <form className="flex justify-center items-center flex-col w-2/3 gap-3" onSubmit={cadastrar}>
        <h2 className="text-slate-900 text-5xl">Cadastrar</h2>

        <div className="flex flex-col w-full">
          <label htmlFor="nome">Nome</label>
          <input
            type="text"
            id="nome"
            name="nome"
            placeholder="Nome"
            className="border-2 border-slate-700 rounded p-2"
            value={usuario.nome}
            onChange={atualizarEstado}
            required
          />
        </div>

        <div className="flex flex-col w-full">
          <label htmlFor="usuario">Usuario</label>
          <input
            type="email"
            id="usuario"
            name="usuario"
            placeholder="Usuario (e-mail)"
            className="border-2 border-slate-700 rounded p-2"
            value={usuario.usuario}
            onChange={atualizarEstado}
            required
          />
        </div>

        <div className="flex flex-col w-full">
          <label htmlFor="foto">Foto (URL)</label>
          <input
            type="text"
            id="foto"
            name="foto"
            placeholder="Foto"
            className="border-2 border-slate-700 rounded p-2"
            value={usuario.foto}
            onChange={atualizarEstado}
          />
        </div>

        <div className="flex flex-col w-full">
          <label htmlFor="dataNascimento">Data de Nascimento</label>
          <input
            type="date"
            id="dataNascimento"
            name="dataNascimento"
            className="border-2 border-slate-700 rounded p-2"
            value={usuario.dataNascimento}
            onChange={atualizarEstado}
            required
          />
        </div>

        <div className="flex flex-col w-full">
          <label htmlFor="senha">Senha</label>
          <input
            type="password"
            id="senha"
            name="senha"
            placeholder="Senha (mínimo 8 caracteres)"
            className="border-2 border-slate-700 rounded p-2"
            value={usuario.senha}
            onChange={atualizarEstado}
            required
          />
        </div>

        <div className="flex flex-col w-full">
          <label htmlFor="confirmarSenha">Confirmar Senha</label>
          <input
            type="password"
            id="confirmarSenha"
            name="confirmarSenha"
            placeholder="Confirmar Senha"
            className="border-2 border-slate-700 rounded p-2"
            value={confirmarSenha}
            onChange={handleConfirmarSenha}
            required
          />
        </div>

        <div className="flex justify-around w-full gap-4 mt-4">
          <button
            type="button"
            className="rounded text-white bg-red-400 hover:bg-red-700 w-1/2 py-2"
            onClick={() => navigate('/login')}
          >
            Cancelar
          </button>
          <button
            type="submit"
            className="rounded text-white bg-indigo-400 hover:bg-indigo-900 w-1/2 py-2 flex justify-center"
          >
            {isLoading ? 'Carregando...' : 'Cadastrar'}
          </button>
        </div>
      </form>
    </div>
  );
}