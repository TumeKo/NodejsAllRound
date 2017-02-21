exports.render = function(req, res){
    res.render('index', {
        title : 'TK Webpage',
        user: JSON.stringify(req.user)
    });
};