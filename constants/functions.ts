import { service } from "./services"


export default class Services {
    static async getDataByDate ()  {
        const ENDPOINT = 'v1/search_by_date'
    
        return await service.get(ENDPOINT);
    }
}
