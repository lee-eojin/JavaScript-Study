function getFliename(path) {
    const parts = path.split('/');
    const filename = parts[parts.length - 1];

    return filename;

}

const fullPath = 'C:/Users/Lito/Desktop/my-project/index.html';

const result = getFilename(fullPath);

console.log(result);