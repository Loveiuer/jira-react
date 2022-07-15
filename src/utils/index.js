export function select(projectObj, users) {
    let newProjectObj = { ...projectObj };
    let projectUser = users.find((user) => user.id === newProjectObj.personId);
    newProjectObj.personName = projectUser.name;
    return newProjectObj;
}

function isNullValues(value) {
    return value === 0 ? false : !value;
}

export function filterNullValues(obj) {
    let newObj = { ...obj };
    Object.keys(newObj).forEach((key) => {
        if (isNullValues(newObj[key])) {
            delete newObj[key];
        }
    });
    return newObj;
}
