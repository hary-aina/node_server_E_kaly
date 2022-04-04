/* node JS */
var EmailModel = require('../tools/Email');
const ObjectId = require('mongodb').ObjectId; 

module.exports = class RestaurantModel{

    //inscription
    static NewAndAdminRestaurant(db, restaurant_name, description, name, email, type_user_id, type_user_name, contact){
        return new Promise((resolve, reject)=> {
            db.collection("restaurant").insertOne(
                {
                    name : restaurant_name, 
                    description : description
                }
            ).toArray(function (err, result) {
                if (err) {
                    console.error(err);
                    reject(error);
                    return;
                } else {
                    let restaurant_id = result.ops[0]._id;
                    let password = EmailModel.genererCodeMDP(email);
                    db.collection("user").insertOne(
                        {
                            name : name, 
                            email : email, 
                            password : password, 
                            type_user_id : type_user_id, 
                            type_user_name : type_user_name, 
                            contact : contact,
                            restaurant_id : ObjectId(restaurant_id),
                            restaurant_name : restaurant_name
                        }
                    ).toArray(function (err, result) {
                        if (err) {
                            db.collection("restaurant").deleteOne(
                                {
                                    _id : new ObjectId(restaurant_id), 
                                }
                            )
                            console.error(err);
                            reject(error);
                            return;
                        } else {
                            resolve({
                                "status": 200,
                                "data": result.ops[0]
                            });
                        }
                    });
                }
            });
        });
    }
    
}