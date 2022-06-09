import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import { useState, useEffect } from 'react';
import { useToken, login, getUserToken } from '../services/Auth';
import { useNavigate } from "react-router-dom";
import LoadingSpinner from '../components/LoadingSpinner';

function Login() {



  let navigate = useNavigate();
  useEffect(() => {
    if(getUserToken()) {
      return navigate('/');
    }
  }, []);

  const [pseudo, setPseudo] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);

  const { setToken } = useToken();

  const [validated, setValidated] = useState(false);
  const handleLoginForm = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.stopPropagation();
    } else {
      setError('');
      setIsLoading(true);
      login(pseudo, password)
        .then(function (response) {
          setIsLoading(false);
          setToken(response.data);
          navigate('/');
        })
        .catch(function (error) {
          setIsLoading(false);
          setError('Identifiant invalide');
        });
    }
    setValidated(true);
  }

  return (
    <>
      {isLoading &&
        <LoadingSpinner/>
      }
      {error &&
        <Alert variant="danger">{ error }</Alert>
      }
      <Form noValidate validated={validated} onSubmit={handleLoginForm}>
        <Form.Group className="mb-3">
          <Form.Label>Pseudo</Form.Label>
          <Form.Control required type="text" placeholder="Pseudo" value={pseudo} onChange={(e) => setPseudo(e.target.value)} />
          <Form.Control.Feedback type="invalid">
            Merci de renseigner un pseudo.
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Mot de passe</Form.Label>
          <Form.Control required type="password" placeholder="Mot de passe" value={password} onChange={(e) => setPassword(e.target.value)} />
          <Form.Control.Feedback type="invalid">
            Merci de renseigner un mot de passe.
          </Form.Control.Feedback>
        </Form.Group>
        <Button variant="primary" type="submit">Se connecter</Button>
      </Form>
    </>
  );
}

export default Login;
