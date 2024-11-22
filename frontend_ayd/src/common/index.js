const backendDomain = "http://localhost:8080"
const mysqlDomain = "http://localhost:5000"

const SummaryApi = {
    signUp : {
        url : `${backendDomain}/api/signup`,
        method : "post"
    },
    signIn : {
        url : `${backendDomain}/api/signin`,
        method : "post"
    },
    current_user : {
        url : `${backendDomain}/api/user-details`,
        method : "get"
    },
    logout_user : {
        url : `${backendDomain}/api/userLogout`,
        method : "get"
    },
    allUser : {
        url : `${backendDomain}/api/all-user`,
        method : 'get'
    },
    updateUser : {
        url : `${backendDomain}/api/update-user`,
        method : 'post'
    },
    addDoctor : {
        url : `${mysqlDomain}/api/addDoctor`,
        method : 'post'
    },
    allDoctor : {
        url : `${mysqlDomain}/api/allDoctor`,
        method : 'get'
    },
    calories : {  // New endpoint for calorie data submission
        url : `${backendDomain}/api/calories`,
        method : 'post'
    },
    getcalories:{
        url: `${backendDomain}/api/calories`,
        method: 'get'
    }

}


export default SummaryApi