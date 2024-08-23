import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './LoginFormstyle.css';

function Loginform() {
  const navigate = useNavigate();
  const [passwordValidation, setPasswordValidation] = useState({
    minLength: false,
    containsNumber: false,
    containsUpper: false,
    containsLower: false,
    containsSpecialChar: false,
  });

  // Add validationMessages state and its setter
  const [validationMessages, setValidationMessages] = useState([]);

  const validatePassword = (password) => {
    const validations = {
      minLength: password.length >= 8,
      
      containsNumber: /\d/.test(password),
      containsLower: /[a-z]/.test(password),
      containsUpper: /[A-Z]/.test(password),
      containsSpecialChar: /[!@#$%^&*(),.?":{}|<>]/.test(password),
    };
    setPasswordValidation(validations); // Update the password validation state

    // Return an object indicating overall validation status
    return {
      ...validations,
      isValid: Object.values(validations).every(value => value === true),
    };
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const password = event.target.elements.password.value;
    const validationResult = validatePassword(password);

    console.log(validationResult); // Debug: Log the validation result

    if (!validationResult.isValid) {
      const messages = [];
      if (!validationResult.minLength) messages.push('Password must be at least 8 characters');
      if (!validationResult.containsNumber) messages.push('Password must contain at least one number');
      if (!validationResult.containsUpper) messages.push('Password must contain at least one uppercase letter');
      if (!validationResult.containsLower) messages.push('Password must contain at least one lowercase letter');
      if (!validationResult.containsSpecialChar) messages.push('Password must contain at least one special character');

      console.log(messages); // Debug: Log the messages to be set
      setValidationMessages(messages);
    } else {
      navigate('/Dashboard');
    }
};
  const handleRegisterClick =(event) =>{
      navigate('/Register');
  }
  return (
    <div className="loginglass">
      <form className="login" onSubmit={handleSubmit}>
        <div>
          <h2 className="logintitle">Login</h2>
          <p className="glad">Glad you're Back!</p>
          <div className='Formular'>
            <input type="text" id="username" placeholder='Username' name="username" required  />
            <input type="password" id="password" placeholder="Password" name="password" required />
            <button className="lgnbtn" type="submit">Login</button>
            <p className='frgtpass'>Forgot password ?</p>
            <div className='Validators'>
                {validationMessages.map((message, index) => (<p key={index} className="validationMessage">{message}</p>))}
                </div>
            <div>
              <button className="rgstrbtn" type="button" onClick={handleRegisterClick}>Register Here</button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Loginform;
