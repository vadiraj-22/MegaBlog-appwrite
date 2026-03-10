import { Client, Account, ID } from "appwrite";
import conf from "../conf/conf";

export class AuthService {
    client = new Client();
    account;

    constructor() {
        this.client
            .setEndpoint(conf.appWriteUrl)
            .setProject(conf.appWriteProjectId);

        this.account = new Account(this.client);
    }

    async createAccount({ email, password, name }) {
        try {
            const userAccount = await this.account.create(
                ID.unique(),
                email,
                password,
                name
            );

            if (userAccount) {
                return this.login({ email, password });
            } else {
                return userAccount;
            }
        } catch (error) {
            throw error;
        }
    }

    async login({ email, password }) {
        try {
            return await this.account.createEmailPasswordSession(
                email,
                password
            );
        } catch (error) {
            throw error;
        }
    }

    async getCurrentUser() {
    try {
        const user = await this.account.get();
        return user;
    } catch (error) {
        console.log("User not logged in");
        return null;
    }
}

    async logout() {
        try {
            await this.account.deleteSessions();
        } catch (error) {
            console.log("appwrite service error :: logout :: error", error);
        }
    }
}

const authService = new AuthService();
export default authService;