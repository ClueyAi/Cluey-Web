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

  const goAuth = () => {
    nav('/auth');
  };

  return {
    goTo,
    goBack,
    goHome,
    goAuth
  };
};

export default navigate;