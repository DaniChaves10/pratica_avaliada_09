import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import CardCart from "../cardcart/CardCart";
import { CartContext } from "../../../contexts/CartContext";
import { AuthContext } from "../../../contexts/AuthContext";
import { toast } from "react-toastify";

function Cart() {

	const navigate = useNavigate();

	const {
		carrinho,
		quantidadeTotal,
		valorTotal,
		limparCarrinho
	} = useContext(CartContext);

	const { usuario } = useContext(AuthContext);

	useEffect(() => {

		if (usuario.token === "") {

			toast.warning("Você precisa estar logado");

			navigate("/login");
		}

	}, [usuario.token]);

	function finalizarCompra() {

		if (carrinho.length === 0) {

			toast.warning("Seu carrinho está vazio.");

			return;
		}

		toast.success("Compra finalizada com sucesso!");

		limparCarrinho();
	}

	return (
		<div className="min-h-screen bg-gray-100 py-8">

			<div className="container mx-auto px-4">

				<h1 className="text-3xl md:text-4xl text-center text-gray-800 mb-8">
					Carrinho de Compras
				</h1>

				{
					carrinho.length === 0 ? (

						<div className="bg-white rounded-lg p-8 text-center text-gray-600">
							Seu carrinho está vazio.
						</div>

					) : (

						<div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

							<div className="lg:col-span-2 space-y-4">

								{
									carrinho.map((item) => (
										<CardCart
											key={item.produto.id}
											item={item}
										/>
									))
								}

							</div>

							<div className="lg:col-span-1">

								<div className="bg-white rounded-lg shadow-sm p-6 sticky top-4">

									<h2 className="text-xl font-bold text-gray-800 mb-4 pb-4 border-b border-gray-200">
										Resumo da Compra
									</h2>

									<div className="space-y-3 mb-6">

										<div className="flex justify-between text-gray-600">

											<span>
												Produtos ({quantidadeTotal})
											</span>

											<span className="font-semibold text-gray-800">

												{valorTotal.toLocaleString(
													"pt-BR",
													{
														style: "currency",
														currency: "BRL"
													}
												)}

											</span>

										</div>

										<div className="flex justify-between text-gray-600">

											<span>Frete</span>

											<span className="font-semibold text-green-600">
												Grátis
											</span>

										</div>

										<div className="flex justify-between text-gray-600">

											<span>Desconto</span>

											<span className="font-semibold text-gray-800">
												R$ 0,00
											</span>

										</div>

									</div>

									<div className="flex justify-between items-center text-lg font-bold py-4 mb-6 border-t border-gray-200">

										<span className="text-gray-800">
											Total
										</span>

										<span className="text-2xl text-blue-600">

											{valorTotal.toLocaleString(
												"pt-BR",
												{
													style: "currency",
													currency: "BRL"
												}
											)}

										</span>

									</div>

									<button
										onClick={finalizarCompra}
										className="w-full bg-teal-500 hover:bg-teal-900 text-white font-semibold py-3 rounded-lg transition-colors"
										type="button"
									>
										Finalizar Compra
									</button>

									<p className="text-xs text-gray-500 text-center mt-4">
										Frete grátis para todo o Brasil
									</p>

								</div>

							</div>

						</div>

					)
				}

			</div>

		</div>
	);
}

export default Cart;