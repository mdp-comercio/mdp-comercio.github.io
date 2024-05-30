import { useState } from "react";
import Dropdown from "../components/Dropdown"
import ProposalDialog from "./ProposalDialog";
import SmartText from "../components/SmartText";

const EditaisList = ({editais}) => {

    const [edital, setEdital] = useState(null)

    return (
        <>
            {editais && editais.map((edital, idx) => (
                <div key={idx} className="px-5 pb-5 mb-10 bg-white rounded-lg shadow-lg text-sm">
                    
                    <div className="flex flex-wrap justify-between items-center p-5 gap-5">
                        <div className="">
                            <h3> {edital['orgao']} </h3>
                        </div>

                        <div className="flex gap-10 items-center">
                            <Dropdown 
                                placeholder={"Arquivos"}
                                options={edital['anexos'].map(anexo => (
                                    {
                                        value: anexo['url'],
                                        label: anexo['nome']
                                    }
                                ))}
                                onSelect={window.open}
                            />
                            <a href={edital['portalUrl']} target="_blank"> Abrir portal </a>
                            <button 
                                className="bg-[var(--primary-opacity-80)] hover:bg-[var(--primary)] text-white font-bold rounded-lg p-2"
                                onClick={() => setEdital(edital)}
                            > 
                                Fazer proposta 
                            </button> 
                        </div>

                    </div>
                
                    <hr className="mb-5"></hr>
                    
                    <div className="flex flex-wrap lg:flex-nowrap gap-10 justify-between">

                        <div className="flex flex-col gap-2">
                            <p> <strong>Portal:</strong> {edital['portalNome']} </p>
                            <p> <strong>Estado:</strong> {edital['uf']} </p>
                            <p> <strong>Pregão:</strong> {edital['pregao']} </p>
                            <p> <strong>UASG:</strong> {edital['uasg']} </p>
                            
                            <p> <strong>Data Inicial:</strong> {new Date(edital['dataInicial']*1000).toLocaleString('pt-br')} </p>
                            <p> <strong>Data Final:</strong> {new Date(edital['dataFinal']*1000).toLocaleString('pt-br')} </p>
                            <p> <strong>Data Publicação:</strong> {new Date(edital['dataPublicacao']*1000).toLocaleString('pt-br')} </p>
                            <p> <strong>Modalidade:</strong> {edital['modalidade']} </p>
                        </div>
                        
                        <div className="flex flex-col gap-5 w-full xl:w-3/4">
                            <div>
                                <SmartText text={edital['descricao']} length={150}/>
                            </div>

                            <div className="overflow-x-auto">
                                <table className="table-auto">
                                    <thead>
                                        <tr>
                                            <th></th>
                                            <th className="">Objeto</th>
                                            <th>Preço</th>
                                            <th>Qtd</th>
                                            <th>ME</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {edital["items"].map((item, idx) => (
                                            <tr key={idx} className={item['highlight'] ? "bg-orange-100" : ""}>
                                                <td>{item['id']}</td>
                                                <td>
                                                    <SmartText text={item['descricao']} length={100}/>
                                                </td>
                                                <td>{item['precoUnitario']?.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})}</td>
                                                <td>{parseInt(item['quantidade'])}</td>
                                                <td>
                                                    {item['me/epp'] == false ? "❌" : "✅"} 
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                        </div>
                    </div>
                </div>
            ))}

            <ProposalDialog edital={edital} setEdital={setEdital}/>

        </>
    )
}

export default EditaisList