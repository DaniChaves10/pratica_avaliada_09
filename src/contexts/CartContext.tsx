import { createContext, useState } from "react";
import type { ReactNode } from "react";
import type Produto from "../models/Produto";

export interface ItemCarrinho {
	produto: Produto;
	quantidade: number;
}

interface CartContextType {
	carrinho: ItemCarrinho[];
	adicionarProduto(produto: Produto): void;
	removerProduto(id: number): void;
	aumentarQuantidade(id: number): void;
	diminuirQuantidade(id: number): void;
	limparCarrinho(): void;
	quantidadeTotal: number;
	valorTotal: number;
}

interface CartProviderProps {
	children: ReactNode;
}

export const CartContext = createContext({} as CartContextType);

export function CartProvider({ children }: CartProviderProps) {

	const [carrinho, setCarrinho] = useState<ItemCarrinho[]>([]);

	function adicionarProduto(produto: Produto) {

		const produtoExistente = carrinho.find(
			(item) => item.produto.id === produto.id
		);

		if (produtoExistente) {

			setCarrinho(
				carrinho.map((item) =>
					item.produto.id === produto.id
						? {
								...item,
								quantidade: item.quantidade + 1
						  }
						: item
				)
			);

		} else {

			setCarrinho([
				...carrinho,
				{
					produto,
					quantidade: 1
				}
			]);
		}
	}

	function removerProduto(id: number) {

		setCarrinho(
			carrinho.filter(
				(item) => item.produto.id !== id
			)
		);
	}

	function aumentarQuantidade(id: number) {

		setCarrinho(
			carrinho.map((item) =>
				item.produto.id === id
					? {
							...item,
							quantidade: item.quantidade + 1
					  }
					: item
			)
		);
	}

	function diminuirQuantidade(id: number) {

		setCarrinho(
			carrinho
				.map((item) =>
					item.produto.id === id
						? {
								...item,
								quantidade: item.quantidade - 1
						  }
						: item
				)
				.filter((item) => item.quantidade > 0)
		);
	}

	function limparCarrinho() {
		setCarrinho([]);
	}

	const quantidadeTotal = carrinho.reduce(
		(total, item) => total + item.quantidade,
		0
	);

	const valorTotal = carrinho.reduce(
		(total, item) =>
			total + item.produto.preco * item.quantidade,
		0
	);

	return (
		<CartContext.Provider
			value={{
				carrinho,
				adicionarProduto,
				removerProduto,
				aumentarQuantidade,
				diminuirQuantidade,
				limparCarrinho,
				quantidadeTotal,
				valorTotal
			}}
		>
			{children}
		</CartContext.Provider>
	);
}