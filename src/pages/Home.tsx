import Posts from '../components/Posts';
import { useToken } from '../services/Auth';
import friendsImg from '../assets/images/friends.jpg';

function Home() {
  const { token } = useToken();
  return (
    <>
      {token ?
        <>
          <h5>Fils d'actualités :</h5>
          <Posts/>
        </>
        :
        <div className="mt-2 col-lg-4 offset-lg-4 text-center">
          <h5 className="mb-4">Bienvenue sur le nouveau réseaux social à la mode !</h5>
          <img className="base-image" src={friendsImg} alt="Image d'un groupe d'amis" />
          <p className="mt-4">Ajouter ici tous vos amis et publier des posts déments !</p>
        </div>
      }
    </>
  );
}

export default Home;
