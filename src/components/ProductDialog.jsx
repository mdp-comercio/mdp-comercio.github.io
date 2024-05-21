import React, { useContext } from "react";
import { BACKEND_URL } from "../globals";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
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
            <Dialog open={open} handler={handleOpen} maxWidth="xl">

                <DialogTitle>Cadastrar produto</DialogTitle>

                <DialogContent >
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

                    <div className="">
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
                </DialogContent>

                <DialogActions>
                    <Button variant="contained" color="error" onClick={handleCancel}>
                        Cancelar
                    </Button>
                    <Button variant="contained" color="success" onClick={handleConfirm}>
                        Confirmar
                    </Button>
                </DialogActions>

            </Dialog>
        </div>
    );
}