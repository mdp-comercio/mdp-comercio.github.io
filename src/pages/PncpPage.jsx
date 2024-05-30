import React, {useContext, useEffect, useMemo, useState} from "react"
import { BACKEND_URL } from "../globals"
import InputDate from "../components/InputDate"; 
import InputSelect from "../components/InputSelect"
import InputText from "../components/InputText";
import EditaisList from "../components/EditaisList";
import { LoginContext } from "../services/auth";
import { Sidebar } from "../components/Sidebar";
import dayjs from "dayjs";
import Spinner from "../components/Spinner";
import { useSearchParams } from "react-router-dom";

const PncpPage = () => {

    const [searchParams, setSearchParams] = useSearchParams()
    const [editais, setEditais] = useState([])
    const [filteredEditais, setFilteredEditais] = useState([])
    const [date, setDate] = useState()
    const {getToken, logout} = useContext(LoginContext)
    const [portal, setPortal] = useState("Todos")
    const [search, setSearch] = useState("")

    useEffect(() => {
        const date = searchParams.get('dataPublicacao')
        setDate(date ? dayjs(date, 'DD-MM-YYYY') : dayjs())
    }, [])

    // Memo to update portal options when editais is updated
    const portaisOptions = useMemo(() => {
        let options = new Set(["Todos"])
        editais?.forEach((edital) => {
            options.add(edital.portalNome)
        })
        return [...options].map(option => ({value: option, label: option}))
    }, [editais])


    // Consulta os avisos recebidos pelo PNCP
    useEffect(() => {
        if (date == null) return
        let url = new URL(BACKEND_URL + "/avisos_pncp")
        url.searchParams.append("dia", date.date())
        url.searchParams.append("mes", date.month()+1)
        url.searchParams.append("ano", date.year())
        
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
            setEditais(response)
        })

    }, [date])


    // Filtros
    useEffect(() => {
        // Deep copy
        let filteredEditais = JSON.parse(JSON.stringify(editais))
        
        // Filtra pelo portal
        if (portal != "Todos") {
            filteredEditais = filteredEditais.filter(edital => 
                edital.portalNome == portal
            )
        }

        // Filtra pela busca
        function process_text (text) {
            text = text.toLowerCase()
            text = text.normalize('NFD').replace(/[\u0300-\u036f]/g, '')
            return text
        }

        if (search != "") {
            filteredEditais = filteredEditais.filter((edital, editalIdx) => {
                let filter = false
                edital["items"].forEach((item, itemIdx) => {
                    if (process_text(item['descricao']).includes(process_text(search))) {
                        filter =  true
                        filteredEditais[editalIdx]["items"][itemIdx]["highlight"] = true
                    }
                })
                return filter
            })
        }

        setFilteredEditais(filteredEditais)

    }, [editais, portal, search])


    return (<>

        <Sidebar>
            <div className="flex flex-col">
                <div className="w-full px-8 py-2">
                    <div className="text-sm">Selecione a data:</div>
                    <InputDate
                        value={date}
                        setValue={setDate}
                    />
                </div>
                <div className="w-full px-8 py-2">
                    <div className="text-sm">Selecione o portal:</div>
                    <InputSelect
                        value={portal}
                        setValue={setPortal}
                        options={portaisOptions}
                    />
                </div>
                <div className="w-full px-8 py-2">
                    <div className="text-sm" >Pesquisa:</div>
                    <InputText 
                        value={search}
                        setValue={setSearch}
                    />
                </div>
            </div>
        </Sidebar>

        <div className="w-full bg-gray-100 px-5 py-10 xs:px-10">
            {filteredEditais.length == 0 ? <div className="w-full h-screen"><Spinner/></div> :
            <EditaisList editais={filteredEditais}/>}
        </div>
        
    </>)
}

export default PncpPage