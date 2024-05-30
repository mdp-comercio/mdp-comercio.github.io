import React, {useEffect, useState, useContext} from "react"
import { BACKEND_URL } from "../globals"
import { DocumentIcon } from '@heroicons/react/24/solid';
import { LoginContext } from "../services/auth";
import Spinner from "../components/Spinner";
import dayjs from "dayjs";
import { Sidebar } from "../components/Sidebar";

const ProposalComponent = ({proposal}) => {

    const {getToken} = useContext(LoginContext)
    const [downloading, setDownloading] = useState(false)

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

    return (
        <div className="w-full flex flex-col md:flex-row bg-gray-200 p-2 md:gap-4 shadow md:divide-x divide-gray-400">
            {/* Data */}
            <div className="flex flex-col w-full md:w-1/6 items-start px-2">
                <p className="md:hidden font-medium py-1">Data: </p>
                <p className="bg-transparent w-full flex text-wrap">
                    {dayjs(proposal["dataProposta"]*1000).format("DD/MM/YYYY")}
                </p>
            </div>
            {/* Orgao */}
            <div className="flex flex-col w-full md:w-2/6 items-start px-2">
                <p className="md:hidden font-medium py-1">Orgão: </p>
                <p className="bg-transparent w-full flex text-wrap">
                   {proposal['orgao']} 
                </p>
            </div>
            {/* Pregao */}
            <div className="flex flex-col w-full md:w-1/6 items-start px-2">
                <p className="md:hidden font-medium py-1">Pregão: </p>
                <p className="bg-transparent w-full flex text-wrap">
                   {proposal['pregao']} 
                </p>
            </div>
            {/* Portal */}
            <div className="flex flex-col w-full md:w-1/6 items-start px-2">
                <p className="md:hidden font-medium py-1">Portal: </p>
                <a className="bg-transparent w-full flex" href={proposal["portalUrl"]} target="_blank"> 
                    Abrir 
                </a>
            </div>
            {/* PDF */}
            <div className="flex flex-col w-full md:w-1/6 items-start px-2">
                <p className="md:hidden font-medium py-1">PDF: </p>
                <div className="bg-transparent w-full flex">
                    <DocumentIcon onClick={() => download_pdf(proposal["id"])} className="w-6 text-red-400 cursor-pointer"/>
                    {downloading == proposal["id"] && <Spinner className="w-6 h-6 border-4"/>}
                </div>
            </div>
        </div>
    )
}

const ProposalsPage = () => {

    const [propostas, setPropostas] = useState(null)
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

   

    return (<>

        <Sidebar></Sidebar>

        <div className="flex flex-col w-full bg-gray-100 p-5 overflow-x-auto">
            <h1 className="py-5 text-2xl font-bold">
                Propostas
            </h1>

            {!propostas?.length ? <div className="w-full h-screen"><Spinner/></div> :
                <div className="flex flex-col w-full gap-5 md:gap-2">
                    <div className="hidden md:flex w-full gap-5">
                        <div className="w-1/6"><p className="flex text-sm text-gray-800">Data</p></div>
                        <div className="w-2/6"><p className="flex text-sm text-gray-800">Orgão</p></div>
                        <div className="w-1/6"><p className="flex text-sm text-gray-800">Pregão</p></div>
                        <div className="w-1/6"><p className="flex text-sm text-gray-800">Portal</p></div>
                        <div className="w-1/6"><p className="flex text-sm text-gray-800">PDF</p></div>
                    </div> 

                    {propostas?.map((proposta, idx) => (
                        <ProposalComponent 
                            key={idx}
                            proposal={proposta}
                        />
                    ))}
                </div>
            }
            
        </div>
    </>)
}

export default ProposalsPage