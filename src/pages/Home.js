import { Fragment, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Button from 'react-bootstrap/Button';
import Centered from '../components/UI/Centered';
import Pets from '../components/Pet/PetTable';
import SearchPet from '../components/Pet/SearchPet';
import { selectAllPets, buyPet } from '../app/action-creators/pet';
import { selectUser } from '../app/action-creators/auth';

const Home = () => {
  const pets = useSelector(selectAllPets);
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const [searching, setSearching] = useState(false);
  const [searchValues, setSearchValues] = useState({});
  const [filteredPets, setFilteredPets] = useState(pets);

  useEffect(() => {
    setFilteredPets(
      pets.filter((pet) => {
        let match = true;
        for (const key in searchValues) {
          if (!searchValues[key]) {
            continue;
          }
          switch (key) {
            case 'name':
              if (!pet[key].includes(searchValues[key])) {
                match = false;
              }
              break;
            default:
              if (pet[key].toString() !== searchValues[key].toString()) {
                match = false;
              }
              break;
          }
        }
        return match;
      })
    );
  }, [pets, searchValues]);

  const buyPetHandler = (petId) => {
    dispatch(buyPet(user, petId));
  };

  const startSearchHandler = () => {
    setSearching(true);
  };

  const closeSearchHandler = () => {
    setSearching(false);
  };

  const searchHandler = (values) => {
    setSearchValues({ ...values });
    setSearching(false);
  };

  if (pets.length === 0) {
    return (
      <Centered>
        <h3>No Pets found!</h3>
      </Centered>
    );
  }

  return (
    <Fragment>
      <SearchPet
        show={searching}
        onClose={closeSearchHandler}
        onSearch={searchHandler}
      />
      <div className='p-3 d-flex flex-row-reverse'>
        <Button variant='light' onClick={startSearchHandler}>
          Advanced Search
        </Button>
      </div>
      <Pets pets={filteredPets} onBuyPet={buyPetHandler} purchasable={true} />
    </Fragment>
  );
};

export default Home;
