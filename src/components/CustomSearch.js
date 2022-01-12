import React, { useState, useEffect } from "react";
import NewsItem from "./NewsItem";
import InfiniteScroll from "react-infinite-scroll-component";
import Spinner from "./Spinner";

export default function CustomSearch(props) {
  const [articles, setarticles] = useState([]);
  const [loading, setloading] = useState(true);
  const [totalResults, settotalResults] = useState(0);
  const [page, setpage] = useState(1);
  const [keyword, setkeyword] = useState("all");

  const capitalize = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const updatePage = async () => {
    props.setProgress(10);

    let apiurl = `https://newsapi.org/v2/everything?q=${keyword}&apiKey=${props.apiKey}&page=${page}`;

    let data = await fetch(apiurl);
    props.setProgress(30);
    let parseddata = await data.json();
    props.setProgress(60);

    setarticles(parseddata.articles);
    settotalResults(parseddata.totalResults);
    setloading(false);

    props.setProgress(100);
  };

  useEffect(() => {
    document.title = "NewsTurtle - " + capitalize(props.category);
    updatePage();
  }, []);

  const fetchMoreData = async () => {
    setpage(page + 1);

    let apiurl = `https://newsapi.org/v2/everything?q=${keyword}&apiKey=${props.apiKey}&page=${page}`;

    let data = await fetch(apiurl);
    let parseddata = await data.json();

    setarticles(parseddata.articles.concat(parseddata.articles));
    settotalResults(parseddata.totalResults);
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
        Top Headlines - {capitalize(props.category)}
      </h1>
      {loading && <Spinner />}

      <div className="w-25 mx-auto d-flex">
        <form>
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
        </form>
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
