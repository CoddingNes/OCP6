const Sauce = require('../models/sauces');

exports.getAllSauces = (req, res, next) => {
    console.log('getAllSauces')

    Sauce.find()
    .then((sauces) => {
        console.log(sauces)
        res.status(200).json({sauces})
    })
    .catch(err => res.status(400).json({err}));
};

exports.getOneSauce = (req, res, next) => {
    Sauce.findOne({id: req.params._id})
    .then((sauce) => res.status(200).json({sauce}))
    .catch(err => res.status(404).json({err}));
}; 

exports.postOneSauce = (req, res, next) => {
    console.log("post")
    const sauceObj = JSON.parse(req.body.sauce);
    delete sauceObj._id;
    delete sauceObj.userId;
    const sauce = new Sauce({
        ...sauceObj,
        userId: req.auth.userId,
        imageUrl: `${req.protocol}://${req.get('host')}/image/${req.file.filename}`
    })   
//    delete(req.body._id);
//    const sauce = new Sauce({...req.body});
    sauce.save()
    .then(() => res.status(201).json({message: "New object created successfully"}))
    .catch(err => {
        console.log(err)
        res.status(400).json({err});    
})
};

exports.putOneSauce = (req, res, next) => {
    Sauce.updateOne({id: req.params._id}, {id: req.params._id})
    .then(() => res.status(200).json({message: 'Object modified successfully'}))
    .catch(err => res.status(400).json({err}));
};

exports.deleteOneSauce = (req, res, next) => {
    Sauce.deleteOne({id: require.params.id})
    .then(() => res.status(200).json({message: 'Object deleted successfully'}))
    .catch(err => res.status(400).json({err}));
};

//compléter les logiques métier

exports.postOneSauceLike = (req, res, next) => {

};




