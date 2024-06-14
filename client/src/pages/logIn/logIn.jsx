import { useState } from "react";
import ModalRegistration from "../../components/modalRegistration/modalRegistration";
import "./logIn.css";

const LogIn = () => {
    const [user, setUser] = useState({
        email: "",
        password: "",
    });
    const [modalShow, setModalShow] = useState(false);

    const openModal = () => setModalShow(true);
    const closeModal = () => setModalShow(false);

    const changeValue = (event) => {
        const { name, value } = event.target;
        setUser({
            ...user,
            [name]: value,
        });
    };

    const submitForm = (event) => {
        event.preventDefault();
        setUser(user);
        console.log(user);
    };

    return (
        <div className="container-log-in">
            {modalShow && (
                <ModalRegistration closeModalRegistration={closeModal} />
            )}
            <form onSubmit={submitForm} className="log-in">
                <label htmlFor="email">
                    Логин:
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={user.email}
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
                        value={user.password}
                        onChange={changeValue}
                        required
                    />
                </label>
                <div className="buttonsd">
                    <button
                        className="button-log-in"
                        onClick={openModal}
                        type="button"
                    >
                        Зарегистрироваться
                    </button>
                    <button className="button-log-in" type="submit">
                        Войти на сайт
                    </button>
                </div>
            </form>
        </div>
    );
};

export default LogIn;
