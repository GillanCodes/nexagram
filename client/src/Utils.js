export const isEmpty = (value) => {
    return(
        value === undefined ||
        value === null ||
        (typeof value === "object" && Object.keys(value).length === 0) ||
        (typeof value === "string" && value.trim().length === 0)
    );
}

export const dateConverter = (timestamp) => {  

    let options = {hour: "2-digit", minute: "2-digit", weekday: "long", year: "numeric", month: "short", day:"numeric"}
    let date = new Date(timestamp * 1).toLocaleDateString('fr-FR', options);
        
    return date.toString();
    
}