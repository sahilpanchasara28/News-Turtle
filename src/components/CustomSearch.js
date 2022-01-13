import React, { useState, useEffect } from "react";
import NewsItem from "./NewsItem";
import InfiniteScroll from "react-infinite-scroll-component";
import Spinner from "./Spinner";

export default function CustomSearch(props) {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalResults, setTotalResults] = useState(0);
  const [page, setPage] = useState(1);
  const [keyword, setkeyword] = useState("all");

  const capitalize = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const updatePage = async () => {
    props.setProgress(10);
    const url = `https://newsapi.org/v2/everything?q=${keyword}&apiKey=${props.apiKey}&page=${page}`;
    setLoading(true);
    let data = await fetch(url);
    props.setProgress(30);
    let parsedData = await data.json();
    props.setProgress(70);
    setArticles(parsedData.articles);
    setTotalResults(parsedData.totalResults);
    setLoading(false);
    props.setProgress(100);
  };

  useEffect(() => {
    document.title = "NewsTurtle - " + capitalize(props.category);
    updatePage();
    // eslint-disable-next-line
  }, []);

  const fetchMoreData = async () => {
    const url = `https://newsapi.org/v2/everything?q=${keyword}&apiKey=${props.apiKey}&page=${page}`;
    setPage(page + 1);
    let data = await fetch(url);
    let parsedData = await data.json();
    if (parsedData.status === "error") {
      alert("can't fetch more...");
      setTimeout(() => {
        window.location.reload();
      }, 3000);
    } else {
      setArticles(articles.concat(parsedData.articles));
      setTotalResults(parsedData.totalResults);
    }
  };

  const handleChange = (e) => {
    setkeyword(e.target.value);
  };

  return (
    <>
      <h1
        className="text-center"
        style={{ margin: "35px 0px", marginTop: "90px" }}
      >
        {capitalize(props.category)} - {capitalize(keyword)}
      </h1>
      {loading && <Spinner />}

      <div className="w-25 mx-auto d-flex">
 
          <input
            type="text"
            value={keyword}
            onChange={handleChange}
            minLength={3}
            required
          />

          <button
            type="submit"
            disabled={keyword.length === 0}
            className="btn btn-primary mx-3"
            onClick={() => {
              updatePage();
            }}
          >
            Submit
          </button>
     
      </div>
      <InfiniteScroll
        dataLength={articles.length}
        next={fetchMoreData}
        hasMore={articles.length !== totalResults}
        loader={<Spinner />}
      >
        <div className="container">
          <div className="row">
            {articles.map((elem, i) => {
              return (
                <div className="col-md-4" key={i}>
                  <NewsItem
                    title={elem.title ? elem.title : ""}
                    description={elem.description ? elem.description : ""}
                    imgurl={elem.urlToImage}
                    newsurl={elem.url}
                    author={elem.author}
                    date={elem.publishedAt}
                    source={elem.source.name}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </InfiniteScroll>
    </>
  );
}
