/*
 * @jest-environment node
 */

import fs from 'fs';
import {
    assertFails,
    assertSucceeds,
    initializeTestEnvironment,
    RulesTestEnvironment
} from '@firebase/rules-unit-testing';
import { getDoc } from 'firebase/firestore';

const projectId = 'shoppy-react-b81ba';
const port = 8080;
const host = 'localhost';
describe('firebase', () => {
    let testEnv;
    let authenticatedUser;
    let unauthenticatedUser;
    beforeAll(async () => {
        testEnv = await initializeTestEnvironment({
            projectId,
            firestore: {
                rules: fs.readFileSync('firestore.rules', 'utf8'),
                host,
                port
            }
        });
        authenticatedUser = testEnv.authenticatedContext({
            uid: 'user1',
            email: 'user1@gmail.com'
        });
        unauthenticatedUser = testEnv.unauthenticatedContext();
    });

    beforeEach(async () => {
        // testEnv.clearFirestore();
    });

    test('set data', async () => {
        authenticatedUser.firestore().collection('users').doc('user1').set({
            test2: 'test2'
        });
        const data = await unauthenticatedUser
            .firestore()
            .collection('users')
            .doc('user1')
            .get();
        console.log(data.data());
    });
});
