import { useState } from "react";
import { useHttp } from "../../hooks/http.hook";
import { toast } from "react-toastify";
import "../../style/modal.css";

const ModalRegistration = ({ closeModalRegistration }) => {
    const https = import.meta.env.VITE_REACT_APP_HTTPS;
    const { request } = useHttp();
    const [newUser, setNewUser] = useState({
        fullName: "",
        email: "",
        password: "",
    });

    const closeModal = (value) => {
        if (value.target.className === "modal") {
            closeModalRegistration();
        }
    };

    const changeValue = (event) => {
        const { name, value } = event.target;
        setNewUser({
            ...newUser,
            [name]: value,
        });
    };

    const submitForm = (event) => {
        event.preventDefault();
        onRegister(newUser);
    };

    const onRegister = async (user) => {
        try {
            const data = await request(`${https}/auth/register`, "POST", user);
            if (data.message === "OK") {
                setNewUser({
                    fullName: "",
                    email: "",
                    password: "",
                });
                closeModalRegistration();
                toast.success("Регистрация прошла успешно.", {
                    position: "bottom-right",
                    theme: "light",
                });
            } else {
                toast.error(data.message, {
                    position: "bottom-right",
                    theme: "light",
                });
            }
        } catch (error) {
            toast.error("Произошла ошибка при выполнении запроса", {
                position: "bottom-right",
                theme: "light",
            });
            console.log(error);
        }
    };

    return (
        <div className="modal" onClick={closeModal}>
            <form onSubmit={submitForm} className="form-сreate-client">
                <label htmlFor="fullName">
                    ФИО:
                    <input
                        type="text"
                        id="fullName"
                        name="fullName"
                        value={newUser.fullName}
                        onChange={changeValue}
                        required
                    />
                </label>
                <label htmlFor="email">
                    Логин:
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={newUser.email}
                        onChange={changeValue}
                        required
                    />
                </label>
                <label htmlFor="password">
                    Пароль:
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={newUser.password}
                        onChange={changeValue}
                        required
                    />
                </label>
                <button className="button-add-client" type="submit">
                    Зарегистрироваться
                </button>
            </form>
        </div>
    );
};

export default ModalRegistration;
