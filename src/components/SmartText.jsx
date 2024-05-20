import { useState } from "react";

const SmartText = ({ text, length = 20 }) => {
    const [showLess, setShowLess] = useState(true);
  
    if (text.length < length) {
      return <p>{text}</p>;
    }
  
    return (
      <div>
        <p>
            {showLess ? `${text.slice(0, length)} ...` : text}

            <a className="cursor-pointer text-gray-600 hover:text-gray-800"
                onClick={() => setShowLess(!showLess)}
            >
                &nbsp;{showLess ? "(view more)" : "(view less)"}
            </a>
        </p>
          
      </div>
    );
  };

export default SmartText;