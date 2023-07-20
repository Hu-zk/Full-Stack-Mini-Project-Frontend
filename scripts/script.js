const pages = {}

pages.base_url = "http://localhost//Full-Stack-Mini-Project-Backend/";

pages.print_message = (message) =>{
    console.log(message);
}

pages.getAPI = async (url) =>{
    try{
        return await fetch(url)
    }catch(error){
        pages.print_message("Error from GET API: " + error)
    }
}

pages.postAPI = async (api_url, api_data) => {
    try{
        return await axios.post(
            api_url,
            api_data
        );
    }catch(error){
        pages.print_message("Error from Linking (POST)" + error)
    }
}

pages.page_register = async () => {
    const register_url = pages.base_url + "register.php"
    const username = document.getElementById("username").val
    const email = document.getElementById("email").val
    const password = document.getElementById("password").val
    const data = [['username']=username,['email']=email,['password']=password]
    const response = await pages.postAPI(register_url,data)
    
}

pages.page_login = async () => {
    const login_url = pages.base_url + "login.php"
    const email = document.getElementById("email").val
    const password = document.getElementById("password").val
    const data = [['email']=email,['password']=password]
    const response = await pages.getAPI(login_url,data)
}

pages.page_articles = () => {
    const articles_url = pages.base_url + "get_articles.php";
    pages.print_message("Hello Artciles from JS")
}


//this will load the scripts of the mentioned page
pages.loadFor = (page) => {
    eval("pages.page_" + page + "();")
}






