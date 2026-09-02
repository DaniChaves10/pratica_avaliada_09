import { useContext, useEffect, useState } from 'react';
import type { ChangeEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';
import type { UsuarioLogin } from '../../models/UsuarioLogin';


export function Login() {

  const navigate = useNavigate();

  const {
    usuario,
    handleLogin,
    isLoading
  } = useContext(AuthContext);

  const [usuarioLogin, setUsuarioLogin] = useState<UsuarioLogin>({
    id: 0,
    nome: '',
    usuario: '',
    senha: '',
    foto: '',
    token: '',
  });

  useEffect(() => {

    if (usuario.token !== '') {
      navigate('/home');
    }

  }, [usuario, navigate]);

  function atualizarEstado(e: ChangeEvent<HTMLInputElement>) {

    setUsuarioLogin({
      ...usuarioLogin,
      [e.target.name]: e.target.value,
    });
  }

  function loginUser(e: ChangeEvent<HTMLFormElement>) {

    e.preventDefault();

    handleLogin(usuarioLogin);
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 min-h-screen">

      {/* Formulário */}
      <div className="flex items-center justify-center px-6 py-10">

        <form
          className="flex flex-col w-full max-w-md gap-5"
          onSubmit={loginUser}
        >

          <div>
            <h2 className="text-slate-900 text-4xl md:text-5xl font-bold">
              Entrar
            </h2>

            <p className="text-slate-500 mt-2">
              Entre na sua conta e continue jogando.
            </p>
          </div>

          <div className="flex flex-col gap-1">

            <label
              htmlFor="usuario"
              className="font-semibold"
            >
              Usuário
            </label>

            <input
              type="text"
              id="usuario"
              name="usuario"
              placeholder="Digite seu usuário"
              className="
                border-2
                border-slate-300
                rounded-lg
                p-3
                outline-none
                focus:border-teal-500
                focus:ring-2
                focus:ring-teal-200
                transition
              "
              value={usuarioLogin.usuario}
              onChange={atualizarEstado}
              required
            />

          </div>

          <div className="flex flex-col gap-1">

            <label
              htmlFor="senha"
              className="font-semibold"
            >
              Senha
            </label>

            <input
              type="password"
              id="senha"
              name="senha"
              placeholder="Digite sua senha"
              className="
                border-2
                border-slate-300
                rounded-lg
                p-3
                outline-none
                focus:border-teal-500
                focus:ring-2
                focus:ring-teal-200
                transition
              "
              value={usuarioLogin.senha}
              onChange={atualizarEstado}
              required
            />

          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="
              rounded-lg
              bg-teal-500
              hover:bg-teal-700
              disabled:bg-slate-400
              text-white
              w-full
              py-3
              font-semibold
              transition-colors
            "
          >
            {isLoading ? 'Carregando...' : 'Entrar'}
          </button>

          <hr className="border-slate-300" />

          <p className="text-center text-slate-700">

            Ainda não tem uma conta?{' '}

            <Link
              to="/cadastro"
              className="text-teal-700 font-semibold hover:underline"
            >
              Cadastre-se
            </Link>

          </p>

        </form>

      </div>

      {/* Imagem */}
      <div className="hidden lg:flex items-center justify-center bg-slate-900 overflow-hidden">

        <img
          src="https://ik.imagekit.io/vzr6ryejm/games/login.png"
          alt="Ilustração de jogos"
          className="w-full h-full object-cover"
        />

      </div>

    </div>
  );
}