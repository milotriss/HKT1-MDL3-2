import React, { useEffect, useState, ChangeEvent } from "react";
import "../modalCreate/modalCreate.css";
import { useDispatch, useSelector } from "react-redux";
import ApiService from "../../api/api.service";
import { IUser } from "../../types/interface";
import { notifySuccess } from "../../common/toastify";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { update } from "../../store/reducers/update";

interface Props {
  offModalEdit: Function;
  id: number;
}
const ModalEdit = (props: Props): JSX.Element => {
  const [user, setUser] = useState<IUser>();
  const [formData, setFormData] = useState<IUser>({
    name: "",
    desc: "",
  });
  const status = useSelector((state: any) => state.update);
  const dispatch = useDispatch();
  const api = new ApiService();
  useEffect(() => {
    const getData = async () => {
      const result: any = await api.GetById("users", props.id);
      const data = result.data;
      setUser(data);
    };
    getData();
  }, [status]);
  console.log(formData);
  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleUpdate = async (id:number) => {
    await api.PatchNew('users', id, formData)
    dispatch(update())
    notifySuccess("Updated successfully")
    props.offModalEdit()
  }
  return (
    <section className="modalOverlay">
      <div className="modal">
        <h1>Update a new Student</h1>
        <div className="inputGroup">
          <label htmlFor="">Name</label>
          <input
          name="name"
            onChange={handleChange}
            value={formData.name}
            autoFocus
            placeholder={user?.name}
            type="text"
          />
        </div>
        <div className="textareaGroup">
          <label htmlFor="">Description</label>
          <textarea
            onChange={handleChange}
            value={formData.desc}
            placeholder={user?.desc}
            name="desc"
            id=""
          ></textarea>
        </div>
        <button onClick={() => handleUpdate(Number(user?.id))} className="btnCreateModal">Update</button>
        <button onClick={() => props.offModalEdit()} className="btnCancelModal">
          Cancel
        </button>
      </div>
      <ToastContainer/>
    </section>
  );
};

export default ModalEdit;
