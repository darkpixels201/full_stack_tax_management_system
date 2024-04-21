export const reverseObjKeys = (_obj) => {
    return Object.entries(_obj)
        .reverse()
        .reduce((prev, [key, value]) => ({ ...prev, [key]: value }), {})
}

export const trimObjValues = (obj) => {
    Object.keys(obj).forEach(k => {
        if (typeof (obj[k]) === 'string') {
            obj[k] = obj[k].trim()
        }
    });
}


