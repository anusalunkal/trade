var oLoginPage=require ("./Login/LoginBasePage.js");


class SpecUtil{

    async applicationLogin(dtoLogin){
        it('Login to the Application',async function(){
            await console.log(dtoLogin);
            await oLoginPage.login(dtoLogin);
        })
    }


 

    
}

module.exports=new SpecUtil();