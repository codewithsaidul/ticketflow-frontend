export const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat("en-US", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
};



export function queryStringFormatter(searchParamsObj: { [key: string]: string | string[] | undefined }): string {

    let queryString = "";
    const queryArray = Object.entries(searchParamsObj).map(([key, value]) => {
        if (Array.isArray(value)) {
            return value.map((v) => `${key}=${encodeURIComponent(v)}`).join("&");
        }
        else if (value !== undefined) {
            return `${key}=${encodeURIComponent(value)}`;
        }
        return "";
    });

    queryString = queryArray.filter((q) => q !== "").join("&"); 
    return queryString;
}