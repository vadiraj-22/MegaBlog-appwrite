import conf from '../conf/conf'
import { Client, ID, Databases, Storage, Query, Account } from "appwrite";

export class Service{
    client = new Client();
    databases;
    bucket;
    account;

    constructor(){
        this.client
            .setEndpoint(conf.appWriteUrl)
            .setProject(conf.appWriteProjectId);

        this.account = new Account(this.client);
        this.databases = new Databases(this.client);
        this.bucket = new Storage(this.client);
    }

    async createPost(title, slug, content, featuredImage, status, userId){
        try {
            return await this.databases.createDocument(
                conf.appWriteDatabaseId,
                conf.appWriteCollectionId,
                slug,
                {
                    title,
                    content,
                    status,
                    userId,
                    featuredImage,
                }
            )
        } catch (error) {
            console.log("Appwrite service :: createPost :: error", error);
        }
    }

    async updatePost(slug, { title, content, featuredImage, status, userId }){
        try {
            return await this.databases.updateDocument(
                conf.appWriteDatabaseId,
                conf.appWriteCollectionId,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status,
                    userId
                }
            )
        } catch (error) {
            console.log("Appwrite service :: updatePost :: error", error);
        }
    }

    async deletePost(slug){
        try {
            await this.databases.deleteDocument(
                conf.appWriteDatabaseId,
                conf.appWriteCollectionId,
                slug
            )
            return true;
        } catch (error) {
            console.log("Appwrite service :: deletePost :: error", error);
            return false;
        }
    }

    async getPost(slug){
        try {
            return await this.databases.getDocument(
                conf.appWriteDatabaseId,
                conf.appWriteCollectionId,
                slug
            )
        } catch (error) {
            console.log("Appwrite service :: getPost :: error", error);
            return false;
        }
    }

    async getPosts(queries = [Query.equal('status', 'active')]){
        try {
            return await this.databases.listDocuments(
                conf.appWriteDatabaseId,
                conf.appWriteCollectionId,
                queries
            )
        } catch (error) {
            console.log("Appwrite service :: getPosts :: error", error);
            return false;
        }
    }

    // File Upload Service

    async uploadFile(file){
        try {
            return await this.bucket.createFile(
                conf.appWriteBucketId,
                ID.unique(),
                file
            )
        } catch (error) {
            console.log("Appwrite service :: uploadFile :: error", error);
            return false;
        }
    }
    
    async deleteFile(fileId){
        try {
            await this.bucket.deleteFile(
                conf.appWriteBucketId,
                fileId
            )
            return true;
        } catch (error) {
            console.log("AppWrite service :: deleteFile :: error", error);
            return false;
        }
    }

    getFilePreview(fileId){
        return this.bucket.getFilePreview(
            conf.appWriteBucketId,
            fileId
        )
    }
}

const service = new Service()
export default service