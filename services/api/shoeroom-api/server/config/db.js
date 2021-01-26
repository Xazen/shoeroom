import mongoose from 'mongoose';

const MONGOURI = "mongodb://db:27017/shoeroom";

const InitiateMongoServer = async () => {
    try {
        await mongoose.connect(MONGOURI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log(`Connected successfully to ${MONGOURI}`)
    } catch (e) {
        console.log(e);
        throw e;
    }
};

export default InitiateMongoServer;