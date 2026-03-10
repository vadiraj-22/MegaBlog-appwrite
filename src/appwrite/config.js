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

    async createPost(title, content, featuredImage, status, userId){
        try {
            console.log('Creating post with data:', { title, content, featuredImage, status, userId })
            
            const result = await this.databases.createDocument(
                conf.appWriteDatabaseId,
                conf.appWriteCollectionId,
                ID.unique(),
                {
                    title,
                    content,
                    status,
                    userId,
                    featuredImage,
                }
            )
            
            console.log('Post created successfully:', result)
            return result
        } catch (error) {
            console.log("Appwrite service :: createPost :: error", error);
            throw error
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
            console.log('Uploading file to bucket:', conf.appWriteBucketId, 'File:', file)
            
            const result = await this.bucket.createFile(
                conf.appWriteBucketId,
                ID.unique(),
                file
            )
            
            console.log('File uploaded successfully:', result)
            return result
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
        if (!fileId) {
            console.error('getFilePreview: No fileId provided')
            return null
        }
        
        // Use getFileView instead of getFilePreview to avoid transformation limits on free plan
        const result = this.bucket.getFileView(
            conf.appWriteBucketId,
            fileId
        )
        
        // Convert URL object to string
        const url = result.toString()
        return url
    }
}

const service = new Service()
export default service