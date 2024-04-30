import React, { useState } from 'react';

const TruncatedText = ({ text, maxLength = 40 }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  if (text.length <= maxLength) {
    return <span>{text}</span>;
  }

  return (
    <p>
      <span>
        {isExpanded ? text : `${text.slice(0, maxLength)}...`}
      </span>
      
    </p>
  );
};

export default TruncatedText;
