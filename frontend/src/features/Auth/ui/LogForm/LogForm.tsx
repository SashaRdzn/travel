import { Link, useNavigate } from "react-router-dom";
import { useState, useCallback, memo, ChangeEvent, useMemo } from "react";
import { FaEnvelope, FaLock } from "react-icons/fa";
import styles from "../RegForm/styles.module.scss";
import { InputField } from "../RegForm/ui/InputField";
import { useLogin } from "../../model/Auth";
import { ApiErrorResponse, FormDataForLogin } from "../../types";
import { useAuthStore } from "../../../../core/Store/authStore";
import { AxiosError } from "axios";

const LogForm = () => {
  const { loginStore } = useAuthStore();
  const [formData, setFormData] = useState<FormDataForLogin>({
    email: "",
    password: "",
  });
  const { mutate: login } = useLogin();
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setErrors((prev) => {
      const newErrors = { ...prev };
      delete newErrors[name];
      return newErrors;
    });

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }, []);

  const handleSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      setLoading(true);

      try {
        login(formData, {
          onSuccess: (data) => {
            loginStore(data.user);
            navigate("/country");
          },
          onError: (error: AxiosError<ApiErrorResponse>) => {
            if (error.response?.data?.error) {
              setErrors({
                email: error.response.data.error,
                password: error.response.data.error,
              });
            } else {
              setErrors({ general: "Произошла ошибка при входе" });
            }
          },
        });
      } catch (unexpectedError) {
        setErrors({ general: "Непредвиденная ошибка" });
      } finally {
        setLoading(false);
      }
    },
    [formData, login, loginStore, navigate]
  );

  const loginLink = useMemo(
    () => (
      <Link to="/auth/register" className={styles.link}>
        Регистрация
      </Link>
    ),
    []
  );

  return (
    <div className={styles.container}>
      <div className={styles.formCard}>
        <div className={styles.header}>
          <h2>Вход</h2>
        </div>
        asd@asd.ru
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
            type="password"
            placeholder="Ваш пароль"
            icon={FaLock}
            error={errors.password}
            value={formData.password}
            onChange={handleInputChange}
          />
          <button
            aria-label="Вход"
            type="submit"
            disabled={loading}
            className={styles.submitButton}>
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
              <>
                <i>В</i>
                <i>х</i>
                <i>о</i>
                <i>д</i>
              </>
            )}
          </button>

          <p className={styles.footer}>
            <span>Нет аккаунта? </span>
            {loginLink}
          </p>
        </form>
      </div>
    </div>
  );
};

export default memo(LogForm);
