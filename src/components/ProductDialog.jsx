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
 
export default function ProductDialog({open, setOpen}) {
    const handleOpen = () => setOpen(!open);
    const {getToken} = useContext(LoginContext)

    const adicionarProduto = () => {

        let url = new URL(BACKEND_URL + "/cadastrar_produto")
        let categoria = document.getElementById("categoria").value
        let marca = document.getElementById("marca").value
        let modelo = document.getElementById("modelo").value
        let descricao = document.getElementById("descricao").value

        const body = {
            categoria: categoria,
            marca: marca,
            modelo: modelo,
            descricao: descricao
        }

        fetch(url, {
            method: "post",
            body: JSON.stringify(body),
            headers: { Authorization: "Bearer " + getToken() },
        })
    }

    const handleConfirm = () => {
        adicionarProduto()
        handleOpen()
    }

    const handleCancel = () => {
        handleOpen()
    }
    
    return (
        <div>
            <Dialog open={open} handler={handleOpen} size="md" className="" dismiss={{ancestorScroll: false}}>

                <DialogHeader>Cadastrar produto</DialogHeader>

                <DialogBody >
                    <div className="max-h-[50vh] px-5 overflow-y-auto">

                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="categoria">
                            Categoria
                        </label>
                        <input 
                            className="bg-gray-100 appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                            id="categoria" 
                            type="text"
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="marca">
                            Marca
                        </label>
                        <input 
                            className="bg-gray-100 appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                            id="marca" 
                            type="text"
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="modelo">
                            Modelo
                        </label>
                        <input 
                            className="bg-gray-100 appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                            id="modelo" 
                            type="text"
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="descricao">
                            Descrição
                        </label>
                        <textarea 
                            className="bg-gray-100 appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                            id="descricao" 
                            type="text"
                        />
                    </div>

                    </div>
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