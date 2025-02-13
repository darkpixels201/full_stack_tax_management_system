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


export const convertImageUrlToFile = async (imageUrl, fileName = "chequeImage.png") => {
    try {
      const response = await fetch(imageUrl);
      const blob = await response.blob();
      return new File([blob], fileName, { type: blob.type });
    } catch (error) {
      console.error("Error converting image URL to file:", error);
      return null;
    }
  };