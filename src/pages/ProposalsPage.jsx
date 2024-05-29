import React, {useEffect, useState, useContext} from "react"
import { BACKEND_URL } from "../globals"
import { DocumentIcon } from '@heroicons/react/24/solid';
import { LoginContext } from "../services/auth";
import Spinner from "../components/Spinner";
import dayjs from "dayjs";
import { Sidebar } from "../components/Sidebar";

const ProposalsPage = () => {

    const [propostas, setPropostas] = useState(null)
    const [downloading, setDownloading] = useState(false)
    const {getToken, logout} = useContext(LoginContext)

    // Consulta as propostas criadas 
    useEffect(() => {
        
        let url = new URL(BACKEND_URL + "/propostas")
        
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
            response.sort((a, b) => b["dataProposta"]-  a["dataProposta"]);
            setPropostas(response)
        })

    }, [])

    // Download pdf
    const download_pdf = async (id) => {
        setDownloading(id)
        let url = new URL(BACKEND_URL + "/download")
        url.searchParams.append("id", id)

        let response = await fetch(url, {
            method: "GET",
            headers: { Authorization: "Bearer " + getToken() },
        })

        const blob = await response.blob();
        url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.style.display = "none";
        a.href = url;
        a.download = id + ".pdf";
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        setDownloading(false)
    }

    return (<>

        <Sidebar></Sidebar>

        <div className="flex flex-col w-full bg-gray-100 p-5 overflow-x-auto">
            {!propostas?.length ? <Spinner/> :
            <table className="table-auto bg-white ">
                <thead>
                    <tr className="">
                        <th>Data</th>
                        <th >Orgão</th>
                        <th>Pregão</th>
                        <th>Portal</th>
                        <th>PDF</th>
                    </tr>
                </thead>
                <tbody>
                    {propostas?.map(proposta => (
                        <tr className="text-sm">
                            <td>{dayjs(proposta["dataProposta"]*1000).format("DD/MM/YYYY")}</td>
                            <td>{proposta["orgao"]}</td>
                            <td>{proposta["pregao"]}</td>
                            <td>
                                <a href={proposta["portalUrl"]} target="_blank"> 
                                    Abrir 
                                </a>
                            </td>
                            <td className="flex justify-start">
                                <DocumentIcon onClick={() => download_pdf(proposta["id"])} className="w-6 text-red-400"/>
                                {downloading == proposta["id"] && <Spinner className="w-6 h-6 border-4"/>}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            }
            
        </div>
    </>)
}

export default ProposalsPage