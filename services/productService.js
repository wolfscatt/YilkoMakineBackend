var router = require('../routes/routes')
var Product = require('../models/product')
var userService = require('./userService')

// Add Product
router.post('/add', async (request, response) => {
    try{
        const productData = new Product({
            name: request.body.name,
            imageUrl: request.body.imageUrl,
        })
        const result = await productData.save()
        response.status(201).send(result)
    }
    catch (error){
        return response.sendStatus(500).send({msg: error})
    }
    
})

// Update Product
router.put('/update/:name', async (request, response) => {
    const productName = request.params.name;
    try {
        // İlgili ürünü bulun
        const existingProduct = await Product.findOne({name:productName});

        if (!existingProduct) {
            return response.status(404).send({ message: 'Ürün bulunamadı' });
        }

        // Yeni verileri alın
        const updatedData = {
            name: request.body.name || existingProduct.name,
            imageUrl: request.body.imageUrl || existingProduct.imageUrl,
        };

        // Verileri güncelle
        const updatedProduct = await Product.findOneAndUpdate({name: productName}, updatedData, { new: true });

        response.status(200).send(updatedProduct);
    } catch (error) {
        console.error(error);
        response.status(500).send({ message: 'Sunucu hatası' });
    }
});

// Delete Product
router.delete('/delete/:_id', async (request, response) => {
    const productId = request.params._id;

    try {
        // İlgili ürünü bulun ve silin
        const deletedProduct = await Product.findByIdAndRemove(productId);

        if (!deletedProduct) {
            return response.status(404).send({ message: 'Ürün bulunamadı' });
        }

        response.status(200).send({ message: 'Ürün başarıyla silindi' });
    } catch (error) {
        console.error(error);
        response.status(500).send({ message: 'Sunucu hatası' });
    }
});

// Get all Products
router.get('/', async (request, response) =>{
    let results = await Product.find({}, "-__v")
    response.send(results).status(200);
})

// // Get by id 
// router.get('/:_id', async (request, response) =>{
//     const productId = request.params._id;
//     try {
//         const product = await Product.findById(productId);
//         if (!product) {
//           return response.status(404).send({ message: 'Ürün bulunamadı' });
//         }
//         response.status(200).send(product);
//       } catch (error) {
//         console.error(error);
//         response.status(500).send({ message: 'Sunucu hatası' });
//       }
// })

// Get by name
router.get('/:name', async (request, response) => {
    const productName = request.params.name;
    try {
        // İlgili ürünü bulun
        const product = await Product.findOne({ name: productName });

        if (!product) {
            return response.status(404).send({ message: 'Ürün bulunamadı' });
        }

        response.status(200).send(product);
    } catch (error) {
        console.error(error);
        response.status(500).send({ message: 'Sunucu hatası' });
    }
});


const product = {router}
module.exports = product