import { useSelector } from 'react-redux';
import {
  selectSoldCount,
  selectTotalCount,
} from '../../app/action-creators/pet';
import classes from '../../styles/PetInfo.module.scss';

const PetInfo = () => {
  const totalCount = useSelector(selectTotalCount);
  const soldCount = useSelector(selectSoldCount);
  const availCount = +totalCount - +soldCount;

  return (
    <div className={classes.petinfo}>
      <div className={classes.element}>
        <label>Sold</label>
        <span>
          <strong>{soldCount}</strong>
        </span>
      </div>
      <div className={classes.element}>
        <label>Available</label>
        <span>
          <strong>{availCount}</strong>
        </span>
      </div>
    </div>
  );
};

export default PetInfo;
