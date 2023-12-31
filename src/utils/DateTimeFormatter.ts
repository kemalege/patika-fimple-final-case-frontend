export const formatDateTime = (dateTime: string) => {
    const date = new Date(dateTime);
    const formattedDate = date.toLocaleDateString();
    const formattedTime = date.toLocaleTimeString();

    return `${formattedDate} ${formattedTime}`;
};

export const formatDayAndMonth  = (dateTime: string) => {
    const date = new Date(dateTime);
    const day = date.getDate();
    const month = date.toLocaleString('default', { month: 'long' });
    // const year = date.getFullYear().toString().slice(-2);
    // const formattedTime = date.toLocaleTimeString();

    return `${day} ${month}`;
};

