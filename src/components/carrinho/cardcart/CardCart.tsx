import { useContext } from "react";
import { MinusIcon, PlusIcon, TrashIcon } from "@phosphor-icons/react";
import { CartContext } from "../../../contexts/CartContext";
import type { ItemCarrinho } from "../../../contexts/CartContext";

interface CardCartProps {
	item: ItemCarrinho;
}

function CardCart({ item }: CardCartProps) {

	const {
		aumentarQuantidade,
		diminuirQuantidade,
		removerProduto
	} = useContext(CartContext);

	const subtotal =
		item.produto.preco * item.quantidade;

	return (
		<div className='flex gap-4 bg-white rounded-lg p-4 shadow-sm border border-gray-200'>

			<div className='w-32 h-32 shrink-0 bg-gray-50 rounded-lg p-2 flex items-center justify-center'>

				<img
					src={item.produto.foto}
					className='max-h-full max-w-full object-contain'
					alt={item.produto.nome}
				/>

			</div>

			<div className='grow flex flex-col justify-between'>

				<div>

					<h3 className='font-semibold text-gray-800 mb-1'>
						{item.produto.nome}
					</h3>

					<p className='text-sm text-gray-500 mb-2'>
						Categoria: {item.produto.categoria?.tipo}
					</p>

					<p className='text-xl font-bold text-blue-600'>
						{item.produto.preco.toLocaleString(
							"pt-BR",
							{
								style: "currency",
								currency: "BRL"
							}
						)}
					</p>

				</div>

				<div className='flex items-center gap-4 mt-3'>

					<div className='flex items-center gap-2 border border-gray-300 rounded-lg'>

						<button
							onClick={() =>
								diminuirQuantidade(item.produto.id)
							}
							className='p-2 hover:bg-gray-100 rounded-l-lg transition-colors'
						>
							<MinusIcon
								size={20}
								className="text-gray-600"
							/>
						</button>

						<span className='px-4 font-semibold text-gray-800 min-w-10 text-center'>
							{item.quantidade}
						</span>

						<button
							onClick={() =>
								aumentarQuantidade(item.produto.id)
							}
							className='p-2 hover:bg-gray-100 rounded-r-lg transition-colors'
						>
							<PlusIcon
								size={20}
								className="text-gray-600"
							/>
						</button>

					</div>

					<button
						onClick={() =>
							removerProduto(item.produto.id)
						}
						className='p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors'
						title="Remover produto"
					>
						<TrashIcon size={20} />
					</button>

				</div>

			</div>

			<div className='flex flex-col items-end justify-between'>

				<p className='text-lg font-bold text-gray-800'>
					{subtotal.toLocaleString(
						"pt-BR",
						{
							style: "currency",
							currency: "BRL"
						}
					)}
				</p>

			</div>

		</div>
	);
}

export default CardCart;