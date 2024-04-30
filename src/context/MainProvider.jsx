import { createContext, useEffect, useState, useContext } from "react";

import { toast } from "react-toastify";
export const MainContext = createContext();
export default function MainProvider({ children }) {
  const [loading, setLoading] = useState(false);
  const [estateData, setEstateData] = useState([]);
  const [property, setProperty] = useState(null);
  const getEstateData = () => {
    localStorage.getItem("estateData")
      ? setEstateData(JSON.parse(localStorage.getItem("estateData")))
      : setEstateData([]);
  };

  useEffect(() => {
    getEstateData();
  }, []);

  useEffect(() => {
    try {
      setLoading(true);
      fetch("/data.json")
        .then((response) => response.json())
        .then((data) => {
          localStorage.setItem("estateData", JSON.stringify(data));
          setEstateData(data);
        });
      setLoading(false);
    } catch (error) {
      setLoading(false);
      toast.error("Could not get data");
    }
  }, []);

  const getProperty = (id) => {
    const property = estateData.find((estate) => estate.id === +id);
    setProperty(property);
  }
 

  const mainValue = {
    estateData,
    loading,
    property,
    getProperty
  };
  return (
    <MainContext.Provider value={mainValue}>
      { children}
    </MainContext.Provider>
  );
}

export const useMain = () => {
  return useContext(MainContext);
};
