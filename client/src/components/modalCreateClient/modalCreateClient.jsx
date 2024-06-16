import { useState, useEffect } from "react";
import { useHttp } from "../../hooks/http.hook";
import { toast } from "react-toastify";
import "../../style/modal.css";

const ModalCreateClient = ({
    setClients,
    closeModalCreateClient,
    responsibleUser,
    getClients,
}) => {
    const https = import.meta.env.VITE_REACT_APP_HTTPS;
    const { request } = useHttp();
    const [newClient, setNewClient] = useState({
        accountNumber: "",
        surname: "",
        name: "",
        middleName: "",
        birthDate: "",
        inn: "",
        fullNameResponsiblePerson: "",
    });

    useEffect(() => {
        setNewClient({
            ...newClient,
            fullNameResponsiblePerson: responsibleUser.fullName,
        });
    }, []);

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
        addClient(newClient);
    };

    const addClient = async (client) => {
        try {
            const data = await request(
                `${https}/client/addClient`,
                "POST",
                client
            );
            if (data.message === "OK") {
                getClients(responsibleUser);
                toast.success("Пользователь добавлен успешно.", {
                    position: "bottom-right",
                    theme: "light",
                });
                setNewClient({
                    accountNumber: "",
                    surname: "",
                    name: "",
                    middleName: "",
                    birthDate: "",
                    inn: "",
                    fullNameResponsiblePerson: "",
                });
                closeModalCreateClient();
            }
        } catch (error) {
            toast.error("Произошла ошибка при выполнении запроса.", {
                position: "bottom-right",
                theme: "light",
            });
            console.log(error);
        }
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
