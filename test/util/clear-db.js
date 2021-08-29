import mongoose from 'mongoose';
import async from 'async';

/**
 * Used for testing. To clear database and alow to populate it with testing data during the test cases. 
 * @param {} callback 
 */
export function clearDatabase(callback) {

    const dbFunctions = [];

    function createAsyncFunc(index) {
        dbFunctions.push((done) => {
            mongoose.connection.collections[index].remove(() => {
                done();
            });
        });
    }

    for(const i in mongoose.connection.collections) {
        if(mongoose.connection.collections.hasOwnProperty(i)) {
            createAsyncFunc(i);
        }
    }
    async.parallel(dbFunctions, () => callback());

}