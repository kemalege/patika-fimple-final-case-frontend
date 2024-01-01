import { useEffect } from "react";
import { setActiveTab } from "../features/navigation/navigationSlice";
import { useDispatch, useSelector } from "react-redux";
import { getPendingApplications, selectPendingApplications } from "../features/application/applicationSlice";
import { useAppDispatch } from "../app/store";
import ApplicationColumnDef from "../columnDefinitions/ApplicationDef";
import GenericGrid from "../components/GenericGrid";

const PendingApplicationList = () => {

  const dispatch = useDispatch();
  const appDispatch = useAppDispatch();
  const pendingApplicationList = useSelector(selectPendingApplications)

  useEffect(() => {
    dispatch(setActiveTab("Admin", "Bekleyen Başvurular"));
     (async() => {
      try {
          await appDispatch(getPendingApplications()).unwrap();
      } catch (error: any) {
        console.log(error)
      } 
    })()
  }, [])


  return (
    <GenericGrid columns={ApplicationColumnDef} rowData={pendingApplicationList}/>
  );
};

export default PendingApplicationList;
