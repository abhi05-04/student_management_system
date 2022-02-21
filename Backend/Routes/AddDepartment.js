const Express = require('../ServiceHost').Express;
const DatabaseRepository = require('../MySqlDb/MySqlDBrepository');
const department = require('../Models/Department')
const sequelize = require('../ServiceHost').sequelize;

const router = Express.Router();
const Sequelize = require('sequelize');

router.get('/', async (req, res, next) => {
    try {
        const transaction = await sequelize.transaction();
        const getQuery = 'select *  from Department';

        var QueryRes = await DatabaseRepository.query(getQuery, {
            replacement: [], type: Sequelize.QueryTypes.SELECT
        });
        
        
        res.status(200).send(QueryRes);
    } catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
});


router.post('/', async (req, res, next) => {
    try {
        const transaction = await sequelize.transaction();
        var AddAddressResponse = await DatabaseRepository.insertOne(department,req.body,null,transaction);
        console.log(AddAddressResponse)
        res.status(200).send(AddAddressResponse);
    } catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
});

module.exports = router;