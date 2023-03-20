import { useEffect } from 'react';

const NoInternet = () => {
  useEffect(() => {
    document.title = 'Forte Spektakel';
  });

  return <div></div>;
};

export default NoInternet;
