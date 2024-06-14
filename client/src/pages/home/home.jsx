import { useState } from "react";
import ModalCreateClient from "../../components/modalCreateClient/modalCreateClient";
import "./home.css";

const Home = () => {
    const clientsDB = [
        {
            id: 1,
            accountNumber: "001",
            surname: "Иванов",
            name: "Иван",
            middleName: "Петрович",
            birthDate: "1990-05-15",
            inn: "123456789012",
            fullNameResponsiblePerson: "Петрова Анна Сергеевна",
            status: "В работе",
        },
        {
            id: 2,
            accountNumber: "002",
            surname: "Петров",
            name: "Петр",
            middleName: "Сергеевич",
            birthDate: "1985-10-20",
            inn: "987654321098",
            fullNameResponsiblePerson: "Сидоров Иван Васильевич",
            status: "Сделка закрыта",
        },
        {
            id: 3,
            accountNumber: "003",
            surname: "Сидорова",
            name: "Анна",
            middleName: "Ивановна",
            birthDate: "1995-12-01",
            inn: "555555555555",
            fullNameResponsiblePerson: "Кузнецова Ольга Петровна",
            status: "Отказ",
        },
    ];

    const [modalShow, setModalShow] = useState(false);

    const openModal = () => setModalShow(true);
    const closeModal = () => setModalShow(false);

    const [clients, setClients] = useState(clientsDB);

    const сhangeStatus = (event, id) => {
        console.log(id, event.target.value);
    };

    const createTabel = (clients) => {
        return clients.map((client) => {
            return (
                <tr key={client.id}>
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
                            onChange={(event) => сhangeStatus(event, client.id)}
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
    };

    return (
        <div className="container">
            {modalShow && (
                <ModalCreateClient
                    setClients={setClients}
                    closeModalCreateClient={closeModal}
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
                <tbody>{createTabel(clients)}</tbody>
            </table>
        </div>
    );
};

export default Home;
