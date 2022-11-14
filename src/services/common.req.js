import axios from 'axios';
import DomainName from '@/router';
// import authHeader from './auth-header';

//純粹連接後端取的資料
//新增一個 add a HTTP header with the help of authHeader() function when requesting authorized resource.
let domainName = DomainName.getUrl();

const request = {
    'data': null,
    'domain': domainName
}

class CommonService {

    /**
     * @param {string} API_URL - api網址
     * @param {Object} requestData - 請求參數
     */
    Post(API_URL, requestData) {
        request.data = requestData;
        request.domain += API_URL;
        console.log('request.domain:',request);
        // return axios.post(request.domain, request);
        return 'aa';

        //到時候要放權限的物件
        // return axios.post(API_URL, request, {headers: authHeader()});
    }

    Get(API_URL, requestData) {
        request.data = requestData;
        return axios.post(API_URL, request);
        //到時候要放權限的物件
        // return axios.post(API_URL, request, {headers: authHeader()});
    }
}

export default new CommonService();