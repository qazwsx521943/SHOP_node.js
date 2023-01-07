exports.getProducts = (req,res,next) => {
    res.render('shop', {
        title: 'product',
    });
};

exports.getAddProduct = (req, res, next) => {
    res.render('add-product',{
        title:'addProduct',
    });
};

const product = [];


exports.postAddProduct = (req, res, next) => {
    product.push({
        productName: req.body.productName,
        imageUrl: req.body.imageUrl,
        price: req.body.price,
        description: req.body.description
    })
    res.redirect('/');
}