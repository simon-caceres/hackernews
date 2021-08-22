import { service } from "./services"


export default class Services {
    static async getDataByDate (paginate: number)  {
        const ENDPOINT = `v1/search_by_date?page=${paginate}`
    
        return await service.get(ENDPOINT);
    }
}
