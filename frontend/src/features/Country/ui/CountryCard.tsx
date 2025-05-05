import { useState } from "react";
import { Country } from "../types";
import { useCountryStore } from "../../../core/Store/countryStore";
import styles from "./CountryCard.module.scss";

interface CountryCardProps {
  data: Country;
}

const CountryCard = ({ data }: CountryCardProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(data);
  const { updateCountry } = useCountryStore();

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateCountry(data.id, formData);
    setIsEditing(false);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const mainImage =
    data.cards[0]?.images.find((img) => img.is_main) ||
    data.cards[0]?.images[0];

  return (
    <div className={styles.card}>
      {isEditing ? (
        <form onSubmit={handleSave} className={styles.editForm}>
          <div className={styles.formGroup}>
            <label>Название страны:</label>
            <input
              name="title"
              value={formData.title}
              onChange={handleChange}
            />
          </div>

          <div className={styles.formGroup}>
            <label>Описание:</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={3}
            />
          </div>

          <div className={styles.buttonGroup}>
            <button type="submit" className={styles.saveButton}>
              Сохранить
            </button>
            <button
              type="button"
              onClick={() => setIsEditing(false)}
              className={styles.cancelButton}>
              Отмена
            </button>
          </div>
        </form>
      ) : (
        <>
          <a href="#"><h3 className={styles.title}>{data.title}</h3></a>
          {mainImage && (
            <div className={styles.imageWrapper}>
              <img
                src={mainImage.image}
                alt={data.title}
                className={styles.image}
              />
              <span className={styles.description}>{data.description}</span>
            </div>
          )}
          {/* <button
            onClick={() => setIsEditing(true)}
            className={styles.editButton}>  
            Редактировать
          </button> */}
        </>
      )}
    </div>
  );
};

export default CountryCard;
