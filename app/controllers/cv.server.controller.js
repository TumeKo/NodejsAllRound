var mongoose = require('mongoose'),
    Cv = mongoose.model('CV');

var getErrorMessage = function(err){
    if (err.errors){
        for (var errName in err.errors){
            if (err.errors[errName].message) return err.errors[errName].message;
        }
    } else{
        return 'Unknown server error';
    }
};

exports.list = function(req,res){
    Cv.find({},function(err,cv){
        if (err){
            return next(err);
        }else{
            res.json(cv);
        }
    });
};

exports.create = function(req, res) {
    var cv = new Cv(req.body);
    cv.save(function(err){
        if(err){
            return res.status(400).send({
                message: getErrorMessage(err)
            });
        } else{
            res.json(cv);
        }
    });
};