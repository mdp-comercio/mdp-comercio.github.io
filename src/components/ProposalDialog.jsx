import React, { useEffect, useState, useContext } from "react";
import { BACKEND_URL } from "../globals";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import { LoginContext } from "../services/auth";
import Select from 'react-select'
 
export default function ProposalDialog({edital, setEdital}) {

    const [open, setOpen] = useState(false)
    const handleOpen = () => setOpen(!open);
    const [items, setItems] = useState({})
    const {getToken} = useContext(LoginContext)
    const [produtos, setProdutos] = useState([])
    const [marcas, setMarcas] = useState([])

    const gerarProposta = (edital) => {
        let url = new URL(BACKEND_URL + "/gerar_proposta")
        fetch(url, {
            method: "post",
            body: JSON.stringify(edital),
            headers: { Authorization: "Bearer " + getToken() },
        })
    }

    useEffect(() => {
        if (edital != null) {
            setOpen(true)
            setItems({})
        }
    }, [edital])

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
            setMarcas([...new Set(response.map(product => product.marca))])
        })

    }, [])

    const handleConfirm = () => {
   
        let selectedItems = []
        let editalCopy = {...edital}

        edital['items'].forEach((item, idx) => {
            if (items[idx] != null) {
                item['marca'] = items[idx]['marca']
                item['modelo'] = items[idx]['modelo']
                if (item['precoUnitario'] == null)
                    item['precoUnitario'] = parseFloat(document.getElementById(idx + "_preco").value)
                selectedItems.push(item)
            } 
        })
        editalCopy['items'] = selectedItems
        gerarProposta(editalCopy)
        setEdital(null)
        handleOpen()
    }

    const handleCancel = () => {
        setEdital(null)
        handleOpen()
    }
    
    return (
        <div>
            <Dialog open={open} handler={handleOpen} size="xl" className="p-5" dismiss={{ancestorScroll: false}}>

                <DialogHeader>Proposta</DialogHeader>

                <DialogBody >
                    {edital && 
                        <div className="max-h-[50vh] overflow-y-auto">
                            <table class="table-auto">
                                <thead>
                                    <tr>
                                        <th></th>
                                        <th className="">Objeto</th>
                                        <th>Qtd</th>
                                        <th>ME</th>
                                    </tr>
                                </thead>
                                <tbody className="">
                                    {edital["items"].map((item, idx) => (
                                        <tr 
                                            id={idx} 
                                            className={items[idx] ? "bg-green-100 hover:bg-green-200" : ""}
                                        >

                                            <td onClick={e => setItems(prev => ({...prev, [idx]: prev[idx] ? undefined : {}}))}>
                                                {item['id']}
                                            </td>

                                            <td>
                                                <p 
                                                    dangerouslySetInnerHTML={{ __html: item['descricao'].replace("<em>", '<mark>').replace("</em>", '</mark>') }}
                                                >    
                                                </p>
                                            </td>

                                            <td>
                                                {item['quantidade']}
                                            </td>

                                            <td>
                                                {item['me/epp'] == "Não exclusivo ME/EPP" ? "❌" : "✅"} 
                                            </td>

                                            {items[idx] && <td className="">
                                                <div className="flex gap-5">
                                    
                                                    <Select
                                                        placeholder="Marca"
                                                        onChange={e => {
                                                            setItems(prev => ({...prev, [idx]: {...items[idx], marca: e.label}}))
                                                        }}
                                                        menuPortalTarget={document.body} 
                                                        styles={{ menuPortal: base => ({ ...base, zIndex: 9999 }) }}
                                                        className="basic-single w-32"
                                                        classNamePrefix="select"
                                                        isSearchable={true}
                                                        options={marcas.map(marca => ({
                                                            value: marca,
                                                            label: marca,
                                                        }))}
                                                    />
                                    
                                                    <Select
                                                        placeholder="Modelo"
                                                        onChange={e => {
                                                            setItems(prev => ({...prev, [idx]: {...items[idx], modelo: e.label}}))
                                                        }}
                                                        menuPortalTarget={document.body} 
                                                        styles={{ menuPortal: base => ({ ...base, zIndex: 9999 }) }}
                                                        className="basic-single w-64"
                                                        classNamePrefix="select"
                                                        isSearchable={true}
                                                        options={produtos.filter(produto => produto.marca == items[idx]["marca"]).map(produto => ({
                                                            value: produto.modelo,
                                                            label: produto.modelo,
                                                        }))}
                                                        isDisabled={items[idx]["marca"] == null}
                                                    />

                                                    {item['precoUnitario'] ?
                                                        item['precoUnitario'].toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})
                                                        : 
                                                        <input 
                                                            placeholder="Preço"
                                                            id={idx + "_preco"} 
                                                            className="bg-gray-200 w-32 p-2" 
                                                            type="number" 
                                                            onClick={e => {}}>
                                                        </input>
                                                    }
                                                </div>
                                            </td>}
                                        
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    }
                </DialogBody>

                <DialogFooter>
                <Button
                    variant="text"
                    color="red"
                    onClick={handleCancel}
                    className="mr-1"
                >
                    <span>Cancelar</span>
                </Button>
                <Button variant="gradient" color="green" onClick={handleConfirm}>
                    <span>Confirmar</span>
                </Button>
                </DialogFooter>

            </Dialog>
        </div>
    );
}