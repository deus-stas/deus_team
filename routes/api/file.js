const fs = require('fs');

/**
 * Метод по загрузке файлов
 * @param image файл для загрузки
 * @param fieldName имя поля в объекте, куда сохраняется файл
 * @param obj объект, куда сохраняется файл
 * @param req запрос
 * @param fieldNameReq имя поля с файлом в запросе
 */
const uploadFile = (image, fieldName, obj, req, fieldNameReq) => {
    if (image) {
        if (obj[fieldName]) {
            const path = `uploads/${obj[fieldName]['filename']}`
            if (fs.existsSync(path)) {
                fs.unlink(path, (err) => {
                    if (err) {
                        console.error(err);
                    }
                });
            }

        }
        obj[fieldName] = image;
    } else {
        if (obj[fieldName] && obj[fieldName]['path'] && req.body[fieldNameReq] !== 'true') {
            const path = `uploads/${obj[fieldName]['filename']}`
            if (fs.existsSync(path)) {
                fs.unlink(path, (err) => {
                    if (err) {
                        console.error(err);
                    }
                });
            }

            obj[fieldName] = null;
        }
    }
}

module.exports.uploadFile = uploadFile;