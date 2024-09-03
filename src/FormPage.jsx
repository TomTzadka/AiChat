import React, { useState } from "react";
import axios from "axios";
import Modal from "./Modal.jsx";

import "./FormPage.css";


const MetalSelectionForm = () => {
  const [formData, setFormData] = useState({
    metalType: "",
    corrosionEnvironment: "",
    maxHeatExposure: "",
    requiredLifespan: "",
    surfacePreparation: "",
    paintType: "",
    applicatorLevel: "",
    additionalText: "",
  });
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [response, setResponse] = useState(null); 
  


  const handleSelection = (field, value) => {
    setFormData((prevData) => {
      let updatedField;

      if (Array.isArray(prevData[field])) {
        const isSelected = prevData[field].includes(value);
        updatedField = isSelected
          ? prevData[field].filter((item) => item !== value)
          : [...prevData[field], value];
      } else {
        updatedField = value;
      }

      const updatedData = {
        ...prevData,
        [field]: updatedField,
      };

      // Log the updated formData in JSON format
      console.log(JSON.stringify(updatedData, null, 2));

      return updatedData;
    });
  };

  const handleSubmit = async () => {
    try {
      console.log('Final Form Data:', JSON.stringify(formData, null, 2));
      
      // let textToSend = Util.formToText(formData)
      
      const response = await axios.post('http://localhost:55559/get_prompt', formData, {
        headers: {
          'Content-Type': 'application/json',
          'Tamboor-Secret': 'theSecreteIsHere',
          
        },
      });
      setResponse(response.data);
      console.log('Response:', response.data);
  
      // Set formSubmitted to true to change the button class
      setFormSubmitted(true);
      setModalOpen(true);
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };
  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const isButtonSelected = (field, value) => {
    if (Array.isArray(formData[field])) {
      return formData[field].includes(value);
    }
    return formData[field] === value;
  };

  return (
    <div className="form-page-background">
      <div className="form-page-card">
        <div className="form-page-title">בחר סוג מתכת:</div>
        <div className="form-page-button-group">
          {[
            "פלדה",
            "פלדה בגלוון קר",
            "פלדה בגלוון חם",
            "אלומיניום",
            "נירוסטה",
            "נחושת",
          ].map((metal) => (
            <button
              key={metal}
              className={`form-page-button ${
                isButtonSelected("metalType", metal) ? "selected-btn" : ""
              }`}
              onClick={() => handleSelection("metalType", metal)}
            >
              {metal}
            </button>
          ))}
        </div>

        <div className="form-page-title">
          בחר סביבה קורוזיבית ( 12944-2018 ISO ):
        </div>
        <div className="form-page-button-group">
          {[
            "C1 קורוזיביות מתונה",
            "C2 אוירה כפרית",
            "C3 סביבה עירונית",
            "C4 סביבה תעשייתית קלה",
            "C5I סביבה תעשייתית כבדה",
            "C5M סביבה ימית",
          ].map((environment) => (
            <button
              key={environment}
              className={`form-page-button ${
                isButtonSelected("corrosionEnvironment", environment)
                  ? "selected-btn"
                  : ""
              }`}
              onClick={() =>
                handleSelection("corrosionEnvironment", environment)
              }
            >
              {environment}
            </button>
          ))}
        </div>

        <div className="form-page-title">בחר חשיפה לחום מרבי של:</div>
        <div className="form-page-button-group">
          {["80°C", "120°C", "180°C", "600°C"].map((heat) => (
            <button
              key={heat}
              className={`form-page-button ${
                isButtonSelected("maxHeatExposure", heat) ? "selected-btn" : ""
              }`}
              onClick={() => handleSelection("maxHeatExposure", heat)}
            >
              {heat}
            </button>
          ))}
        </div>

        <div className="form-page-title">בחר אורך חיים נדרש:</div>
        <div className="form-page-button-group">
          {[
            "נמוך עד 7 שנים",
            "בינוני עד 10 שנה",
            "ארוך עד 15 שנה",
            "ארוך מאד עד 25 שנה",
          ].map((lifespan) => (
            <button
              key={lifespan}
              className={`form-page-button ${
                isButtonSelected("requiredLifespan", lifespan)
                  ? "selected-btn"
                  : ""
              }`}
              onClick={() => handleSelection("requiredLifespan", lifespan)}
            >
              {lifespan}
            </button>
          ))}
        </div>

        <div className="form-page-title">
          בחר הכנת שטח אפשרית לפי התקן השבדי:
        </div>
        <div className="form-page-button-group">
          {["3 SA", "2.5 SA", "1 SA", "3 ST", "2 ST", "1 ST", "רענון גוון"].map(
            (preparation) => (
              <button
                key={preparation}
                className={`form-page-button ${
                  isButtonSelected("surfacePreparation", preparation)
                    ? "selected-btn"
                    : ""
                }`}
                onClick={() =>
                  handleSelection("surfacePreparation", preparation)
                }
              >
                {preparation}
              </button>
            )
          )}
        </div>

        <div className="form-page-title">בחר סוג צבעים:</div>
        <div className="form-page-button-group">
          {[
            "חד רכיבי על בסיס מדלל – DYI",
            "חד רכיבי על בסיס מדלל תעשיה",
            'חד רכיבי "רטוב" על בסיס מים',
            "דו רכיבי על בסיס מדלל",
            "דו רכיבי על בסיס מים",
            "צבע אבקה",
          ].map((paint) => (
            <button
              key={paint}
              className={`form-page-button ${
                isButtonSelected("paintType", paint) ? "selected-btn" : ""
              }`}
              onClick={() => handleSelection("paintType", paint)}
            >
              {paint}
            </button>
          ))}
        </div>

        <div className="form-page-title">בחר רמה מקצועית של המיישם:</div>
        <div className="form-page-button-group">
          {["לקוח פרטי", "צוות אחזקה", "קבלן מקצועי", "מצבעה"].map((level) => (
            <button
              key={level}
              className={`form-page-button ${
                isButtonSelected("applicatorLevel", level) ? "selected-btn" : ""
              }`}
              onClick={() => handleSelection("applicatorLevel", level)}
            >
              {level}
            </button>
          ))}
        </div>

        <div className="form-page-title">הוספת טקסט חופשי:</div>
        <textarea
          className="form-page-input"
          value={formData.additionalText}
          onChange={(e) => handleSelection("additionalText", e.target.value)}
          placeholder="הכנס טקסט חופשי..."
        />

        <button
          className={`form-page-auth-button ${
            formSubmitted ? "submitted" : ""
          }`}
          onClick={handleSubmit}
        >
          {formSubmitted ? "נשלח" : "שלח"}
        </button>
        {/* <Modal isOpen={modalOpen} onClose={handleCloseModal} formData={formData} /> */}
        <Modal isOpen={modalOpen} onClose={handleCloseModal} response={response} />
      </div>
    </div>
  );
};

export default MetalSelectionForm;
