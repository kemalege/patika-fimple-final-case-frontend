import { useLocation, useParams } from 'react-router-dom';
import { selectApplicationByCode, selectApplicationByCodeError, selectApplicationByCodeStatus } from '../features/application/applicationSlice';
import { useSelector } from 'react-redux';

const ViewApplication = () => {

  const searchByCodeRequestStatus = useSelector(selectApplicationByCodeStatus)
  const searchErrorObject = useSelector(selectApplicationByCodeError)

  const applicationByCodeStatus = useSelector(selectApplicationByCodeStatus)
  const applicationByCode = useSelector(selectApplicationByCode)
  const location = useLocation();
  const params = useParams();

  console.log(searchByCodeRequestStatus);

  return (
    searchByCodeRequestStatus === 'failed' ? <div>{searchErrorObject?.message}</div> : <div>bulundu</div>
  )
}

export default ViewApplication