/**
 * Created by bolan on 2017/12/18.
 */
import PouchDB from 'pouchdb-browser';
import PouchDbFind from 'pouchdb-find';

PouchDB.plugin(PouchDbFind);
/**
 *
 * @type {PouchDB$3}
 */
var db = new PouchDB('my_database');

/**
 * @typedef {Object} EventDto
 * @property {string} _id - id of the dto
 * @property {Date} date - full date value
 * @property {String} description
 */


/**
 *
 * @constructor
 */
function EventDao(){

}

/**
 *
 * @param {EventDto}eventDto
 */
EventDao.prototype.save = function(eventDto){
    db.put(eventDto)
        .then(function(response){
            console.log(response);
            })
        .catch(function(err){
            console.log(err);
            });
};

/**
 *
 * @param {Array.<EventDto>}eventDtoList
 * @return {Promise}
 */
EventDao.prototype.saveBatch = function(eventDtoList){
    return db.bulkDocs(eventDtoList)
        .then(function(response){
            console.log(response);
        })
        .catch(function(err){
            console.log(err);
        });
};
/**
 *
 * @param {int} year
 * @param {int} month
 * @return {Promise}
 */
EventDao.prototype.getByMonth = function(year , month){
    var monthIndex = month-1;
    return db.allDocs({include_docs: true, descending: true})
        .then(function (resultArr) {
            console.log(resultArr);
            return resultArr.rows.map(function(item){
                /** @type {EventDto}*/
                var dto = item.doc;
                dto.date = new Date(dto.date);
                return dto;
            }).filter(function(dto){
                /** @type {EventDto}*/
                var dto = dto;
                return dto.date.getMonth() === monthIndex && dto.date.getFullYear() === year
            });
        })
};

/**
 * @return {Promise}
 */
EventDao.prototype.destroyDB = function(){
    return db.destroy().then(function(){
        db = new PouchDB('my_database');
    });
};
export default EventDao;