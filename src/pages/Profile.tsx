import { getUser, getUserToken} from '../services/Auth';
import { useEffect, useState } from 'react';
import LoadingSpinner from '../components/LoadingSpinner';
import { useNavigate } from 'react-router-dom';

function Profile() {

  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState<User>();

  type User = {
    id: number;
    "first-name": string;
    "last-name": string;
    "user-name": string;
    email: string;
    age: string;
    sexe: string;
  }

  let navigate = useNavigate();
  useEffect(() => {
    if(!getUserToken()) {
      return navigate('/login');
    }
    setIsLoading(true);
    getUser()
      .then(function (response) {
        setIsLoading(false);
        setUser(response.data)
      }).catch(function (error) {
        setIsLoading(false);
      });
  }, []);

  const renderUser = (
    <>
      <p>Nom : { user ? user['last-name'] : '-' }</p>
      <p>Prénom : { user ? user['first-name'] : '-' }</p>
      <p>Pseudo : { user ? user['user-name'] : '-' }</p>
      <p>Email : { user ? user.email : '-' }</p>
      <p>Age : { user ? user.age : '-' }</p>
      <p>Sexe : { user ? user.sexe : '-' }</p>
    </>
  )

  return (
    <>
      <p>Mon profile</p>
      {isLoading ? <LoadingSpinner /> : renderUser}
    </>
  );
}

export default Profile;
