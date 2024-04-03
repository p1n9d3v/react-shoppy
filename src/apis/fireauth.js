import {
    GoogleAuthProvider,
    signInWithPopup,
    onAuthStateChanged,
    signOut
} from 'firebase/auth';

class FireAuth {
    #auth;

    constructor(auth) {
        this.#auth = auth;
    }

    loginGoogle() {
        const googleProvider = new GoogleAuthProvider();
        return new Promise((resolve, reject) => {
            signInWithPopup(this.#auth, googleProvider)
                .then((result) => {
                    const credential =
                        GoogleAuthProvider.credentialFromResult(result);
                    const token = credential.accessToken;
                    const user = result.user;

                    resolve({
                        token,
                        user
                    });
                })
                .catch((error) => {
                    console.log(error);
                });
        });
    }

    logout() {
        signOut(this.#auth);
    }

    observe() {
        return new Promise((resolve, reject) => {
            onAuthStateChanged(this.#auth, async (user) => {
                resolve(user);
            });
        });
    }
}

export default FireAuth;
