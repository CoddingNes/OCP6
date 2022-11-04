const Sauce = require('../models/sauces');
const fs = require('fs');

exports.getAllSauces = (req, res, next) => {
    Sauce.find()
    .then((sauces) => {
        res.status(200).json(sauces) //ATTENTION : sauces n'est pas un objet {sauces}
    })
    .catch(err => res.status(400).json({err}));
};

exports.getOneSauce = (req, res, next) => {
    Sauce.findOne({_id: req.params.id})
    .then((sauce) => res.status(200).json(sauce))
    .catch(err => res.status(404).json({err}));
}; 

exports.postOneSauce = (req, res, next) => {
    const sauceObj = JSON.parse(req.body.sauce);
    delete sauceObj._id;
    delete sauceObj.userId;
    const sauce = new Sauce({
        ...sauceObj,
        userId: req.auth.userId,
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
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
    const sauceObj = req.file ? {
        ...JSON.parse(req.body.sauce),
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    } : {...req.body};
    delete sauceObj.userId;
    Sauce.findOne({_id: req.params.id})
    .then((sauce) => {
        if (sauce.userId != req.auth.userId) {
            res.status(401).json({message: 'Authorization error'})
        } else {
            Sauce.updateOne({_id: req.params.id}, {...sauceObj, _id: req.params.id})
                .then(() => res.status(200).json({message: 'Sauce updated successfully'}))
                .catch(err => res.status(401).json(err))
        }
    })
    .catch(err => res.status(400).json({err}));



/*    Sauce.updateOne({_id: require.params.id}, {_id: require.params.id})
    .then(() => res.status(200).json({message: 'Object modified successfully'}))
    .catch(err => res.status(400).json({err}));
*/
};

exports.deleteOneSauce = (req, res, next) => {
    Sauce.findOne({_id: req.params.id})
    .then((sauce) => {
        if (sauce.userId != req.auth.userId) {
            res.status(401).json({message: 'Authorization error'})
        } else {
            const filename = sauce.imageUrl.split('/images/')[1];
            fs.unlink(`images/${filename}`, () => {
                Sauce.deleteOne({_id: req.params.id})
                .then(() => res.status(200).json({message: 'Object deleted successfully'}))
                .catch(err => res.status(400).json({err}));
            })
        }
    })
    .catch(err => res.status(500).json({err}))
};

//compléter les logiques métier

// exports.postOneSauceLike = (req, res, next) => {
    
// };




