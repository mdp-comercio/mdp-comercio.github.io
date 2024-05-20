import { useMemo, useState } from 'react';
import { InboxIcon, DocumentTextIcon, TrophyIcon, Cog6ToothIcon } from '@heroicons/react/24/outline';
import Logo from "../assets/logo.png";
import { Link, useLocation } from 'react-router-dom';
import {Bars3Icon} from '@heroicons/react/24/outline';

function Item({text, Icon, to}) {

  const location = useLocation()
  const classes = useMemo(() => {
      return (location.pathname != to ?
        'flex ms-5 p-3 gap-5 text-gray-600 border-[var(--primary)] hover:text-[var(--primary)] hover:border-r-8'
        : 'flex ms-5 p-3 gap-5 font-bold border-[var(--primary)] text-[var(--primary)] border-r-8')
    }, [location])

  return (
    <Link className={classes} to={to}>
      <Icon className="h-6 w-6" /> 
      <p>{text}</p>
    </Link>
  );
}

export function Sidebar({children}) {

  const [open, setOpen] = useState(false)

  return (<>
    <div className="hidden flex-col w-[400px] sticky top-0 h-screen xl:flex">
      <div className='flex justify-center'>
        <img className="h-32" src={Logo} alt="Logo" />
      </div>

      <hr className='m-2'></hr>

      <div className='flex flex-col text-md hover:bg-blue'>
        <Item text="Effecti" Icon={InboxIcon} to="/effecti"/>
        <Item text="PNCP" Icon={InboxIcon} to="/pncp"/>
        <Item text="Propostas" Icon={DocumentTextIcon} to="/propostas"/>
        <Item text="Configurações" Icon={Cog6ToothIcon} to="/configuracoes"/>
      </div>

      <hr className='m-2'></hr>

      <div className='flex flex-col text-md hover:bg-blue'>
        {children}
      </div>
    
    </div>  

    {open == false && 
      <div className="absolute flex flex-row w-full h-[80px] sticky top-0 xl:hidden bg-white shadow">
        <div className='flex h-full items-center ms-5'>
          <Bars3Icon onClick={() => setOpen(prev => !prev)} className="flex h-8"/>
        </div>
      </div> 
    }

    {open == true && 

      <div className="absolute w-full sticky top-0 h-screen bg-white">
        <div className="absolute flex flex-row w-full h-[80px] sticky top-0 xl:hidden bg-white shadow">
          <div className='flex h-full items-center ms-5'>
            <Bars3Icon onClick={() => setOpen(prev => !prev)} className="flex h-8"/>
          </div>
        </div> 

        <div className='flex flex-col text-md hover:bg-blue mt-5'>
          <Item text="Effecti" Icon={InboxIcon} to="/effecti"/>
          <Item text="PNCP" Icon={InboxIcon} to="/pncp"/>
          <Item text="Propostas" Icon={DocumentTextIcon} to="/propostas"/>
          <Item text="Configurações" Icon={Cog6ToothIcon} to="/configuracoes"/>
        </div>

        <hr className='m-2'></hr>

        <div className='flex flex-col text-md hover:bg-blue'>
          {children}
        </div>

      </div>  
    }

  </>);
}