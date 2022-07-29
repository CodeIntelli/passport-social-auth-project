import { posts } from "../data";
import Card from "../components/card";

const home = () => {
    return (
        <div className="home">
            {posts.map(post => (
                <Card key={post.id} post={post} />
            ))}
        </div>
    )
}

export default home