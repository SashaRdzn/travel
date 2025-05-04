import { useState } from "react";
import Country from "../model/County";

const CountryList = () => {
    const [data, setData] = useState([])
    Country.getCountry().finally(()=>{
        
    })


  return (
    <>
      <h2>Страны</h2>
      <section>{}</section>
    </>
  );
};

export default CountryList;
