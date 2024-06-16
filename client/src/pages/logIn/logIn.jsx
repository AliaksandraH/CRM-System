import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useHttp } from "../../hooks/http.hook";
import { toast } from "react-toastify";
import ModalRegistration from "../../components/modalRegistration/modalRegistration";
import "./logIn.css";

const LogIn = () => {
    const https = import.meta.env.VITE_REACT_APP_HTTPS;
    const { request } = useHttp();
    const navigate = useNavigate();
    const [user, setUser] = useState({
        email: "",
        password: "",
    });
    const [modalShow, setModalShow] = useState(false);

    // useEffect(() => {
    //     localStorage.removeItem("responsibleUser");
    // }, []);

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
        onLogIn(user);
    };

    const onLogIn = async (user) => {
        try {
            const data = await request(`${https}/auth/login`, "POST", user);
            if (data.message === "OK") {
                localStorage.setItem(
                    "responsibleUser",
                    JSON.stringify(data.user)
                );
                navigate(`/home/${data.user._id}`);
                toast.success("Успешный вход.", {
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
            toast.error("Произошла ошибка при выполнении запроса.", {
                position: "bottom-right",
                theme: "light",
            });
            console.log(error);
        }
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
