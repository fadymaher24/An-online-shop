import path from 'path';

export default path.dirname((process.mainModule as NodeModule).filename);
