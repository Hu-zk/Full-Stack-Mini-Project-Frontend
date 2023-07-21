const pages = {}

pages.base_url = "http://localhost//Full-Stack-Mini-Project-Backend/";

pages.print_message = (message) =>{
    console.log(message);
}

pages.getAPI = async (url) =>{
    try{
        return await fetch(url)
        .then(res => res.json())
        .then(api_data => console.log('Response from API:'+ api_data))
    }catch(error){
        pages.print_message("Error from GET API: " + error)
    }
}

pages.postAPI = async (api_url, api_data) => {
    try{
        return await fetch(api_url,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(api_data)
        })
        .then(res =>{
            return res.json()
        } )
        .then(api_data => {
            return api_data
        })
    
    }catch(error){
        pages.print_message("Error from Linking (POST) " + error)
    }
}


pages.submit = (page) => {
    const form = document.getElementById("form")
    form.addEventListener('submit', event => {
        console.log("i am in submit")
        event.preventDefault()
        const form_data = new FormData(form)
        const data = Object.fromEntries(form_data)
        pages.loadFor(page,data)
    })
}

pages.page_register = async (data) => {
    console.log("i am in register")
    const register_url = pages.base_url + "register.php"
    const response = await pages.postAPI(register_url,data)
    
    if (response.status === "success") {
        console.log("Account added successfully")
        window.location.href = `login.html`;
    }else{
        console.log(response.message)
    }
    
}

pages.page_login = async (data) => {
    console.log("i am in login")
    const login_url = pages.base_url + "login.php"
    const response = await pages.postAPI(login_url,data)
    if (response.status === "logged in") {
        console.log(response.status)
        window.location.href = `dashboard.html?username=${response.username}`;
    }else{
        console.log(response.message)
    }
}

pages.loadFor = (page,data) => {
    eval("pages.page_" + page + "(" + JSON.stringify(data) + ");");
}