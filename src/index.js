import Post from "./Post";
import "./style/style.css";
// import json from "../assets/json";

import logo from "../src/assets/webpack.png";

const post = new Post("Webpack Post Title", logo);
console.log("Post to string", post.toString());
