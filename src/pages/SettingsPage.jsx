import React, {useEffect, useState, useContext } from "react"
import { BACKEND_URL } from "../globals"
import { LoginContext } from "../services/auth";
import ProductDialog from "../components/ProductDialog";
import { PencilIcon } from "@heroicons/react/24/solid";
import { Sidebar } from "../components/Sidebar";
import InputTags from "../components/InputTags";
import { v4 as uuid } from "uuid";
import Spinner from "../components/Spinner";

const FilterComponent = ({filter, onChange, editable}) => {
    const [keywordsTags, setKeywordsTags] = useState(filter.keyWords)
    const [blockwordsTags, setBlockwordsTags] = useState(filter.blockWords)
    const [quantityMin, setQuantityMin] = useState(filter.quantityMin)
    const [quantityMax, setQuantityMax] = useState(filter.quantityMax)

    useEffect(() => {
        let filterCopy = {...filter}
        filterCopy['keyWords'] = keywordsTags
        filterCopy['blockWords'] = blockwordsTags
        filterCopy['quantityMin'] = quantityMin
        filterCopy['quantityMax'] = quantityMax
        onChange(filterCopy)
    }, [keywordsTags, blockwordsTags, quantityMin, quantityMax])
    
    return (
        <div className="w-full flex flex-col md:flex-row bg-gray-200 shadow">
            {/* KeyWords */}
            <div className="flex flex-col w-full items-start px-2 border border-gray-300">
                <p className="md:hidden font-medium py-1">Palavras Chave: </p>
                <InputTags 
                    disabled={!editable}
                    tags={keywordsTags}
                    setTags={setKeywordsTags}
                />
            </div>
            {/* BlockWords */}
            <div className="flex flex-col w-full items-start px-2 border border-gray-300">
                <p className="md:hidden font-medium py-1">Palavras Bloqueadas: </p>
                <InputTags 
                    disabled={!editable}
                    tags={blockwordsTags}
                    setTags={setBlockwordsTags}
                />
            </div>
            {/* Min quantity */}
            <div className="flex flex-col w-full items-start p-2 border border-gray-300">
                <p className="md:hidden font-medium py-1">Quantidade mínima: </p>
                <input 
                    disabled={!editable}
                    className="bg-transparent"
                    type="number" 
                    value={quantityMin}
                    onChange={(e) => setQuantityMin(e.target.value)}
                />
            </div>
            {/* Min quantity */}
            <div className="flex flex-col w-full items-start p-2 border border-gray-300">
                <p className="md:hidden font-medium py-1">Quantidade máxima: </p>
                <input
                    disabled={!editable}
                    className="bg-transparent" 
                    type="number" 
                    value={quantityMax}
                    onChange={(e) => setQuantityMax(e.target.value)}
                />
            </div>
        </div>
    )
}

const ProductComponent = ({product, onChange, editable}) => {
    const [categoria, setCategoria] = useState(product.categoria)
    const [marca, setMarca] = useState(product.marca)
    const [modelo, setModelo] = useState(product.modelo)
    const [descricao, setDescricao] = useState(product.descricao)

    useEffect(() => {
        let productCopy = {...product}
        productCopy['categoria'] = categoria
        productCopy['marca'] = marca
        productCopy['modelo'] = modelo
        productCopy['descricao'] = descricao
        onChange(productCopy)
    }, [categoria, marca, modelo, descricao])
    
    return (
        <div className="w-full flex flex-col md:flex-row bg-gray-200 p-2 md:gap-4 shadow md:divide-x divide-gray-400">
            {/* Categoria */}
            <div className="flex flex-col w-full md:w-1/6 items-start px-2">
                <p className="md:hidden font-medium py-1">Categoria: </p>
                <input 
                    disabled={!editable}
                    className="bg-transparent w-full"
                    type="text" 
                    value={categoria}
                    onChange={(e) => setCategoria(e.target.value)}
                />
            </div>
            {/* Marca */}
            <div className="flex flex-col w-full md:w-1/6 items-start px-2">
                <p className="md:hidden font-medium py-1">Marca: </p>
                <input 
                    disabled={!editable}
                    className="bg-transparent w-full"
                    type="text" 
                    value={marca}
                    onChange={(e) => setMarca(e.target.value)}
                />
            </div>
            {/* Modelo */}
            <div className="flex flex-col w-full md:w-1/6 items-start px-2">
                <p className="md:hidden font-medium py-1">Modelo: </p>
                <input 
                    disabled={!editable}
                    className="bg-transparent w-full"
                    type="text" 
                    value={modelo}
                    onChange={(e) => setModelo(e.target.value)}
                />
            </div>
            {/* Descricao */}
            <div className="flex flex-col w-full items-start px-2">
                <p className="md:hidden font-medium py-1">Descrição: </p>
                <textarea
                    disabled={!editable}
                    className="bg-transparent w-full flex resize-y h-16 md:h-6"
                    type="text" 
                    value={descricao}
                    onChange={(e) => setDescricao(e.target.value)}
                />
            </div>
        </div>
    )
}

