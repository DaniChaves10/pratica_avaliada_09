import { useContext, useState } from "react"
import { ListIcon, ShoppingCartIcon, SignOutIcon, UserIcon } from "@phosphor-icons/react"
import { Link, useNavigate } from "react-router-dom"
import { AuthContext } from "../../contexts/AuthContext"
import SearchForm from "./SearchForm"
import { CartContext } from "../../contexts/CartContext"
import { toast } from "react-toastify";

function Navbar() {

	const navigate = useNavigate()
	const { usuario, handleLogout } = useContext(AuthContext)
	const { quantidadeTotal } = useContext(CartContext)
	const [menuAberto, setMenuAberto] = useState(false)
	
	function logout() {
		handleLogout()
		setMenuAberto(false)
		toast.success("Usuário deslogado com sucesso!")
		navigate("/")
	}

	function fecharMenu() {
		setMenuAberto(false)
	}

	if (usuario.token === "") {
	return null
	}

	return (
		<>
			{/* Navbar fixa no topo */}
			<div className="w-full flex justify-center py-4 text-white bg-slate-800 md:py-2">
				<div className="container flex items-center justify-between mx-6 mt-2 text-lg">

					{/* Logo */}
					<Link
						to="/home"
						onClick={fecharMenu}
					>
						<img
							src="https://ik.imagekit.io/vzr6ryejm/games/logolg.png"
							alt="Logo"
							className="w-50 md:w-60"
						/>
					</Link>

					{/* Barra de busca */}
					<div className="relative flex items-center justify-center w-2/5 text-black max-md:hidden">
						<SearchForm />
					</div>

					{/* Menu desktop */}
					<div className="items-center hidden gap-4 py-4 md:flex">

						<Link
							to="/produtos"
							className="hover:underline"
						>
							Produtos
						</Link>

						<Link
							to="/cadastrarproduto"
							className="hover:underline"
						>
							Cadastrar Produto
						</Link>

						<Link
							to="/categorias"
							className="hover:underline"
						>
							Categorias
						</Link>

						<Link
							to="/cadastrarcategoria"
							className="hover:underline"
						>
							Cadastrar Categoria
						</Link>

						<Link
							to="/perfil"
							aria-label="Minha conta"
							className="hover:opacity-80 transition-opacity"
						>
							<UserIcon size={32} weight="bold" />
						</Link>

						<Link
							to="/carrinho"
							aria-label="Carrinho de compras"
							className="relative flex items-center hover:opacity-80 transition-opacity"
						>
							<ShoppingCartIcon size={32} weight="bold" />

							{
								quantidadeTotal > 0 && (
									<span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
										{quantidadeTotal}
									</span>
								)
							}

						</Link>

						<button
							type="button"
							onClick={logout}
							aria-label="Sair"
							className="hover:opacity-80 transition-opacity cursor-pointer"
						>
							<SignOutIcon size={32} weight="bold" />
						</button>

					</div>

					{/* Botão mobile */}
					<button
						type="button"
						className="md:hidden text-white p-2"
						aria-label="Abrir menu"
						onClick={() => setMenuAberto(!menuAberto)}
					>
						<ListIcon size={28} />
					</button>

				</div>
			</div>

			{/* Menu mobile */}
			<div
				className={`
					${menuAberto ? "flex" : "hidden"}
					md:hidden
					flex-col
					gap-3
					w-full
					bg-slate-800
					text-white
					px-6
					py-4
					border-t
					border-slate-700
				`}
			>

				<div className="text-black">
					<SearchForm />
				</div>

				<Link
					to="/produtos"
					onClick={fecharMenu}
					className="hover:underline"
				>
					Produtos
				</Link>

				<Link
					to="/cadastrarproduto"
					onClick={fecharMenu}
					className="hover:underline"
				>
					Cadastrar Produto
				</Link>

				<Link
					to="/categorias"
					onClick={fecharMenu}
					className="hover:underline"
				>
					Categorias
				</Link>

				<Link
					to="/cadastrarcategoria"
					onClick={fecharMenu}
					className="hover:underline"
				>
					Cadastrar Categoria
				</Link>

				<Link
					to="/perfil"
					onClick={fecharMenu}
					className="flex items-center gap-2 hover:underline"
				>
					<UserIcon size={24} weight="bold" />
					Minha conta
				</Link>

				<Link
					to="/carrinho"
					onClick={fecharMenu}
					className="flex items-center gap-2 hover:underline"
				>
					<span className="relative flex items-center">

						<ShoppingCartIcon
							size={24}
							weight="bold"
						/>

						{
							quantidadeTotal > 0 && (
								<span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
									{quantidadeTotal}
								</span>
							)
						}

					</span>

					Carrinho
				</Link>

				<button
					type="button"
					onClick={logout}
					className="flex items-center gap-2 hover:underline text-left cursor-pointer"
				>
					<SignOutIcon size={24} weight="bold" />
					Sair
				</button>

			</div>
		</>
	)
}

export default Navbar