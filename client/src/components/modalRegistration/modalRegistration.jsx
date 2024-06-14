import { useState } from "react";
import "../../style/modal.css";

const ModalRegistration = ({ closeModalRegistration }) => {
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
        console.log(newUser);
        setNewUser({
            fullName: "",
            email: "",
            password: "",
        });
        closeModalRegistration();
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