const SettingsPage = () => {

    const {getToken, logo} = useContext(LoginContext)
    const [open, setOpen] = useState(false)    
    const [editFilters, setEditFilters] = useState(false)
    const [editProducts, setEditProducts] = useState(false)
    const [filters, setFilters] = useState(null)
    const [products, setProducts] = useState(null)
    // const [searchText, setSearchText] = useState("")

    const getProducts = () => {
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
            console.log(response)
            setProducts(Object.values(response))
        })
    }

    const getFilters = () => {
        let url = new URL(BACKEND_URL + "/filtros")
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
            console.log(response)
            setFilters(response)
        })
    }

    const saveFilters = () => {
        let url = new URL(BACKEND_URL + "/atualizar_filtros")
        fetch(url, {
            method: "POST",
            headers: { Authorization: "Bearer " + getToken() },
            body: JSON.stringify(filters.slice(0, filters.length-1)),
        })
        setEditFilters(false)
    }

    const saveProducts = () => {
        let url = new URL(BACKEND_URL + "/atualizar_produtos")
        fetch(url, {
            method: "POST",
            headers: { Authorization: "Bearer " + getToken() },
            body: JSON.stringify(products.slice(0, products.length-1)),
        })
        setEditProducts(false)
    }

    useEffect(() => {
        getFilters()
        getProducts()
    }, [])

    return (<>
    
        <Sidebar></Sidebar>
    
            <div className="w-full h-full bg-gray-100 p-10 sm:px-10">
                {!filters || !products ? 
                    <div className="h-screen w-full"><Spinner /></div> 
                    : 
                    <div className="flex flex-col h-full w-full gap-10">

                        <div className="w-full">
                            <div className="flex items-center gap-5 ">
                                <h1 className="py-5 text-2xl font-bold">
                                    Filtros
                                </h1>
                                <div>
                                    {editFilters ?
                                        <div className="flex items-center gap-2">
                                            <p 
                                                onClick={() => saveFilters()}
                                                className=" bg-orange-800 text-white px-2 py-1 rounded-full font-medium
                                                hover:bg-orange-900 cursor-pointer"
                                            >
                                                    Salvar
                                            </p>
                                        </div> :
                                        <button 
                                            onClick={() => setEditFilters(true)}
                                            className='
                                                bg-[var(--primary)] p-2 rounded-3xl  
                                                hover:bg-[var(--primary-opacity-80)] 
                                            '
                                        >
                                            <PencilIcon className="w-5 h-5 text-white" aria-hidden="true" />
                                        </button>
                                    }
                                </div>
                            </div>

                            <div className="flex flex-col w-full gap-5 md:gap-2">

                                <div className="hidden md:flex w-full gap-5">
                                    <div className="w-full"><p className="flex text-sm text-gray-800">Palavras Chave</p></div>
                                    <div className="w-full"><p className="flex text-sm text-gray-800">Palavras Bloqueadas</p></div>
                                    <div className="w-full"><p className="flex text-sm text-gray-800">Quantidade mínima</p></div>
                                    <div className="w-full"><p className="flex text-sm text-gray-800">Quantidade máxima</p></div>
                                </div>

                                {filters?.map((filter, idx) => {
                                    if (editFilters == false && idx == filters.length-1) {
                                        return null
                                    }
                                    return (
                                        <FilterComponent 
                                            key={filter.id}
                                            filter={filter} 
                                            editable={editFilters}
                                            onChange={(new_filter) => {
                                                setFilters(prev => {
                                                    let filters = [...prev]
                                                    filters[idx] = new_filter
                                                    const removeIndex = filters.findIndex(filter => (
                                                        !filter.keyWords?.length &&
                                                        !filter.blockWords?.length &&
                                                        !(filter.quantityMin != "" && filter.quantityMin != null) &&
                                                        !(filter.quantityMax != "" && filter.quantityMax != null)
                                                    ))
                                                    if (removeIndex != -1 && removeIndex != filters.length-1) {
                                                        filters.splice(removeIndex, 1)
                                                    } 
                                                    if (removeIndex == -1) {
                                                        filters.push({
                                                            id: uuid(),
                                                            keyWords: [],
                                                            blockWords: [],
                                                            quantityMin: null,
                                                            quantityMax: null
                                                        })
                                                    }
                                                    return filters
                                                })
                                            }} 
                                        />
                                    )
                                })}
                            </div>
                        </div>

                        <div className="w-full h-full">
                            <div className="flex items-center gap-5 ">
                                <h1 className="py-5 text-2xl font-bold">
                                    Produtos
                                </h1>
                                <div>
                                    {editProducts ?
                                        <div className="flex items-center gap-2">
                                            <p 
                                                onClick={() => saveProducts()}
                                                className=" bg-orange-800 text-white px-2 py-1 rounded-full font-medium
                                                hover:bg-orange-900 cursor-pointer"
                                            >
                                                    Salvar
                                            </p>
                                        </div> :
                                        <button 
                                            onClick={() => setEditProducts(true)}
                                            className='
                                                bg-[var(--primary)] p-2 rounded-3xl  
                                                hover:bg-[var(--primary-opacity-80)] 
                                            '
                                        >
                                            <PencilIcon className="w-5 h-5 text-white" aria-hidden="true" />
                                        </button>
                                    }
                                </div>
                            </div>

                            <div className="flex flex-col w-full gap-5 md:gap-2">

                                <div className="hidden md:flex w-full gap-4 px-2">
                                    <div className="w-1/6"><p className="flex text-sm text-gray-800">Categoria</p></div>
                                    <div className="w-1/6"><p className="flex text-sm text-gray-800">Marca</p></div>
                                    <div className="w-1/6"><p className="flex text-sm text-gray-800">Modelo</p></div>
                                    <div className="w-full"><p className="flex text-sm text-gray-800">Descrição</p></div>
                                </div>

                                {products?.map((product, idx) => {
                                    if (editProducts == false && idx == products.length-1) {
                                        return null
                                    }
                                    return (
                                        <ProductComponent 
                                            key={product.id}
                                            product={product} 
                                            editable={editProducts}
                                            onChange={(new_product) => {
                                                setProducts(prev => {
                                                    let products = [...prev]
                                                    products[idx] = new_product
                                                    const removeIndex = products.findIndex(product => (
                                                        !(product.categoria && product.categoria != "") &&
                                                        !(product.marca && product.marca != "") &&
                                                        !(product.modelo && product.modelo != "") &&
                                                        !(product.descricao && product.descricao != "")
                                                    ))
                                                    if (removeIndex != -1 && removeIndex != products.length-1) {
                                                        products.splice(removeIndex, 1)
                                                    } 
                                                    if (removeIndex == -1) {
                                                        products.push({
                                                            id: uuid(),
                                                            categoria: null,
                                                            marca: null,
                                                            modelo: null,
                                                            descricao: null
                                                        })
                                                    }
                                                    return products
                                                })
                                            }} 
                                        />
                                    )
                                })}
                            </div>
                        </div>
                        
                    </div>
                }
            </div>

        <ProductDialog open={open} setOpen={setOpen}/>

    </>)
}

export default SettingsPage