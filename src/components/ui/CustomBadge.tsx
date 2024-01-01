type statusObject = {
  [key: string]: { color: string; tag: string };
};

export const statusObject: statusObject = {
  solved: {
    color: "bg-green-50 text-green-700 ring-green-600/20",
    tag: "Çözüldü",
  },
  rejected: {
    color: "bg-red-50 text-red-700 ring-1 ring-red-600/10",
    tag: "Reddedildi",
  },
  pending: {
    color: "bg-yellow-50 text-yellow-800 ring-yellow-600/20",
    tag: "Beklemede",
  },
};

export const CustomBadge = ({ status }: { status: string }) => {
  return (
    <span
      className={
        "inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset " +
        statusObject[status].color
      }
    >
      {statusObject[status].tag}
    </span>
  );
};
