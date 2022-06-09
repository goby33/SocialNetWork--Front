import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import { useState, useEffect } from 'react';
import { useToken, register, login } from '../services/Auth';
import { useNavigate } from "react-router-dom";
import LoadingSpinner from '../components/LoadingSpinner';
import { getUserToken} from '../services/Auth';

function Register() {

  let navigate = useNavigate();
  useEffect(() => {
    if(getUserToken()) {
      return navigate('/');
    }
  }, []);

  const [email, setEmail] = useState<string>('');
  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [pseudo, setPseudo] = useState<string>('');
  const [age, setAge] = useState<string>('');
  const [sexe, setSexe] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);

  const { setToken } = useToken();

  const [validated, setValidated] = useState(false);
  const handleRegisterForm = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.stopPropagation();
    } else {
      setIsLoading(true);
      register(firstName, lastName, pseudo, email, password, age, sexe)
      .then(function (response) {
        login(pseudo, password)
          .then(function (response) {
            setIsLoading(false);
            setToken(response.data);
            navigate('/');
          })
          .catch(function (error) {
            setIsLoading(false);
            navigate('/login');
          });
      })
      .catch(function (error) {
        setIsLoading(false);
        setError(error);
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
      <Form noValidate validated={validated} onSubmit={handleRegisterForm}>
        <Form.Group className="mb-3">
          <Form.Label>Prénom</Form.Label>
          <Form.Control required type="text" placeholder="Prénom" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
          <Form.Control.Feedback type="invalid">
            Merci de renseigner un prénom.
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Nom</Form.Label>
          <Form.Control required type="text" placeholder="Nom" value={lastName} onChange={(e) => setLastName(e.target.value)} />
          <Form.Control.Feedback type="invalid">
            Merci de renseigner un nom.
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Pseudo</Form.Label>
          <Form.Control required type="text" placeholder="Pseudo" value={pseudo} onChange={(e) => setPseudo(e.target.value)} />
          <Form.Control.Feedback type="invalid">
            Merci de renseigner un pseudo.
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Age</Form.Label>
          <Form.Control required type="number" placeholder="Age" value={age} onChange={(e) => setAge(e.target.value)} />
          <Form.Control.Feedback type="invalid">
            Merci de renseigner un age.
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Sexe</Form.Label>
          <Form.Control required type="text" placeholder="Sexe" value={sexe} onChange={(e) => setSexe(e.target.value)} />
          <Form.Control.Feedback type="invalid">
            Merci de renseigner un sexe.
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Adresse email</Form.Label>
          <Form.Control required type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
          <Form.Control.Feedback type="invalid">
            Merci de renseigner une adresse email.
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Mot de passe</Form.Label>
          <Form.Control required type="password" placeholder="Mot de passe" value={password} onChange={(e) => setPassword(e.target.value)} />
          <Form.Control.Feedback type="invalid">
            Merci de renseigner un mot de passe.
          </Form.Control.Feedback>
        </Form.Group>
        <Button variant="primary" type="submit">S'inscrire</Button>
      </Form>
    </>
  );
}

export default Register;
