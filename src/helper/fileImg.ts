


export const coverImg = (fileName: string): string => {
    return `${process.env.BASE_URL}/${fileName}`;
}

export const getPublicId = (path: string) => {

    const withoutVersion = path.replace(/^\/v\d+\//, ""); 

    return withoutVersion.replace(/\.[^/.]+$/, "");
}
