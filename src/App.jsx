import { useState } from 'react'
import copyIcon from './assets/copy.png'

function App() {
  const [password, setPassword] = useState("");
  const [strength, setStrength] = useState("");
  const [strengthClass, setStrengthClass] = useState("");
  const [copied, setCopied] = useState(false);

  const CheckPassword = () => {
    let score = 0;

    if (password.length >= 8) score++;

    if (/[A-Z]/.test(password)) score++;

    if (/[a-z]/.test(password)) score++;

    if (/[0-9]/.test(password)) score++;

    if (/[^A-Za-z0-9]/.test(password)) score++;

    if (score <= 2) {
      setStrength("Weak Password");
      setStrengthClass("weak");
    } else if (score <= 4) {
      setStrength("Medium Password");
      setStrengthClass("medium");
    } else {
      setStrength("Strong Password");
      setStrengthClass("strong");
    }
    
  };
  let Generate = () => {
    const chars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*";

    let newPassword = "";

    for (let i = 0; i < 12; i++) {
      const randomIndex = Math.floor(Math.random() * chars.length);
      newPassword += chars[randomIndex];
    }

    setPassword(newPassword);
  }

  const CopyPassword = async () => {
    if (password.length > 0){
      await navigator.clipboard.writeText(password);
      setCopied(true);
    }

    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  return (
    <>
      <div id="box">
        <div id="password-inp">
          <input id='inp' 
            type="text" 
            placeholder='Enter Password' 
            value={password} 
            onChange={(e) => setPassword(e.target.value)}
          />
          <button onClick={CopyPassword}>
            <img src={copyIcon} alt="copy" />
          </button>
        </div>
        
        <button onClick={CheckPassword}>
          Check Password Strength
        </button>
        <button onClick={Generate}>
          Generate Password
        </button>
        <p className={`strength ${strengthClass}`}>
          {strength}
        </p>
      </div>
      {copied && <p className="copied-message" >Password copied!</p>}
    </>
  )
}

export default App;
