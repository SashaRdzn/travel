import { Link } from "react-router-dom";
import { useState, useCallback, memo, useMemo } from "react";
import { FaEnvelope, FaLock, FaUser } from "react-icons/fa";
import styles from "./styles.module.scss";
import { InputField } from "./ui/InputField";
import { useRegister } from "../../model/Auth";
import { FormDataForRegister } from "../../types";
import toast from "react-hot-toast";

const RegForm = () => {
  const [formData, setFormData] = useState<FormDataForRegister>({
    email: "",
    last_name: "",
    first_name: "",
    password: "",
  });

  const { mutate: register } = useRegister();
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  const validateEmail = useCallback((email: string): boolean => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }, []);

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value, type, checked } = e.target;
      const newValue = type === "checkbox" ? checked : value;

      setFormData((prev) => ({
        ...prev,
        [name]: newValue,
      }));

      if (name === "email") {
        setErrors((prev) => ({
          ...prev,
          email: validateEmail(value)
            ? ""
            : "Почта? Это что-то вроде @gmail, а не @ya.ru, давай заново!",
        }));
      }
    },
    [validateEmail]
  );

  const handleSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      const hasErrors = Object.values(errors).some(Boolean);
      if (!hasErrors) {
        setLoading(true);
        try {
          await register(formData);
        } catch (error) {
          console.error("Ошибка отправки:", error);
          toast.error("This didn't work.");
        } finally {
          setLoading(false);
        }
      }
    },
    [errors, formData, register]
  );

  const loginLink = useMemo(
    () => (
      <Link to="/auth/login" className={styles.link}>
        Войти
      </Link>
    ),
    []
  );

  return (
    <div className={styles.container}>
      <div className={styles.formCard}>
        <div className={styles.header}>
          <h2>Регистрация</h2>
        </div>
        <form className={styles.form} onSubmit={handleSubmit}>
          <InputField
            id="email"
            name="email"
            type="email"
            placeholder="Email"
            icon={FaEnvelope}
            error={errors.email}
            value={formData.email}
            onChange={handleInputChange}
          />
          <InputField
            id="first_name"
            name="first_name"
            type="text"
            placeholder="Имя"
            icon={FaUser}
            error={errors.first_name}
            value={formData.first_name}
            onChange={handleInputChange}
          />
          <InputField
            id="last_name"
            name="last_name"
            type="text"
            placeholder="Фамилия"
            icon={FaUser}
            error={errors.last_name}
            value={formData.last_name}
            onChange={handleInputChange}
          />
          <InputField
            id="password"
            name="password"
            type="password"
            placeholder="Пароль"
            icon={FaLock}
            error={errors.password}
            value={formData.password}
            onChange={handleInputChange}
          />
          <button
            type="submit"
            aria-label="Зарегистрироваться"
            disabled={loading}>
            {[..."Зарегистрироваться"].map((letter, i) => (
              <i key={i}>{letter}</i>
            ))}
            {loading && (
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
                </svg>
                Грузим...
              </span>
            )}
          </button>
          <p className={styles.footer}>
            <span>Есть аккаунт? </span>
            {loginLink}
          </p>
        </form>
      </div>
    </div>
  );
};

export default memo(RegForm);
