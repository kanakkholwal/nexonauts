import { useState, useEffect } from 'react';

function usePopup(popupRef) {
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    const handleDocumentClick = (e) => {
      const clickedComponent = e.target;
      if (!popupRef?.current?.contains(clickedComponent)) {
        setShowPopup(false);
      }
    };

    document.addEventListener('click', handleDocumentClick);

    return () => {
      document.removeEventListener('click', handleDocumentClick);
    };
  }, [popupRef]);

  const togglePopup = () => {
    setShowPopup((prev) => !prev);
  };

  return [showPopup, togglePopup];
}

export default usePopup;
