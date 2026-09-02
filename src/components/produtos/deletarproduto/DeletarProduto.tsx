import { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { DNA } from 'react-loader-spinner'
import type Produto from '../../../models/Produto'
import { AuthContext } from '../../../contexts/AuthContext'
import { buscar, deletar } from '../../../services/Service'
import { toast } from "react-toastify";

function DeletarProduto() {

    const navigate = useNavigate()

    const { id } = useParams<{ id: string }>()

    const { usuario } = useContext(AuthContext)

    const [produto, setProduto] = useState<Produto>({
        id: 0,
        nome: '',
        preco: 0,
        foto: '',
        categoria: null
    })

    const [isLoading, setIsLoading] = useState(false)

    async function buscarPorId() {

        try {

            await buscar(
                `/produtos/${id}`,
                setProduto,
                {
                    headers: {
                        Authorization: usuario.token
                    }
                }
            )

        } catch (error) {

            console.error(error)

            toast.error('Erro ao buscar o produto.')

            navigate('/produtos')
        }
    }

    async function deletarProduto() {

        setIsLoading(true)

        try {

            await deletar(
                `/produtos/${id}`,
                {
                    headers: {
                        Authorization: usuario.token
                    }
                }
            )

            toast.success('Produto deletado com sucesso!')

            navigate('/produtos')

        } catch (error: any) {

            console.error(error)

            if (error.response?.status === 401) {

                toast.warning('Sua sessão expirou. Faça login novamente.')

                navigate('/')

            } else {

                toast.error('Erro ao deletar o produto.')
            }

        } finally {

            setIsLoading(false)
        }
    }

    useEffect(() => {

        if (usuario.token === '') {

            toast.warning('Você precisa estar logado.')

            navigate('/')

            return
        }

        if (id !== undefined) {
            buscarPorId()
        }

    }, [id, usuario.token])

    return (
        <div className='container w-full max-w-md mx-auto px-4 pt-20 md:pt-6'>

            <h1 className='text-3xl md:text-4xl text-center py-4'>
                Deletar Produto
            </h1>

            <p className='text-center font-semibold mb-4 text-base md:text-lg'>
                Você tem certeza de que deseja apagar o produto a seguir?
            </p>

            <div className='border flex flex-col rounded-2xl overflow-hidden justify-between'>

                <header
                    className='py-2 px-4 md:px-6 bg-slate-600 text-white font-bold text-lg md:text-2xl'
                >
                    Produto
                </header>

                <p className='p-4 md:p-8 text-xl md:text-3xl bg-white h-full'>
                    {produto.nome}
                </p>

                <div className="flex flex-row">

                    <button
                        className='text-slate-100 bg-red-500 hover:bg-red-700 w-full py-2 text-base md:text-lg'
                        onClick={() => navigate('/produtos')}
                    >
                        Não
                    </button>

                    <button
                        className='w-full text-slate-100 bg-teal-600 hover:bg-teal-800 flex items-center justify-center text-base md:text-lg'
                        onClick={deletarProduto}
                        disabled={isLoading}
                    >

                        {
                            isLoading ? (
                                <DNA
                                    visible={true}
                                    height="40"
                                    width="40"
                                    ariaLabel="dna-loading"
                                />
                            ) : (
                                <span>Sim</span>
                            )
                        }

                    </button>

                </div>

            </div>

        </div>
    )
}

export default DeletarProduto