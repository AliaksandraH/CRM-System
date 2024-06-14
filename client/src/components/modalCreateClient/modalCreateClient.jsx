import { useState } from "react";
import "../../style/modal.css";

const ModalCreateClient = ({ setClients, closeModalCreateClient }) => {
    const [newClient, setNewClient] = useState({
        id: "",
        accountNumber: "",
        surname: "",
        name: "",
        middleName: "",
        birthDate: "",
        inn: "",
        fullNameResponsiblePerson: "",
        status: "В работе",
    });

    const closeModal = (value) => {
        if (value.target.className === "modal") {
            closeModalCreateClient();
        }
    };

    const changeValue = (event) => {
        const { name, value } = event.target;
        setNewClient({
            ...newClient,
            [name]: value,
        });
    };

    const submitForm = (event) => {
        event.preventDefault();
        setClients((state) => [...state, newClient]);
        console.log(newClient);
        setNewClient({
            id: "",
            accountNumber: "",
            surname: "",
            name: "",
            middleName: "",
            birthDate: "",
            inn: "",
            fullNameResponsiblePerson: "",
            status: "В работе",
        });
        closeModalCreateClient();
    };

    return (
        <div className="modal" onClick={closeModal}>
            <form onSubmit={submitForm} className="form-сreate-client">
                <label htmlFor="accountNumber">
                    Номер счета:
                    <input
                        type="number"
                        id="accountNumber"
                        name="accountNumber"
                        value={newClient.accountNumber}
                        onChange={changeValue}
                        required
                    />
                </label>
                <label htmlFor="surname">
                    Фамилия:
                    <input
                        type="text"
                        id="surname"
                        name="surname"
                        value={newClient.surname}
                        onChange={changeValue}
                        required
                    />
                </label>
                <label htmlFor="name">
                    Имя:
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={newClient.name}
                        onChange={changeValue}
                        required
                    />
                </label>
                <label htmlFor="middleName">
                    Отчество:
                    <input
                        type="text"
                        id="middleName"
                        name="middleName"
                        value={newClient.middleName}
                        onChange={changeValue}
                        required
                    />
                </label>
                <label htmlFor="birthDate">
                    Дата рождения:
                    <input
                        type="date"
                        id="birthDate"
                        name="birthDate"
                        value={newClient.birthDate}
                        onChange={changeValue}
                        required
                    />
                </label>
                <label htmlFor="inn">
                    ИНН:
                    <input
                        type="number"
                        id="inn"
                        name="inn"
                        value={newClient.inn}
                        onChange={changeValue}
                        required
                    />
                </label>
                <button className="button-add-client" type="submit">
                    Создать клиента
                </button>
            </form>
        </div>
    );
};

export default ModalCreateClient;
