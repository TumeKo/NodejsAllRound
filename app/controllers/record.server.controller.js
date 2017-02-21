var mongoose = require('mongoose'),
    Record = mongoose.model('Record');

var getErrorMessage = function(err){
    if (err.errors){
        for (var errName in err.errors){
            if (err.errors[errName].message) return err.errors[errName].message;
        }
    } else{
        return 'Unknown server error';
    }
};

exports.create = function(req,res) {
    var record = new Record(req.body);
    
    record.creator = req.user;
    record.save(function(err){
        if (err){
            return res.status(400).send({
                message: getErrorMessage(err)
            });
        } else{
            res.json(record);
        }
    });
};

exports.list = function(req, res){
    Record.find().sort('-created').populate('creator', 'firstName lastName fullName').exec(function(err, records){
        if(err){
            return res.status(400).send({
                message: getErrorMessage(err)
            });
        } else{
            res.json(records);
        }
    });
};

exports.recordByID = function(req,res,next,id){
    Record.findById(id).populate('creator','firstName lastName fullName').exec(function(err, record){
        if(err) return next(err);
        if(!record) return next(new Error('Failed to load record '+ id));
        req.record = record;
        next();
    });
};

exports.read = function(req,res) {
    res.json(req.record);
};

exports.update = function(req,res) {
    var record = req.record;
    record.title = req.body.title;
    record.content = req.body.content;
    record.save(function(err){
        if (err){
            return res.status(400).send({
                message: getErrorMessage(err)
            });
        } else {
            res.json(record);
        }
    });
};

exports.delete = function(req,res) {
    var record = req.record;
    record.remove(function(err){
        if (err){
            return res.status(400).send({
                message: getErrorMessage(err)
            });
        } else {
            res.json(record);
        }
    });
};


exports.getImgById = function(){
    
}

exports.saveImg = function(){
    
}

exports.hasAuthorization = function(req, res, next) {
    if (req.record.creator.id !== req.user.id){
        return res.status(403).send({
            message: 'User is not authorized'
        });
    }
    next();
};