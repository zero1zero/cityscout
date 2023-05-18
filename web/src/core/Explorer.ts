import Storage from "@/core/Storage";
import {Criterion} from "@/model/Criterion";
import API from "@/core/API";
import {Cities} from "@/model/Cities";

export default class Explorer {

    public static minimumCriterion = 3

    private storage: Storage
    private api: API

    constructor(api: API, storage: Storage) {
        this.storage = storage
        this.api = api
    }

    explore = async (criterion: Criterion): Promise<Cities> => {
        if (criterion.criterion.length < Explorer.minimumCriterion) {
            return {cities: []}
        }

        return this.api.explore(criterion)
    }
}
