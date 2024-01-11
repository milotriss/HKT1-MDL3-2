import React, { ChangeEvent, useState } from 'react'
import './modalCreate.css'
import ApiService from '../../api/api.service'
import { IUser } from '../../types/interface'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { notifySuccess, notifyWarning } from '../../common/toastify'
import { useDispatch } from 'react-redux'
import { update } from '../../store/reducers/update'
interface Props {
    offModal:Function
}
const ModalCreate = (props:Props):JSX.Element => {
    const dispatch = useDispatch()
    const userApi = new ApiService()
    const [formData, setFormData] = useState<IUser>({
        name: "",
        desc: "",
    })
    console.log(formData);
    
    const handleChange = (e:ChangeEvent<HTMLInputElement|HTMLTextAreaElement>) => {
            setFormData({
                ...formData,
                [e.target.name]:e.target.value
        })
    }
    const handleCreate = async () => {
        if (formData.name.length === 0 || formData.desc.length === 0) {
            notifyWarning('Please enter all fields')
        }else{
            await userApi.Post("users",formData)
            dispatch(update())
            notifySuccess('Created successfully')
            props.offModal()
        }
    }   
  return (
    <section className="modalOverlay">
        <div className="modal">
            <h1>Create a new Student</h1>
            <div className="inputGroup">
                <label htmlFor="">Name</label>
                <input name='name' value={formData.name} onChange={handleChange} autoFocus placeholder='Name' type="text" />
            </div>
            <div className="textareaGroup">
                <label htmlFor="">Description</label>
                <textarea value={formData.desc} onChange={handleChange} name="desc" id=""></textarea>
            </div>
            <button onClick={handleCreate} className='btnCreateModal'>Create</button>
            <button onClick={() => props.offModal()} className='btnCancelModal'>Cancel</button>
        </div>
        <ToastContainer/>
    </section>
  )
}

export default ModalCreate