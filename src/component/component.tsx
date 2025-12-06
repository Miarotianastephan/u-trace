import { IoIosArrowBack } from "react-icons/io";
import { toMoney } from "../utils/function";
import { colisT, listTypeT } from "../utils/type"
import { FaCheck } from "react-icons/fa6";
import { MdAddBox } from "react-icons/md";
import { BsFillArchiveFill } from "react-icons/bs";
import { AiFillProduct } from "react-icons/ai";
import { MdEdit } from "react-icons/md";
import { IoPerson } from 'react-icons/io5'
import { IonButton } from "@ionic/react";

const listColis = ['Quantite', 'Tracking number', 'Poids', 'Prix']
const listType = ['Nom', 'Code du produits', 'Modification', 'Suppression']

const colisTl = (type: number, i: number) => {
    if (type !== 2) return !i ? 'flex-[.6]':i === 1 ? 'flex-3' : i === 2 ? 'flex-1' : i === 3 ? 'flex-2' : i === 4 ? 'flex-2' : 'flex-1'
    else return !i ? 'flex-2' : i === 1 ? 'flex-2' : i === 2 ? 'flex-2' : i === 3 ? 'flex-1' : 'flex-2'
}
type Item = colisT | listTypeT;
function isColis(item: Item): item is colisT {
    return (item as colisT).qnt !== undefined;
}

export const ListComp = ({ type = 0, title, tabList, checkF = () => { } }: { type?: number, title: string, tabList: colisT[] | listTypeT[], checkF?: (n: number) => void }) => (
    <div className='mt-[1em] flex-1 flex flex-col gap-2'>
        {type !== 2 && <p className='font-bold text-xl'>{title}</p>}
        <div className='mt-[.5em] flex flex-col flex-1 rounded-lg border-2 border-neutral-200/15'>
            <ul className='h-[3.5em] px-1 bg-neutral-200/15 text-center items-center text-[.8em] flex'>
                {(type !== 2 ? listColis : listType).map((p, i) => <li key={i} className={colisTl(type, i)}>
                    {p}
                </li>
                )}
            </ul>
            <div className="h-[15em] relative overflow-y-auto">
                <ul className="absolute px-1 w-full divide-y text-[.8em] text-center flex flex-col p-1 gap-1">
                    {tabList.map((p: Item, i) => (
                        <li key={i} className="h-[3.5em] px-2 items-center flex bg-neutral-800">

                            {isColis(p) ? (
                                <>
                                    {type === 1 && (
                                        <span className="flex-[.6] flex justify-center items-center h-full">
                                            <span
                                                className={`rounded-sm aspect-square flex justify-center items-center h-[50%] ${p.status ? "bg-neutral-500" : "shadow-neutral-400 shadow-[0_0_0_1px]"
                                                    }`}
                                                onClick={() => checkF(i)}
                                            >
                                                {p.status && (
                                                    <span>
                                                        <FaCheck />
                                                    </span>
                                                )}
                                            </span>
                                        </span>
                                    )}

                                    <p className="ml-1">{p.qnt}</p>
                                    <p className={colisTl(type, 1)}>{p.track}</p>
                                    <p className={colisTl(type, 2)}>{p.pds}</p>
                                    <p className={colisTl(type, 3)}>{toMoney(p.prix)}</p>
                                </>
                            ) : (
                                <>
                                    <p className={colisTl(type, 0)+' '}>{p.nom}</p>
                                        <p className={colisTl(type, 1)}>{p.code}</p>
                                        <div className={colisTl(type, 2) + ' flex gap-2 justify-center'}>
                                            <button className="px-2 py-1 rounded-md bg-yellow-500 text-black hover:bg-yellow-600" onClick={() => console.log('Edit', p)}>
                                                Modifier
                                            </button>
                                        </div>
                                        <div className={colisTl(type, 3) + ' flex gap-2 justify-center'}>
                                            <button className="px-2 py-1 rounded-md bg-red-600 text-white hover:bg-red-700" onClick={() => console.log('Delete', p)}>
                                                Supprimer
                                            </button>
                                        </div>

                                </>
                            )}
                        </li>
                    ))}

                </ul>
            </div>
        </div>
    </div>
)

export const Header = ({ headerF }: { headerF: () => void }) => {
    return (
        <header className="h-[4.5em] items-center flex px-4 content-center bg-neutral-950">
            <span className="w-[5em] aspect-video flex items-center bg-neutral-800 rounded-lg justify-center" onClick={headerF}>
                <IoIosArrowBack />
            </span>
        </header>
    )
}

export const Button = ({ title = 'Enregistrer',buttonF }: { title?:string,buttonF: () => void }) => (
    <button className='mt-4 bg-violet-900 rounded-full py-5' onClick={buttonF}>{title}</button>
)
export const Footer = ({ fotterF }: { fotterF: (n:number) => void }) => {
    const tab = [{ ico: '', lbl: 'Liste des colis' }, { ico: '', lbl: 'Nouveau colis' }, { ico: '', lbl: 'Type de produits' }, { ico: '', lbl: 'Profil' }]
    return (
        <ul className="px-4 h-[6em] z-10 justify-around text-[.8em] bg-white flex items-center">

            {tab.map((p, i) => <div key={i} className="relative flex text-xs text-brand-head justify-center flex-col gap-1 items-center">
                <IonButton fill="clear" routerLink={`${!i ? '/home/admin' : i === 1 ? '/home/colis' : i === 2 ? '/home/listType' : '/home/profile'}`}  className="absolute z-10 w-full h-full" onClick={() => fotterF(i)}>
                </IonButton>
                    <span className="w-[2em] aspect-square flex justify-center items-center" >
                        {!i ? <BsFillArchiveFill size={'1.8em'} /> : i === 1 ? <MdAddBox size={'1.8em'} /> : i === 2 ? <AiFillProduct size={'1.8em'} /> : <IoPerson size={'1.6em'} />}
                    </span> 
                    <p>{p.lbl}</p> 
            </div>
            )}
        </ul>
    )
}

export const StatusChoice = ({ act, choiceF }: { act: number, choiceF: (n: number) => void }) => {
    const listStatus = ['Pas encore recus', 'Recus', 'Pret a recuperer']
    return (
        <div className='grid mt-[.5em] gap-4 text-center grid-flow-col px-2 grid-cols-3'>
            {listStatus.map((p, i) => <p key={i} className={`${i === act ? 'bg-neutral-400/25' : 'shadow-[0_0_0_2px] shadow-neutral-400'} rounded-xl aspect-square content-center `} onClick={() => choiceF(i)}>{p}</p>)}
        </div>
    )
}