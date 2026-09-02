import { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { DNA } from 'react-loader-spinner'
import CardProduto from '../cardprodutos/CardProduto'
import type Produto from '../../../models/Produto'
import { buscar } from '../../../services/Service'
import { AuthContext } from '../../../contexts/AuthContext'
import { toast } from "react-toastify";
import { useSearchParams } from 'react-router-dom'

function ListaProdutos() {

	const navigate = useNavigate()

	const [searchParams] = useSearchParams()

	const nome = searchParams.get("nome")

	const [produtos, setProdutos] = useState<Produto[]>([])

	const { usuario } = useContext(AuthContext)

	async function buscarProdutos() {

	try {

		const url = nome
			? `/produtos/nome/${encodeURIComponent(nome)}`
			: "/produtos"

		await buscar(
			url,
			setProdutos,
			{
				headers: {
					Authorization: usuario.token
				}
			}
		)

	} catch (error: any) {

		if (
			error.toString().includes("401") ||
			error.toString().includes("403")
		) {

			toast.warning("Sua sessão expirou. Faça login novamente.")

			navigate("/login")

		} else {

			toast.error("Erro ao buscar os produtos.")
		}
	}
}

	useEffect(() => {

		if (usuario.token === '') {
			toast.warning('Você precisa estar logado.')
			navigate('/login')
			return
		}

		buscarProdutos()

	}, [usuario.token, nome])

	return (
		<>
			{
				produtos.length === 0 ? (
					<DNA
						visible={true}
						height="200"
						width="200"
						ariaLabel="dna-loading"
						wrapperClass="dna-wrapper mx-auto"
					/>
				) : (
					<div className="flex justify-center mt-6 md:mt-8">
						<div className="container flex flex-col m-2 md:my-0">

							<div className="
								grid grid-cols-2 gap-3
								sm:gap-4
								lg:gap-6 lg:grid-cols-3
								xl:grid-cols-5
								2xl:grid-cols-5
								mb-4 md:mb-0
								p-2 md:p-4
							">

								{
									produtos.map((produto) => (
										<CardProduto
											key={produto.id}
											produto={produto}
										/>
									))
								}

							</div>
						</div>
					</div>
				)
			}
		</>
	)
}

export default ListaProdutos