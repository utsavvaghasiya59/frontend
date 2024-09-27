const backendDomain = "http://localhost:8080"
// const backendDomain = "https://mernautojuctionbackend.onrender.com"

const SummaryApi = {
    signUp: {
        url: `${backendDomain}/api/signup`,
        method: "post"
    },
    signIn: {
        url: `${backendDomain}/api/signin`,
        method: "post"
    },
    updatePassword: {
        url: `${backendDomain}/api/update-password`,
        method: 'post'
    },
    googleSignIn: {
        url: `${backendDomain}/api/google-signin`,
        method: "post"
    },
    current_user: {
        url: `${backendDomain}/api/user-details`,
        method: "get"
    },
    logout_user: {
        url: `${backendDomain}/api/userLogout`,
        method: "get"
    },
    allUser: {
        url: `${backendDomain}/api/all-users`,
        method: "get"
    },
    updateUser: {
        url: `${backendDomain}/api/update-user`,
        method: "post"
    },
    uploadProduct: {
        url: `${backendDomain}/api/upload-product`,
        method: "post"
    },
    allProduct: {
        url: `${backendDomain}/api/get-product`,
        method: "get"
    },
    updateProduct: {
        url: `${backendDomain}/api/update-product`,
        method: "post"
    },
    categoryProduct: {
        url: `${backendDomain}/api/get-categoryProduct`,
        method: "get"
    },
    categoryWiseProduct: {
        url: `${backendDomain}/api/category-product`,
        method: "post"
    },
    productDetails: {
        url: `${backendDomain}/api/product-details`,
        method: "post"
    },
    verifyOtp: {
        url: `${backendDomain}/api/verify-otp`,
        method: "post"
    },
    resendOtp: {
        url: `${backendDomain}/api/resend-otp`,
        method: "post"
    },
    deleteProduct: {
        url: `${backendDomain}/api/delete-product`,
        method: "delete"
    },
    searchProduct: {
        url: `${backendDomain}/api/search`,
        method: 'get'
    },
    getBrandModel: {
        url: `${backendDomain}/api/get-uniqueBrandName`,
        method: 'get'
    },
    sendInquiry: {
        url: `${backendDomain}/api/send-inquiry`,
        method: 'post'
    },
    getInquiry: {
        url: `${backendDomain}/api/get-inquiries`,
        method: 'get'
    },
    updateInquiry: {
        url: `${backendDomain}/api/update-inquiry-status`,
        method: 'post'
    },
    getUserWiseInquiry: {
        url: `${backendDomain}/api/getUserInquiry`,
        method: 'get'
    },
    getState: {
        url: `${backendDomain}/api/get-state`,
        method: 'get'
    },
    getCityByState: {
        url: `${backendDomain}/api/getCityByState`,
        method: 'post'
    },
    sendContactDetails: {
        url: `${backendDomain}/api/send-Contact-details`,
        method: 'post'
    }

}
export default SummaryApi