import { useNavigate } from 'react-router-dom';

const navigate = () => {
  const nav = useNavigate();

  const goTo = (path, state) => {
    nav(path, state);
  };

  
  const goBack = () => {
    nav(-1);
  };
  
  const goHome = () => {
    nav('/');
  };

  const navRoute = (state) => {
    nav('/', state);
  };

  return {
    goTo,
    goBack,
    goHome,
    navRoute
  };
};

export default navigate;