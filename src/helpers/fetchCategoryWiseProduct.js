import SummaryApi from "../common"

const fetchCategoryWiseProduct = async (brandName) => {
    const response = await fetch(SummaryApi.categoryWiseProduct.url, {
        method: SummaryApi.categoryWiseProduct.method,
        headers: {
            "content-type": "application/json"
        },
        body: JSON.stringify({
            brandName: brandName
        })
    })
    const dataResponse = await response.json()
    return dataResponse
}
export default fetchCategoryWiseProduct