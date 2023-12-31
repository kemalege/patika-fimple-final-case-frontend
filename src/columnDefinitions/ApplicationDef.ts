import ApplicationTransactions from "../components/grid/ApplicationTransactions";
import RenderStatus from "../components/grid/RenderStatus";
import { formatDateTime } from "../utils/DateTimeFormatter";

interface ApplicationColumn {
    field: string;
    header: string;
    cellRenderer?: (params: string) => JSX.Element;
    valueFormatter?: (params: string) => string;
}

const ApplicationColumnDef: ApplicationColumn[] = [
    { field: 'Transactions', header: 'İşlemler', cellRenderer: ApplicationTransactions },
    { field: 'firstName', header: 'Ad' },
    { field: 'lastName', header: 'Soyad'  },
    { field: 'status', header: 'Durum', cellRenderer: RenderStatus},
    { field: 'age', header: 'Yaş' },
    { field: 'identity', header: 'TC' },
    { field: 'applicationReason', header: 'Başvuru Nedeni' },
    { field: 'createdAt', header: 'Başvuru Tarihi', valueFormatter: formatDateTime },
];

export default ApplicationColumnDef;
