export const formattedDate = ({datu}) => {
    const date = new Date(datu);
    const formattedDate = `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}`;
    return formattedDate;
}