import { useContext, useEffect, useState } from "react";
import type { ChangeEvent } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { NumericFormat } from "react-number-format";
import { AuthContext } from "../../../contexts/AuthContext";
import type Produto from "../../../models/Produto";
import type Categoria from "../../../models/Categoria";
import { atualizar, buscar, cadastrar } from "../../../services/Service";
import { toast } from "react-toastify";

function FormProduto() {

	const [produto, setProduto] = useState<Produto>({
		id: 0,
		nome: "",
		preco: 0,
		foto: "",
		categoria: null
	});

	const [categorias, setCategorias] = useState<Categoria[]>([]);

	const navigate = useNavigate();

	const { id } = useParams<{ id: string }>();

	const { usuario, handleLogout } = useContext(AuthContext);

	const token = usuario.token;

	async function buscarProdutoPorId(id: string) {
		try {

			await buscar(
				`/produtos/${id}`,
				setProduto,
				{
					headers: {
						Authorization: token
					}
				}
			);

		} catch (error: any) {

			if (error.toString().includes("403")) {

				toast.warning("O token expirou, favor logar novamente.");

				handleLogout();
			}
		}
	}

	async function buscarCategorias() {
		try {

			await buscar(
				"/categorias",
				setCategorias,
				{
					headers: {
						Authorization: token
					}
				}
			);

		} catch (error: any) {

			if (error.toString().includes("403")) {

				toast.warning("O token expirou, favor logar novamente.");

				handleLogout();

			} else {

				toast.error("Erro ao buscar as categorias.");
			}
		}
	}

	useEffect(() => {

		if (token === "") {

			toast.warning("Você precisa estar logado");

			navigate("/login");
		}

	}, [token]);

	useEffect(() => {

		if (token !== "") {

			buscarCategorias();
		}

	}, [token]);

	useEffect(() => {

		if (id !== undefined && token !== "") {

			buscarProdutoPorId(id);
		}

	}, [id, token]);

	function atualizarEstado(e: ChangeEvent<HTMLInputElement>) {

		setProduto({
			...produto,
			[e.target.name]: e.target.value
		});
	}

	function atualizarCategoria(e: ChangeEvent<HTMLSelectElement>) {

		const categoriaSelecionada = categorias.find(
			(categoria) => categoria.id === Number(e.target.value)
		);

		setProduto({
			...produto,
			categoria: categoriaSelecionada || null
		});
	}

	async function gerarNovoProduto(e: ChangeEvent<HTMLFormElement>) {

		e.preventDefault();

		if (
			produto.nome === "" ||
			produto.preco <= 0 ||
			produto.foto === "" ||
			produto.categoria === null
		) {

			toast.warning("Preencha todos os campos corretamente.");

			return;
		}

		if (id !== undefined) {

			try {

				await atualizar(
					"/produtos",
					produto,
					setProduto,
					{
						headers: {
							Authorization: token
						}
					}
				);

				toast.success("Produto atualizado com sucesso!");

				retornar();

			} catch (error: any) {

				if (error.toString().includes("403")) {

					toast.warning("O token expirou, favor logar novamente.");

					handleLogout();

				} else {

					toast.error("Erro ao atualizar o Produto");
				}
			}

		} else {

			try {

				await cadastrar(
					"/produtos",
					produto,
					setProduto,
					{
						headers: {
							Authorization: token
						}
					}
				);

				toast.success("Produto cadastrado com sucesso!");

				retornar();

			} catch (error: any) {

				if (error.toString().includes("403")) {

					toast.warning("O token expirou, favor logar novamente.");

					handleLogout();

				} else {

					toast.error("Erro ao cadastrar o Produto");
				}
			}
		}
	}

	function retornar() {
		navigate("/produtos");
	}

	return (
		<div className="container flex flex-col items-center justify-center mx-auto my-4 md:h-[81vh] px-4 py-12">

			<h1 className="text-3xl md:text-4xl text-center mb-6">
				{id !== undefined ? "Editar Produto" : "Cadastrar Produto"}
			</h1>

			<form
				className="w-full max-w-lg flex flex-col gap-4"
				onSubmit={gerarNovoProduto}
			>

				<div className="flex flex-col gap-2">

					<label htmlFor="nome" className="font-medium">
						Nome do Produto
					</label>

					<input
						type="text"
						placeholder="Insira aqui o nome do Produto"
						name="nome"
						id="nome"
						required
						value={produto.nome}
						onChange={atualizarEstado}
						className="border-2 border-slate-700 rounded p-2 bg-white text-base focus:outline-none focus:ring-2 focus:ring-slate-500"
					/>

				</div>

				<div className="flex flex-col gap-2">

					<label htmlFor="preco" className="font-medium">
						Preço (R$)
					</label>

					<NumericFormat
						id="preco"
						name="preco"
						thousandSeparator="."
						decimalSeparator=","
						decimalScale={2}
						fixedDecimalScale
						allowNegative={false}
						prefix="R$ "
						value={produto.preco}
						onValueChange={(values) => {

							setProduto({
								...produto,
								preco: values.floatValue || 0
							});

						}}
						className="border-2 border-slate-700 rounded p-2 bg-white text-base focus:outline-none focus:ring-2 focus:ring-slate-500"
						placeholder="R$ 0,00"
					/>

				</div>

				<div className="flex flex-col gap-2">

					<label htmlFor="foto" className="font-medium">
						Foto do Produto
					</label>

					<input
						type="text"
						placeholder="Adicione aqui a URL da foto do Produto"
						name="foto"
						id="foto"
						required
						value={produto.foto}
						onChange={atualizarEstado}
						className="border-2 border-slate-700 rounded p-2 bg-white text-base focus:outline-none focus:ring-2 focus:ring-slate-500"
					/>

				</div>

				<div className="flex flex-col gap-2">

					<label htmlFor="categoria" className="font-medium">
						Categoria do Produto
					</label>

					<select
						name="categoria"
						id="categoria"
						value={produto.categoria?.id || ""}
						onChange={atualizarCategoria}
						className="p-2 bg-white border-2 rounded border-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-500"
					>

						<option value="" disabled>
							Selecione uma Categoria
						</option>

						{
							categorias.map((categoria) => (
								<option
									key={categoria.id}
									value={categoria.id}
								>
									{categoria.tipo}
								</option>
							))
						}

					</select>

				</div>

				<button
					className="rounded text-slate-100 bg-slate-400 hover:bg-slate-800 w-full py-2 mt-2 flex justify-center items-center text-base transition-colors"
					type="submit"
				>
					{id !== undefined ? "Editar" : "Cadastrar"}
				</button>

			</form>

		</div>
	);
}

export default FormProduto;