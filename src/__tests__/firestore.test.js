/*
 * @jest-environment node
 */
import fs from 'fs';
import { initializeTestEnvironment } from '@firebase/rules-unit-testing';
import { app } from 'apis/config';
import { connectFirestoreEmulator, getFirestore } from 'firebase/firestore';

import Firestore from 'apis/firestore';

const projectId = 'shoppy-react-b81ba';
const port = 8080;
const host = 'localhost';
const firestore = getFirestore(app);
connectFirestoreEmulator(firestore, host, port);

describe('firestore', () => {
    let env;
    beforeAll(async () => {
        env = await initializeTestEnvironment({
            projectId,
            firestore: {
                rules: fs.readFileSync('firestore.rules', 'utf8'),
                host,
                port
            }
        });
    });

    afterEach(async () => {
        env.clearFirestore();
    });
    describe('doc', () => {
        test('testing get() and set()', async () => {
            const db = new Firestore(firestore, 'get/set');
            const data = {
                test: 'test'
            };
            await db.set(data);

            const result = await db.get();
            expect(result).toEqual(data);
        });

        test('path is more than 2', async () => {
            const db = new Firestore(firestore, 'doc/path/is/more/than/2');

            const data = {
                test: 'test'
            };
            await db.set(data);

            const result = await db.get();
            expect(result).toEqual(data);
        });

        test('update data', async () => {
            const db = new Firestore(firestore, 'update/field');

            const data = {
                test: 'test'
            };

            await db.set(data);

            await db.update({ test: 'test2' });

            const result = await db.get();
            expect(result).toEqual({ test: 'test2' });
        });

        test('delete data field', async () => {
            const db = new Firestore(firestore, 'delete/field');

            const data = {
                test: 'test'
            };

            await db.set(data);

            await db.deleteField('test');

            const result = await db.get();
            expect(result).toEqual({});
        });

        test('delete doc', async () => {
            const db = new Firestore(firestore, 'delete/doc');

            const data = {
                test: 'test'
            };

            await db.set(data);

            await db.delete();

            const result = await db.get();
            expect(result).toBeUndefined();
        });
    });

    // describe('collection', () => {
    //     test('testing get() and set()', async () => {
    //         const db = new Firestore(firestore, 'test');
    //         const data = {
    //             test: 'test'
    //         };
    //
    //         await db.set(data);
    //         const result = await db.get();
    //         expect(result).toEqual(data);
    //     });
    //
    //     test('path is more than 2', async () => {
    //         const db = new Firestore(firestore, 'test/test/test');
    //
    //         const data = {
    //             abcdef: 'test'
    //         };
    //         await db.set(data);
    //
    //         const result = await db.get();
    //         expect(result).toEqual(data);
    //     });
    // });
});

// const projectId = 'shoppy-react-b81ba';
// const port = 8080;
// const host = 'localhost';
// describe('firebase', () => {
//     let testEnv;
//     let authenticatedUser;
//     let unauthenticatedUser;
//     beforeAll(async () => {
//         testEnv = await initializeTestEnvironment({
//             projectId,
//             firestore: {
//                 rules: fs.readFileSync('firestore.rules', 'utf8'),
//                 host,
//                 port
//             }
//         });
//         authenticatedUser = testEnv.authenticatedContext({
//             uid: 'user1',
//             email: 'user1@gmail.com'
//         });
//         unauthenticatedUser = testEnv.unauthenticatedContext();
//     });
//
//     beforeEach(async () => {
//         // testEnv.clearFirestore();
//     });
//
//     test('set data', async () => {
//         authenticatedUser.firestore().collection('users').doc('user1').set({
//             test2: 'test2'
//         });
//         const data = await unauthenticatedUser
//             .firestore()
//             .collection('users')
//             .doc('user1')
//             .get();
//         console.log(data.data());
//     });
// });
