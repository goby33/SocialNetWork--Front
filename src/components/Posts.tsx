import { useEffect, useState } from 'react';
import { getPosts, addPost } from '../services/Posts';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Alert from 'react-bootstrap/Alert';
import Form from 'react-bootstrap/Form';
import LoadingSpinner from '../components/LoadingSpinner';

function Posts() {

  type Post = {
      title: number;
      message: string;
      times: string;
  }

  const [isLoading, setIsLoading] = useState(false);
  const [posts, setPosts] = useState<Post[]>([]);

  const [isLoadingAdd, setIsLoadingAdd] = useState(false);
  const [success, setSuccess] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [title, setTitle] = useState<string>('');
  const [message, setMessage] = useState<string>('');

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    setIsLoading(true);
    getPosts().then(function (response) {
      setIsLoading(false);
      setPosts(response.data)
    }).catch(function (error) {
      setIsLoading(false);
    });
  }, []);

  const [validated, setValidated] = useState(false);
  const handleAddPostForm = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.stopPropagation();
    } else {
      setError('');
      setIsLoadingAdd(true);
      addPost(title, message)
        .then(function() {
          setIsLoadingAdd(false);
          setSuccess('Le post a été ajouté :)');
          setIsLoading(true);
          getPosts().then(function (response) {
            setIsLoading(false);
            setPosts(response.data)
          }).catch(function (error) {
            setIsLoading(false);
          });
        })
        .catch(function() {
          setIsLoadingAdd(false);
          setError('Post invalide');
        });
    }
    setValidated(true);
  }

  return (
    <>
      {isLoading ? <LoadingSpinner /> :
        <>
          <Button variant="primary" onClick={handleShow}>Ajouter un post</Button>
          {posts.length > 0 ?
            <>
              {posts.map((item, index) => (
                <Card className="mt-3" key={index}>
                  <Card.Header as="h5">{ item.title } - { item.times }</Card.Header>
                  <Card.Body>
                    <Card.Text>
                      { item.message }
                    </Card.Text>
                  </Card.Body>
                </Card>
              ))}
            </>
          : <p>Aucun posts</p>
          }
          <Modal show={show} onHide={handleClose}>
              <Modal.Header closeButton>
                <Modal.Title>Ajouter un post</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                {isLoadingAdd &&
                  <LoadingSpinner/>
                }
                {error &&
                  <Alert variant="danger">{ error }</Alert>
                }
                {success &&
                  <Alert variant="success">{ success }</Alert>
                }
                <Form noValidate validated={validated} onSubmit={handleAddPostForm}>
                  <Form.Group className="mb-3">
                    <Form.Label>Titre</Form.Label>
                    <Form.Control required type="text" placeholder="Titre" value={title} onChange={(e) => setTitle(e.target.value)} />
                    <Form.Control.Feedback type="invalid">
                      Merci de renseigner un titre.
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Message</Form.Label>
                    <Form.Control required type="text" placeholder="Message" value={message} onChange={(e) => setMessage(e.target.value)} />
                    <Form.Control.Feedback type="invalid">
                      Merci de renseigner un message.
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Button variant="success" type="submit">Ajouter</Button>
                </Form>
              </Modal.Body>
            </Modal>
        </>
      }
    </>
  );
}

export default Posts;