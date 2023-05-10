import API from "@/core/API";
import Storage from "@/core/Storage";
import Explorer from "@/core/Explorer";

export default class Dependencies {

    static instance = new Dependencies()

    storage = new Storage()
    api = new API(this.storage)
    explorer = new Explorer(this.api, this.storage)
}
