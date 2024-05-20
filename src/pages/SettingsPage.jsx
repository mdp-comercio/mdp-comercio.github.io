import React, {useEffect, useState, useContext} from "react"
import { BACKEND_URL } from "../globals"
import { LoginContext } from "../services/auth";
import ProductDialog from "../components/ProductDialog";
import { PlusIcon } from "@heroicons/react/24/solid";
import { Sidebar } from "../components/Sidebar";

const SettingsPage = () => {

    const [produtos, setProdutos] = useState(null)
    const {getToken} = useContext(LoginContext)
    const [open, setOpen] = useState(false)
    const [searchText, setSearchText] = useState("")

    // Consulta os produtos cadastrados 
    useEffect(() => {
        
        let url = new URL(BACKEND_URL + "/produtos")
        
        fetch(url, {
            method: "GET",
            headers: { Authorization: "Bearer " + getToken() },
        })
        .then(response => {
            if (response.ok) {
                return response.json()
            } else {
                logout()
            }
        })
        .then(response => {
            setProdutos(response)
        })

    }, [])

    const removerProduto = (id) => {
        let url = new URL(BACKEND_URL + "/remover_produto")
        url.searchParams.append('id', id)
        
        fetch(url, {
            method: "DELETE",
            headers: { Authorization: "Bearer " + getToken() },
        })
        .then(response => {
            if (response.ok) {
                return response.json()
            } else {
                logout()
            }
        })
    }

    return (<>
    
        <Sidebar></Sidebar>
    
        <div className="w-full h-screen bg-gray-100 p-10 sm:px-10">
            <div className="flex flex-col h-full">

                <div className="h-1/2">
                    <div className="flex gap-5 items-center mb-2">
                        <h1 className="py-5 text-2xl font-bold">
                            Produtos cadastrados
                        </h1>
                        <div>
                            <button 
                                onClick={() => setOpen(true)}
                                className='
                                    bg-[var(--primary)] p-2 rounded-3xl  
                                    hover:bg-[var(--primary-opacity-80)]
                                '
                            >
                                <PlusIcon className="h-6 w-6 text-white" aria-hidden="true" />
                            </button>
                        </div>
                        <div>
                            <input 
                                onChange={e => setSearchText(e.target.value)}
                                className="p-2 rounded-xl border-2 border-gray-400 focus:outline-none"
                            />
                        </div>
                    </div>

                    <div className="max-h-full overflow-y-scroll border-2 rounded-xl border-[var(--primary)]">
                        <table className="bg-white">
                            <thead className="">
                                <tr>
                                    <th>Categoria</th>
                                    <th>Marca</th>
                                    <th>Modelo</th>
                                    <th>Descrição</th>
                                </tr>
                            </thead>
                            <tbody className="w-full overflow-hidden">
                                {produtos?.filter(product => 
                                    product.categoria.toLowerCase().includes(searchText.toLowerCase()) ||
                                    product.marca.toLowerCase().includes(searchText.toLowerCase()) ||
                                    product.modelo.toLowerCase().includes(searchText.toLowerCase()) ||
                                    product.descricao.toLowerCase().includes(searchText.toLowerCase())
                                ).map(produto => (
                                    <tr className="">
                                        <td>{produto['categoria']}</td>
                                        <td>{produto['marca']}</td>
                                        <td>{produto["modelo"]}</td>
                                        <td>{produto["descricao"]}</td>
                                        {/* <td onClick={() => removerProduto([produto['categoria'], produto['marca'], produto["modelo"]].join("_"))}>❌</td> */}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>  
                </div>
            </div>

            <ProductDialog open={open} setOpen={setOpen}/>
        </div>
    </>)
}

export default SettingsPage