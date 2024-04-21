import { useEffect } from 'react';

const useEnterKeyHandler = (onSubmit) => {
  useEffect(() => {
    const handleKeyPress = (event) => {
      if (event.key === 'Enter') {
        onSubmit();
      }
    };

    document.addEventListener('keydown', handleKeyPress);

    // Clean up the event listener on component unmount
    return () => {
      document.removeEventListener('keydown', handleKeyPress);
    };
  }, [onSubmit]);
};

export default useEnterKeyHandler;
