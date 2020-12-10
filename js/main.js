
const app = require('express')();

const faunadb = require('faunadb');
const client = new faunadb.Client({ secret: 'fnAD8sGzGVACDeeZQ-vvat89w4qiSq1_XQewm55I' })

const {
    Ref,
    Paginate,
    Get,
    Match,
    Index,
    Create,
    Collection,
    Join,
    Call,
    Function: Fn,
} = faunadb.query;


app.get('/User/:id', async (req, res) => {

    const doc = await client.query(
        Get(
            Ref(
                Collection('tweets'),
                req.params.id
            )
        )
    )

    res.send(doc)

});



app.get('/User', async (req, res) => {
    const docs = await client.query(
        Paginate(
            Match(
                Index('tweets_by_user'),
                Call(Fn("getUser"), 'fireship_dev')
            )
        )
    )

    res.send(docs)
});



app.listen(5000, () => console.log('API on http://localhost:5000'))



(function ($) {
    "use strict";

    
    /*==================================================================
    [ Validate ]*/
    var input = $('.validate-input .input100');

    $('.validate-form').on('submit',function(){
        var check = true;

        for(var i=0; i<input.length; i++) {
            if(validate(input[i]) == false){
                showValidate(input[i]);
                check=false;
            }
        }

        return check;
    });


    $('.validate-form .input100').each(function(){
        $(this).focus(function(){
           hideValidate(this);
        });
    });

    function validate (input) {
        if($(input).attr('type') == 'email' || $(input).attr('name') == 'email') {
            if($(input).val().trim().match(/^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{1,5}|[0-9]{1,3})(\]?)$/) == null) {
                return false;
            }
        }
        else {
            if($(input).val().trim() == ''){
                return false;
            }
        }
    }

    function showValidate(input) {
        var thisAlert = $(input).parent();

        $(thisAlert).addClass('alert-validate');
    }

    function hideValidate(input) {
        var thisAlert = $(input).parent();

        $(thisAlert).removeClass('alert-validate');
    }
    
    

})(jQuery);