import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import appwriteService from "../appwrite/config";
import { Button, Container } from "../components";
import parse from "html-react-parser";
import { useSelector } from "react-redux";

export default function Post() {
    const [post, setPost] = useState(null);
    const { slug } = useParams();
    const navigate = useNavigate();

    const userData = useSelector((state) => state.auth.userData);

    const isAuthor = post && userData ? post.userId === userData.$id : false;

    useEffect(() => {
        if (slug) {
            appwriteService.getPost(slug).then((post) => {
                if (post) setPost(post);
                else navigate("/");
            });
        } else navigate("/");
    }, [slug, navigate]);

    const deletePost = () => {
        appwriteService.deletePost(post.$id).then((status) => {
            if (status) {
                appwriteService.deleteFile(post.featuredImage);
                navigate("/");
            }
        });
    };

    return post ? (
        <div className="py-8">
            <Container>
                <div className="max-w-4xl mx-auto">
                    <div className="w-full mb-6 relative rounded-xl overflow-hidden shadow-lg bg-gray-200">
                        <img
                            src={appwriteService.getFilePreview(post.featuredImage)}
                            alt={post.title}
                            className="w-full h-96 object-cover"
                            onError={(e) => {
                                console.error('=== IMAGE LOAD ERROR ===')
                                console.error('File ID:', post.featuredImage)
                                console.error('Image src:', e.target.src)
                                console.error('Error event:', e)
                                // Prevent infinite loop
                                e.target.onError = null
                                e.target.style.display = 'none'
                                e.target.parentElement.innerHTML = '<div class="w-full h-96 flex items-center justify-center text-red-500 text-xl">Image failed to load. Check Appwrite bucket permissions.</div>'
                            }}
                            onLoad={() => {
                                console.log('✓ Image loaded successfully!')
                            }}
                        />

                        {isAuthor && (
                            <div className="absolute right-4 top-4 flex gap-2">
                                <Link to={`/edit-post/${post.$id}`}>
                                    <Button bgColor="bg-green-500" className="shadow-lg">
                                        Edit
                                    </Button>
                                </Link>
                                <Button bgColor="bg-red-500" onClick={deletePost} className="shadow-lg">
                                    Delete
                                </Button>
                            </div>
                        )}
                    </div>
                    <div className="bg-white rounded-xl p-8 shadow-lg">
                        <h1 className="text-4xl font-bold mb-6 text-gray-800">{post.title}</h1>
                        <div className="prose prose-lg max-w-none">
                            {parse(post.content)}
                        </div>
                    </div>
                </div>
            </Container>
        </div>
    ) : null;
}