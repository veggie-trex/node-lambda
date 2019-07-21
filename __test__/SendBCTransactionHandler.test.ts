import { sendBCTransactionHandler } from "../src/SendBCTransactionHandler";

describe('', () => {
    test('sendBCTransaction', (done) => {
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 5000000;
        const callBack = (arg1, arg2) => {
            console.log('arg2', arg2);
            done();
        };
        const event = {
            body: JSON.stringify({
                "signedTransaction": "0xf901050280834c4b40941786c340c2f073e4dc8f0cff0f1a13a5c5d6651a80b8a4a31679f000000000000000000000000036de2bee3ee97fd8f2717cd8d1ebab1f317dc417000000000000000000000000000000000000000000000000000000000000004000000000000000000000000000000000000000000000000000000000000000285647567a64476c755a7942555a584e306157356e49454a5054303067516b3950545342435430394e0000000000000000000000000000000000000000000000001ba090f71252cefa0b53ca375e192c1c9a11fcff7a95af705c6ae632ea0cc5c3a739a04615de6c4ebcf02536c1e6aa1b48abf674cbb935a74b71b1e3121c4d1e08da77"
            })
        }
        sendBCTransactionHandler(event, {}, callBack);
    })
});