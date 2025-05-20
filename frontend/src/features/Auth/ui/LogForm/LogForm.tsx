import { Link } from "react-router-dom";
import { useState, useCallback, memo, useMemo, ChangeEvent } from "react";
import { FaEnvelope, FaLock } from "react-icons/fa";
import styles from "../RegForm/styles.module.scss";
import { InputField } from "../RegForm/ui/InputField";
import { useLogin } from "../../model/Auth";
import { FormData } from "../../types";

const LogForm = () => {
  const [formData, setFormData] = useState<FormData>({
    email: "QWE@QWE.ru",
    password: "ZXCzxc123!",
  });
  const { mutate: login } = useLogin();
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleInputChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }, []);

  const handleTogglePassword = useCallback(() => {
    setShowPassword((prev) => !prev);
  }, []);

  const handleSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      setLoading(true);

      try {
        await login(formData);
      } catch (error: any) {
        if (error.response?.data?.errors) {
          setErrors(error.response.data.errors);
        } else {
          console.error("Login error:", error);
        }
      } finally {
        setLoading(false);
      }
    },
    [formData, login]
  );

  const isSubmitDisabled = useMemo(() => {
    return loading || !formData.email || !formData.password;
  }, [loading, formData.email, formData.password]);

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div className={styles.header}>
          <h2>Вход</h2>
        </div>

        <form className={styles.form} onSubmit={handleSubmit}>
          <InputField
            id="email"
            name="email"
            type="email"
            placeholder="Ваш email"
            icon={FaEnvelope}
            error={errors.email}
            value={formData.email}
            onChange={handleInputChange}
          />

          <InputField
            id="password"
            name="password"
            type={showPassword ? "text" : "password"}
            placeholder="Ваш пароль"
            icon={FaLock}
            error={errors.password}
            value={formData.password}
            onChange={handleInputChange}
            showPassword={showPassword}
            onTogglePassword={handleTogglePassword}
          />

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
                </svg>
                Входим...
              </span>
            ) : (
              "Войти"
            )}
          </button>

          <p className={styles.footer}>
            Нет аккаунта?
            <Link to="/auth/register" className={styles.link}>
              Зарегистрироваться
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default memo(LogForm);
