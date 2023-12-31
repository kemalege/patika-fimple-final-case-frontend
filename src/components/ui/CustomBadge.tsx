
type statusObject = {
    [key: string]: { color: string; tag: string };
};

const statusObject: statusObject = {
    solved: {
        color: 'bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20',
        tag: 'Çözüldü'
    },
    rejected: {
        color: 'bg-red-50 px-2 py-1 text-xs font-medium text-red-700 ring-1 ring-inset ring-red-600/10',
        tag: 'Reddedildi'
    },
    pending: {
        color: 'bg-yellow-50 px-2 py-1 text-xs font-medium text-yellow-800 ring-1 ring-inset ring-yellow-600/20',
        tag: 'Beklemede'
    }
};

export const CustomBadge = (status: string) => {
    return <span className={'inline-flex items-center rounded-md ' + statusObject[status].color}>{statusObject[status].tag}</span>;
};