import { memo } from "react";
import styles from "../styles.module.scss";
import { FaEye, FaEyeSlash } from "react-icons/fa";

interface InputFieldProps {
  id: string;
  name: string;
  type: string;
  placeholder: string;
  icon: React.ComponentType<{ className?: string }>;
  error?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  showPassword?: boolean;
  onTogglePassword?: () => void;
  withStrength?: boolean;
}

const getPasswordStrength = (password: string): number => {
  let strength = 0;
  if (password.length >= 8) strength++;
  if (/[A-Z]/.test(password)) strength++;
  if (/[0-9]/.test(password)) strength++;
  if (/[!@#$%^&*]/.test(password)) strength++;
  return strength;
};

export const InputField = memo(
  ({
    id,
    name,
    type,
    placeholder,
    icon: Icon,
    error,
    value,
    onChange,
    showPassword,
    onTogglePassword,
    withStrength,
  }: InputFieldProps) => {
    return (
      <div className={styles.inputGroup}>
        <div className={styles.inputContainer}>
          <Icon className={styles.icon} />
          <input
            id={id}
            name={name}
            type={type === "password" && showPassword ? "text" : type}
            required
            className={`${styles.input} ${error ? styles.inputError : ""}`}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
          />
          {type === "password" && (
            <button
              type="button"
              onClick={onTogglePassword}
              className={styles.passwordToggle}
              aria-label={showPassword ? "Hide password" : "Show password"}>
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          )}
        </div>
        {error && <p className={styles.errorText}>{error}</p>}
        {withStrength && value && (
          <div className={styles.passwordStrength}>
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className={`${styles.strengthBar} ${
                  i < getPasswordStrength(value)
                    ? styles.strengthBarActive
                    : styles.strengthBarInactive
                }`}
              />
            ))}
          </div>
        )}
      </div>
    );
  },
  (prevProps, nextProps) => {
    return (
      prevProps.value === nextProps.value &&
      prevProps.error === nextProps.error &&
      prevProps.showPassword === nextProps.showPassword
    );
  }
);

InputField.displayName = "InputField";
