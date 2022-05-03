import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';

const PetTable = ({ pets, onBuyPet }) => {
  const purchasable = onBuyPet !== undefined;
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
        {pets.map(({ id, name, place, age, owner }, index) => (
          <tr key={id}>
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
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default PetTable;
