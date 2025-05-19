import { useState, useCallback, memo, useMemo } from "react";
import { FaUser, FaEnvelope, FaLock } from "react-icons/fa";
import styles from "./styles.module.scss";
import { InputField } from "./ui/InputField";
import { Link } from "react-router-dom";
import { useRegister } from "../../model/Auth";
import { useAuth } from "../../../../core/Store/authStore";

interface FormData {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const RegForm = () => {
  const [formData, setFormData]:any = useState<FormData>({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
 const { mutate: register } = useRegister();
 const user = useAuth((state) => state.user);
 console.log(user);
 
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const validateUsername = useCallback((username: string): boolean => {
    return username.length >= 3 && /^[a-zA-Z0-9]+$/.test(username);
  }, []);

  const validateEmail = useCallback((email: string): boolean => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }, []);

  const validatePassword = useCallback((password: string): boolean => {
    return (
      password.length >= 8 &&
      /[A-Z]/.test(password) &&
      /[0-9]/.test(password) &&
      /[!@#$%^&*]/.test(password)
    );
  }, []);

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value, type, checked } = e.target;
      const newValue = type === "checkbox" ? checked : value;

      setFormData((prev:any) => ({
        ...prev,
        [name]: newValue,
      }));
      if (name === "username") {
        setErrors((prev) => ({
          ...prev,
          username: validateUsername(value as string)
            ? ""
            : "Имя пользователя — не твой старый аська-ник! Минимум 3 буквы/цифры.",
        }));
      } else if (name === "email") {
        setErrors((prev) => ({
          ...prev,
          email: validateEmail(value as string)
            ? ""
            : "Почта? Это что-то вроде @gmail, а не @ya.ru, давай заново!",
        }));
      } else if (name === "password") {
        setErrors((prev) => ({
          ...prev,
          password: validatePassword(value as string)
            ? ""
            : "Пароль слабый, как твой вайфай! 8+ символов, буквы, цифры, спецсимволы.",
        }));
      } else if (name === "confirmPassword") {
        setErrors((prev) => ({
          ...prev,
          confirmPassword:
            value === formData.password
              ? ""
              : "Пароли не совпадают, ты шутишь?",
        }));
      }
    },
    [validateUsername, validateEmail, validatePassword, formData.password]
  );

  const handleTogglePassword = useCallback(() => {
    setShowPassword((prev) => !prev);
  }, []);

  const handleSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      const hasErrors = Object.values(errors).some((err) => err);
      if (!hasErrors) {
        setLoading(true);
        try {
          register(formData)
          
        } catch (error) {
          console.error("Ошибка отправки:", error);
        } finally {
          setLoading(false);
        }
      } else {
        setErrors((prev) => ({
          ...prev
        }));
      }
    },
    [errors, formData]
  );

  const isSubmitDisabled = useMemo(() => {
    return (
      loading ||
      Object.values(errors).some((err) => err)
    );
  }, [loading, errors]);

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div className={styles.header}>
          <h2>Регистрация Чувааак😏</h2>
        </div>

        <form className={styles.form} onSubmit={handleSubmit}>
          <InputField
            id="username"
            name="username"
            type="text"
            placeholder="Придумай крутой ник"
            icon={FaUser}
            error={errors.username}
            value={formData.username}
            onChange={handleInputChange}
          />

          <InputField
            id="email"
            name="email"
            type="email"
            placeholder="Твоя нормальная почта"
            icon={FaEnvelope}
            error={errors.email}
            value={formData.email}
            onChange={handleInputChange}
          />

          <InputField
            id="password"
            name="password"
            type="password"
            placeholder="Пароль покруче"
            icon={FaLock}
            error={errors.password}
            value={formData.password}
            onChange={handleInputChange}
            showPassword={showPassword}
            onTogglePassword={handleTogglePassword}
            withStrength
          />

          {/* <InputField
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            placeholder="Повтори пароль"
            icon={FaLock}
            error={errors.confirmPassword}
            value={formData.confirmPassword}
            onChange={handleInputChange}
            showPassword={showPassword}
            onTogglePassword={handleTogglePassword}
          /> */}
          <button
            type="submit"
            disabled={isSubmitDisabled}
            className={`${styles.submitButton} ${
              isSubmitDisabled
                ? styles.submitButtonDisabled
                : styles.submitButtonActive
            }`}>
            {loading ? (
              <span className={styles.loadingSpinner}>
                <svg className={styles.spinner} viewBox="0 0 24 24">
                  <circle
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                    fill="none"
                  />
                  <path
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
                Грузим...
              </span>
            ) : (
              "Зарегаться!"
            )}
          </button>

          <p className={styles.footer}>
            Уже есть аккаунт?{" "}
            <Link type="button" className={styles.link} to={"/auth/login"}>
              Вход
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default memo(RegForm);