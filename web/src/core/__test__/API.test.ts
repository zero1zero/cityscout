import {expect, test} from '@jest/globals'
import API from "@/core/API";
import Storage from "@/core/Storage";
import {Criterion} from "@/model/Criterion";

const storage = new Storage()
let api = new API(storage)

test('query explore', async () => {
    expect.assertions(1)

    let criterion: Criterion = {
        criterion: ["cafes",
            "bars",
            "nature",
            "liberal",
            "job opportunities",
            "baseball team"]
    }

    await api.explore(criterion)
        .then(token => {
            expect(token).toBeTruthy()
        })
}, 20000)
