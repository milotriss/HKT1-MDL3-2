import React, { useEffect, useRef, useState } from "react";
import "./body.css";
import ModalEdit from "../modalEdit/modalEdit";
import { useDispatch, useSelector } from "react-redux";
import ApiService from "../../api/api.service";
import { IUser } from "../../types/interface";
import { update } from "../../store/reducers/update";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { notifySuccess } from "../../common/toastify";
const Body = (): JSX.Element => {
  const [onModalEdit, setModalEdit] = useState<boolean>(false);
  const [users, setUser] = useState<IUser[]>([]);
  const status = useSelector((state: any) => state.update);
  const dispatch = useDispatch();
  const api = new ApiService();
  const idRef:any = useRef()


  
  useEffect(() => {
    const getData = async () => {
      const result: any = await api.GetAll("users");
      const data = result.data;
      setUser(data);
    };
    getData();
  }, [status]);

  const offModalEdit = () => {
    setModalEdit(false);
  };
  const getId= (id:number)=>{
    idRef.current = id;
  }
  const handleDelete = async (id: number) => {
    console.log(123);
    await api.Delete("users", id);
    dispatch(update());
    notifySuccess("Delete Success");
  };
  return (
    <section className="table">
      <h1 className="titleBody">Student Lists</h1>
      <table className="bodyTable">
        <thead>
          <th>Id </th>
          <th>Name</th>
          <th>Description</th>
          <th>Action</th>
        </thead>
        <tbody>
          {users.length > 0 &&
            users.map((item: IUser) => {
              return (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>{item.name}</td>
                  <td>{item.desc}</td>
                  <td className="action">
                    <button
                      onClick={() => handleDelete(Number(item.id))}
                      className="deleteStudent"
                    >
                      Delete
                    </button>
                    <button
                      onClick={() =>{
                        getId(Number(item.id))
                       setModalEdit(true)}}
                      className="editStudent"
                    >
                      Edit
                    </button>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
      <ToastContainer />
      {onModalEdit ? <ModalEdit id={idRef.current} offModalEdit={offModalEdit} /> : null}
    </section>
  );
};

export default Body;
