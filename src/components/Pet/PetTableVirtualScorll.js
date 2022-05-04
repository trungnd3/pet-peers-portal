import { Fragment } from 'react';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import VirtualAndInfiniteScroll from '../UI/VirtualAndInfiniteScroll';

const PetTableVirtualScorll = ({ pets, onBuyPet }) => {
  const purchasable = onBuyPet !== undefined;

  const listPets = pets.map(({ id, name, place, age, owner }, index) => (
    <Fragment key={id}>
      <td>{index + 1}</td>
      <td>{name}</td>
      <td>{place}</td>
      <td>{age}</td>
      {purchasable && (
        <td>
          {owner === undefined && (
            <Button
              variant='primary-pet-peers'
              onClick={() => {
                onBuyPet(id);
              }}
            >
              Buy
            </Button>
          )}
          {owner !== undefined && (
            <Button variant='primary-pet-peers' disabled>
              Sold
            </Button>
          )}
        </td>
      )}
    </Fragment>
  ));

  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>#</th>
          <th>Pet Name</th>
          <th>Place</th>
          <th>Age</th>
          {purchasable && <th>Action</th>}
        </tr>
      </thead>
      <tbody>
        <VirtualAndInfiniteScroll
          type='tr'
          listItems={listPets}
          height='30'
          lastRowHandler={() => {}}
        />
      </tbody>
    </Table>
  );
};

export default PetTableVirtualScorll;
