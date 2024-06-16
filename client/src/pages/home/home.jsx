import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useHttp } from "../../hooks/http.hook";
import ModalCreateClient from "../../components/modalCreateClient/modalCreateClient";
import "./home.css";

const Home = ({ responsibleUser }) => {
    const https = import.meta.env.VITE_REACT_APP_HTTPS;
    const { id } = useParams();
    const navigate = useNavigate();
    const { request } = useHttp();
    const [clients, setClients] = useState({});
    const [clientsTable, setClientsTable] = useState("");
    const [modalShow, setModalShow] = useState(false);

    useEffect(() => {
        if (!responsibleUser._id || id !== responsibleUser._id) {
            navigate(`/`);
            toast.warn("Вы не вошли в систему.", {
                position: "bottom-right",
                theme: "light",
            });
        } else {
            getClients(responsibleUser);
        }
    }, [responsibleUser]);

    const openModal = () => setModalShow(true);
    const closeModal = () => setModalShow(false);

    const сhangeStatus = async (event, id) => {
        try {
            const data = await request(
                `${https}/client/changeStatusClient/${id}`,
                "PUT",
                JSON.stringify({ status: event.target.value })
            );
            if (data.message === "OK") {
                toast.success("Статус изменён.", {
                    position: "bottom-right",
                    theme: "light",
                });
            }
        } catch (error) {
            toast.error("Произошла ошибка при изменении статуса.", {
                position: "bottom-right",
                theme: "light",
            });
            console.log(error);
        }
    };

    const createTabel = (clients) => {
        const table = clients.map((client) => {
            return (
                <tr key={client._id}>
                    <td>{client.accountNumber}</td>
                    <td>{client.surname}</td>
                    <td>{client.name}</td>
                    <td>{client.middleName}</td>
                    <td>{client.birthDate}</td>
                    <td>{client.inn}</td>
                    <td>{client.fullNameResponsiblePerson}</td>
                    <td>
                        <select
                            defaultValue={client.status}
                            onChange={(event) =>
                                сhangeStatus(event, client._id)
                            }
                        >
                            <option value="В работе">В работе</option>
                            <option value="Отказ">Отказ</option>
                            <option value="Сделка закрыта">
                                Сделка закрыта
                            </option>
                        </select>
                    </td>
                </tr>
            );
        });
        setClientsTable(table);
    };

    const getClients = async (responsibleUser) => {
        try {
            const queryParams = new URLSearchParams({
                fullName: responsibleUser.fullName,
            }).toString();
            const data = await request(
                `${https}/client/getClients`,
                "GET",
                queryParams
            );
            if (data.message === "OK") {
                setClients(data.data);
                createTabel(data.data);
            }
        } catch (error) {
            toast.error("Произошла ошибка при получении данных клиента.", {
                position: "bottom-right",
                theme: "light",
            });
            console.log(error);
        }
    };

    return (
        <div className="container">
            {modalShow && (
                <ModalCreateClient
                    setClients={setClients}
                    closeModalCreateClient={closeModal}
                    responsibleUser={responsibleUser}
                    getClients={getClients}
                />
            )}
            <button className="button-сreate-client" onClick={openModal}>
                Создать клиента
            </button>
            <table className="table-client">
                <thead>
                    <tr>
                        <th>Номер счета</th>
                        <th>Фамилия</th>
                        <th>Имя</th>
                        <th>Отчество</th>
                        <th>Дата рождения</th>
                        <th>ИНН</th>
                        <th>ФИО ответственного</th>
                        <th>Статус</th>
                    </tr>
                </thead>
                <tbody>{clientsTable}</tbody>
            </table>
        </div>
    );
};

export default Home;
