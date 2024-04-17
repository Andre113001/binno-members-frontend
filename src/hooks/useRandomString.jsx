import { useState } from 'react';

const useRandomString = () => {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  const generateRandomString = () => {
    let randomString = '';
    for (let i = 0; i < 6; i++) {
      randomString += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return randomString;
  };

  const [randomString, setRandomString] = useState(generateRandomString());

  const regenerateRandomString = () => {
    setRandomString(generateRandomString());
  };

  return [randomString, regenerateRandomString];
};

export default useRandomString;