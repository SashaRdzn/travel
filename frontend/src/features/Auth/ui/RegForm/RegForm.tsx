// src/features/Auth/ui/RegForm/RegForm.tsx
import { useState } from "react";
import { AuthService } from "../../model/Auth";
import styles from "./styles.module.scss";


const RegForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const user = await AuthService.register({ name, email, password });
      console.log("Registered:", user);
      setSuccess(true);
    } catch (err) {
      setError("Registration failed");
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className={styles.successMessage}>
        <h2>Registration Successful!</h2>
        <p>Please check your email to verify your account.</p>
      </div>
    );
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <h2 className={styles.title}>Register</h2>

      {error && <div className={styles.error}>{error}</div>}

      <div className={styles.field}>
        <label htmlFor="name">Name</label>
        <input
          id="name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>

      <div className={styles.field}>
        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>

      <div className={styles.field}>
        <label htmlFor="password">Password</label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          minLength={6}
        />
      </div>

      <button type="submit" className={styles.submitButton} disabled={loading}>
        {loading ? "Loading..." : "Sign Up"}
      </button>
    </form>
  );
};

export default RegForm;
