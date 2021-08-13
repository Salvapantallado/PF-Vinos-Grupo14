const { Orderline } = require('../db')
const { Order } = require('../db')

async function edirOrder(req, res, next) {

    const { id } = req.params

    const { name, price, description, image, stock, categories } = req.body;

    let productValues = { name: name, description: description, price: price, image: image, stock: stock }

    try {
        let productToEdit = await Product.findOne({ where: { id }})
        

        for (let property in productValues) {
            productToEdit[property]=productValues[property]
        }
        
        productToEdit.setCategories(null)
        
        categories.forEach(async(category)=>{
           let model=await Categories.findOne({where:{name:category}})
           productToEdit.addCategories(model)
        }
        )


        await productToEdit.save()

        res.send({ msg: "The product was edited successfully." });

    } catch (error) {

        next(error)
    };

};



module.exports = {
    editProduct,
}