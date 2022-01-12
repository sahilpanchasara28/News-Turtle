import React from "react";
import defaultImg from "./default_img.jpg";

export default function NewsItem(props) {
  let { title, description, imgurl, newsurl, author, date, source } = props;

  return (
    <div className="my-3">
      <div className="card" style={{ width: "18rem" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            position: "absolute",
            right: "0",
          }}
        >
          <span className="badge rounded-pill bg-danger">
            {source ? source : "Unknown"}
          </span>
        </div>
        <img
          src={imgurl ? imgurl : defaultImg}
          className="card-img-top"
          alt="image"
        />
        <div className="card-body">
          <h5 className="card-title">{title}</h5>
          <p className="card-text">{description}...</p>
          <p className="card-text">
            <small className="text-muted">
              Last updated by {author ? author : "Unknown"} on{" "}
              {new Date(date).toGMTString()}
            </small>
          </p>
          <a href={newsurl} target="_blank" className="btn btn-sm btn-primary">
            Read More
          </a>
        </div>
      </div>
    </div>
  );
}
