import { Fragment, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Button from 'react-bootstrap/Button';
import Centered from '../components/UI/Centered';
import LoadingSpinner from '../components/UI/LoadingSpinner';
import PetTableVirtualScorll from '../components/Pet/PetTableVirtualScorll';
import SearchPet from '../components/Pet/SearchPet';
import PetInfo from '../components/Pet/PetInfo';
import {
  selectAllPets,
  buyPet,
  selectStatus,
} from '../app/action-creators/pet';
import { selectUser } from '../app/action-creators/auth';
import classes from '../styles/Home.module.scss';

const Home = () => {
  const pets = useSelector(selectAllPets);
  const status = useSelector(selectStatus);
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

  if (status.loading === 'pending') {
    return (
      <Centered>
        <LoadingSpinner />
      </Centered>
    );
  }

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
      <div className={classes.homeHeader}>
        <Button variant='light' onClick={startSearchHandler}>
          Advanced Search
        </Button>
        <PetInfo soldCount={10} totalCount={15} />
      </div>
      <PetTableVirtualScorll
        pets={filteredPets}
        onBuyPet={buyPetHandler}
        purchasable={true}
      />
    </Fragment>
  );
};

export default Home;
