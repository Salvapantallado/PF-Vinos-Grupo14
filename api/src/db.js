require('dotenv').config();
const { Sequelize, DataTypes } = require('sequelize');
const fs = require('fs');
const path = require('path');
const {
  DB_USER, DB_PASSWORD, DB_HOST,DB_NAME
} = process.env;

let sequelize =
  process.env.NODE_ENV === "production"
    ? new Sequelize({
        database: DB_NAME,
        dialect: "postgres",
        host: DB_HOST,
        port: 5432,
        username: DB_USER,
        password: DB_PASSWORD,
        pool: {
          max: 3,
          min: 1,
          idle: 10000,
        },
        dialectOptions: {
          ssl: {
            require: true,
            // Ref.: https://github.com/brianc/node-postgres/issues/2009
            rejectUnauthorized: false,
          },
          keepAlive: true,
        },
        ssl: true,
      })
: new Sequelize(`postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DB_NAME}`, {
  logging: false, 
  native: false, 
});
const basename = path.basename(__filename);

const modelDefiners = [];


fs.readdirSync(path.join(__dirname, '/Models'))
  .filter((file) => (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js'))
  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, '/Models', file)));
  });


modelDefiners.forEach(model => model(sequelize));

let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [entry[0][0].toUpperCase() + entry[0].slice(1), entry[1]]);
sequelize.models = Object.fromEntries(capsEntries);


const { Categories,Order,Product,Review,User,Wineries,Orderline,Pairing } = sequelize.models;

//Relations 
Categories.belongsToMany(Product, {through: 'products_categories'});
Product.belongsToMany(Categories, {through: 'products_categories'});

Pairing.belongsToMany(Product, {through: 'products_Pairing'});
Product.belongsToMany(Pairing, {through: 'products_Pairing'});

Wineries.hasMany(Product);
Product.belongsTo(Wineries);

Order.hasMany(Orderline);
Orderline.belongsTo(Order);

User.hasMany(Order);
Order.belongsTo(User);

Orderline.belongsTo(Product)
Product.hasMany(Orderline)

Product.hasMany(Review);
Review.belongsTo(Product);

Review.belongsTo(User);
User.hasMany(Review);

User.belongsToMany(Product,{as:"Favorites",through:"users_favorites"})
Product.belongsToMany(User,{as:"Favorites",through:"users_favorites"})

module.exports = {
  ...sequelize.models, 
  conn: sequelize,     
};
