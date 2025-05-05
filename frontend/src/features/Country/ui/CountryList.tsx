import { useCountries } from "../model/Country";
import CountryCard from "./CountryCard";
import { useCountryStore } from "../../../core/Store/countryStore";
import { useEffect } from "react";
import styles from './Country.module.scss'
const CountryList = () => {
  const { isPending, error, data } = useCountries();
  const { countries, setCountries } = useCountryStore();

  useEffect(() => {
    if (data) {
      setCountries(data);
    }
  }, [data, setCountries]);

  return (
    <>
      <h2>Страны</h2>
      {isPending && <div>Загрузка...</div>}
      {error && <div>Ошибка: {error.message}</div>}
      <section className={styles.wrapper}>
      {!isPending &&
        !error &&
        countries.map((country) => (
            <CountryCard data={country} key={country.id}/>
        ))}
      </section>
    </>
  );
};

export default CountryList;
