import { Fragment } from 'react';
import { useSelector } from 'react-redux';
import Centered from '../components/UI/Centered';
import Pets from '../components/Pet/PetTable';
import { selectOwnedPets } from '../app/action-creators/pet';

const MyPets = () => {
  const myPets = useSelector(selectOwnedPets);

  return (
    <Fragment>
      {myPets.length === 0 && (
        <Centered>
          <h3>You have no pet yet!</h3>
        </Centered>
      )}
      {myPets.length > 0 && <Pets pets={myPets} />}
    </Fragment>
  );
};

export default MyPets;
