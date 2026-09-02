import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import type Produto from "../../../models/Produto";
import { buscar } from "../../../services/Service";
import { AuthContext } from "../../../contexts/AuthContext";

function CarrosselProdutos() {

  const navigate = useNavigate();

  const { usuario } = useContext(AuthContext);

  const [produtos, setProdutos] = useState<Produto[]>([]);

  async function buscarProdutos() {
    try {

      await buscar(
        "/produtos",
        setProdutos,
        {
          headers: {
            Authorization: usuario.token
          }
        }
      );

    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {

    if (usuario.token !== "") {
      buscarProdutos();
    }

  }, [usuario.token]);

  return (
    <section className="bg-white py-8 md:py-12">

      <div className="container mx-auto px-4 md:px-8">

        <div className="flex items-center justify-between mb-6">

          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-slate-800">
              Produtos em destaque
            </h2>

            <p className="text-slate-500 mt-1">
              Confira alguns jogos disponíveis na loja
            </p>
          </div>

          <button
            type="button"
            onClick={() => navigate("/produtos")}
            className="hidden sm:block text-teal-700 font-semibold hover:underline"
          >
            Ver todos
          </button>

        </div>

        <div
          className="
            flex
            gap-4
            overflow-x-auto
            pb-4
            scroll-smooth
          "
        >

          {produtos.slice(0, 8).map((produto) => (

            <div
              key={produto.id}
              className="
                min-w-45
                sm:min-w-55
                md:min-w-60
                bg-white
                border
                border-slate-200
                rounded-xl
                overflow-hidden
                shadow-sm
                hover:shadow-md
                transition-shadow
              "
            >

              <div className="h-44 bg-slate-100 flex items-center justify-center p-3">

                <img
                  src={produto.foto}
                  alt={produto.nome}
                  className="max-h-full max-w-full object-contain"
                />

              </div>

              <div className="p-4">

                <h3 className="font-semibold text-slate-800 truncate">
                  {produto.nome}
                </h3>

                <p className="text-sm text-slate-500">
                  {produto.categoria?.tipo}
                </p>

                <p className="text-lg font-bold text-teal-700 mt-2">
                  {produto.preco.toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL"
                  })}
                </p>

              </div>

            </div>

          ))}

        </div>

        <button
          type="button"
          onClick={() => navigate("/produtos")}
          className="sm:hidden mt-2 text-teal-700 font-semibold hover:underline"
        >
          Ver todos os produtos
        </button>

      </div>

    </section>
  );
}

export default CarrosselProdutos;