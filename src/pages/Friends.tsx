import { useEffect, useState } from 'react';
import LoadingSpinner from '../components/LoadingSpinner';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { getUsers, getFriends, getWaitingFriends, addFriend, confirmFriend, getRequestingFriends, removeFriend } from '../services/Friends';
import { useNavigate } from "react-router-dom";
import { getUserToken } from '../services/Auth';

function Friends() {

  type User = {
    id: string;
    "first-name": string;
    "last-name": string;
    "user-name": string;
    email: string;
    age: string;
    sexe: string;
  }

  const [isLoadingFriends, setIsLoadingFriends] = useState(true);
  const [friends, setFriends] = useState<User[]>([]);
  const [isLoadingUsers, setIsLoadingUsers] = useState(true);
  const [users, setUsers] = useState<User[]>([]);
  const [isLoadingFriendsRequest, setIsLoadingFriendsRequest] = useState(true);
  const [friendsRequest, setFriendsRequest] = useState<User[]>([]);
  const [isLoadingRequestingFriends, setIsLoadingRequestingFriends] = useState(true);
  const [requestingFriends, setRequestingFriends] = useState<User[]>([]);

  let navigate = useNavigate();
  useEffect(() => {
    if(!getUserToken()) {
      return navigate('/login');
    }
    setIsLoadingUsers(true);
    getUsers()
      .then(function (response) {
        setIsLoadingUsers(false);
        setUsers(response.data);
      }).catch(function (error) {
        setIsLoadingUsers(false);
      });

    setIsLoadingFriends(true);
    getFriends()
      .then(function (response) {
        setIsLoadingFriends(false);
        setFriends(response.data);
      }).catch(function (error) {
        setIsLoadingFriends(false);
      });

    setIsLoadingFriendsRequest(true);
    getWaitingFriends()
      .then(function (response) {
        setIsLoadingFriendsRequest(false);
        setFriendsRequest(response.data);
      }).catch(function (error) {
        setIsLoadingFriendsRequest(false);
      });

    setIsLoadingRequestingFriends(true);
    getRequestingFriends()
      .then(function (response) {
        setIsLoadingRequestingFriends(false);
        setRequestingFriends(response.data);
      }).catch(function (error) {
        setIsLoadingRequestingFriends(false);
      });
  }, []);


  const handleAddFriend = (user: User) => {
    addFriend(user.id)
      .then(function (response) {
        setRequestingFriends([...requestingFriends, user])
      }).catch(function (error) {
      });   
  }

  function handleConfirmFriend(user: User) {
    confirmFriend(user.id)
      .then(function (response) {
        setFriends([...friends, user])
        setFriendsRequest(friendsRequest.filter(friend => friend.id != user.id))
      }).catch(function (error) {
      }); 
  }

  function handleRemoveFriend(user: User) {
    removeFriend(user.id)
      .then(function (response) {
        setFriends(friends.filter(friend => friend.id != user.id));
        setUsers([...users, user]);
      }).catch(function (error) {
      }); 
  }

  const renderFriends = (
    <>
      {friends.length > 0 ?
        <Row>
          {friends.map((user, index) => (
            <Col xs={4} key={index}>
              <Card>
                <Card.Body>
                  <Card.Text>{ user["user-name"] }</Card.Text>
                  <Button variant="danger" onClick={() => handleRemoveFriend(user)}>Supprimer</Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
        : <p>Aucun amis</p>
      }
    </>
  );

  const renderUsers = (
    <>
      {users.length > 0 ?
      <Row>
        {users.map((user, index) => (
          <>
            {friends.filter(friend => friend.id === user.id).length === 0 &&
            <Col xs={4} key={index}>
              <Card>
                <Card.Body>
                  <Card.Text>{ user["user-name"] }</Card.Text>
                  <Button variant="success" onClick={() => handleAddFriend(user)}>Ajouter</Button>
                </Card.Body>
              </Card>
            </Col>
            }
          </>
        ))}
      </Row>
      : <p>Aucun utilisateur</p>
      }
    </>
  );

  const renderFriendsRequest = (
    <>
      {friendsRequest.length > 0 ?
        <Row>
          {friendsRequest.map((user, index) => (
            <Col xs={4} key={index}>
              <Card>
                <Card.Body>
                  <Card.Text>{ user["user-name"] }</Card.Text>
                  <Button variant="info" onClick={() => handleConfirmFriend(user)}>Confirmer</Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
        : <p>Aucune demande d'amis en attente</p>
      }
    </>
  );

  return (
    <>
      <h5>Mes amis :</h5>
      {isLoadingFriends ? <LoadingSpinner /> : renderFriends}
      <hr></hr>
      <h5>Ajouter des amis :</h5>
      {isLoadingUsers ? <LoadingSpinner /> : renderUsers}
      <hr></hr>
      <h5>Amis à confirmer :</h5>
      {isLoadingFriendsRequest ? <LoadingSpinner /> : renderFriendsRequest}
    </>
  );
}

export default Friends;