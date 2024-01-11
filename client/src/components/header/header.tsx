import React, { useState } from 'react'
import './header.css'
import ModalCreate from '../modalCreate/modalCreate'
const Header = ():JSX.Element => {
    const [openModal, setModal] = useState<boolean>(false)


    const offModal = ()=> {
        setModal(false)
    }
  return (
    <header>
        <button onClick={() => setModal(true)} className='btnCreate'>Create</button>
        {openModal ?  <ModalCreate offModal={offModal}/> : null}
    </header>
  )
}

export default Header